import { Question, SubjectId, GradeLevel, Difficulty } from '../types/game';
import { generateCurriculumQuestions } from '../data/questionBank';

interface GenerateQuestParams {
  subject: SubjectId;
  topic: string;
  notes?: string;
  grade: GradeLevel;
  difficulty: Difficulty;
  questionCount?: number;
}

export async function generateQuestFromTopic(params: GenerateQuestParams): Promise<Question[]> {
  const { subject, topic, notes, grade, difficulty, questionCount = 5 } = params;

  // Check if Gemini API Key is available in client env
  const apiKey = typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : (import.meta as unknown as { env?: { VITE_GEMINI_API_KEY?: string } }).env?.VITE_GEMINI_API_KEY;

  if (apiKey) {
    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `You are the quest master engine for StudyQuest, an educational RPG.
Generate ${questionCount} multiple-choice quiz questions for:
- Subject: ${subject}
- Topic: ${topic}
- Student Grade Level: ${grade} (Crucial: adapt vocabulary, difficulty, and complexity strictly to this grade level)
- Difficulty: ${difficulty}
${notes ? `- Student's Class Notes to incorporate: "${notes}"` : ''}

Output strictly valid JSON array of objects with this schema:
[
  {
    "id": "gemini-${Date.now()}-1",
    "question": "Clear, engaging question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Educational, encouraging explanation of why the correct answer is right",
    "hint": "Helpful hint without giving it away completely",
    "difficulty": "${difficulty}",
    "gradeRange": "${grade}",
    "subject": "${subject}",
    "topic": "${topic}"
  }
]
Do NOT include markdown formatting or backticks outside of the JSON array. Output strictly the raw JSON array.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text?.trim() || '';
      const cleanJson = text.replace(/^```json\s*/, '').replace(/```$/, '').trim();
      const parsed = JSON.parse(cleanJson);

      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((item, idx) => ({
          id: item.id || `custom-q-${Date.now()}-${idx}`,
          question: item.question,
          options: item.options,
          correctIndex: item.correctIndex ?? 0,
          explanation: item.explanation || 'Great job answering!',
          hint: item.hint || 'Think carefully about the key concepts.',
          difficulty: difficulty,
          gradeRange: grade,
          subject: subject,
          topic: topic
        }));
      }
    } catch (err) {
      console.warn('Gemini generation fallback to local curriculum synthesizer', err);
    }
  }

  // Guaranteed instant fallback with smart curriculum synthesizer
  return generateCurriculumQuestions(subject, topic, grade, difficulty, questionCount);
}
