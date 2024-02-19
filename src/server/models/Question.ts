import mongoose, { Document, Schema } from 'mongoose';

enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

interface IAnswerChoice {
  text: string;
  isCorrect: boolean;
}

interface AnswerChoiceDocument extends IAnswerChoice, Document {}

const answerChoiceSchema = new Schema<AnswerChoiceDocument>({
  text: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
});

interface IQuestion {
  title: string;
  problemStatement: string;
  difficulty: Difficulty;
  category: string;
  answerChoices: AnswerChoiceDocument[];
}

interface QuestionDocument extends IQuestion, Document {}

const questionSchema = new Schema<QuestionDocument>({
  title: {
    type: String,
    required: true,
  },
  problemStatement: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: Object.values(Difficulty),
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  answerChoices: {
    type: [answerChoiceSchema],
    validate: [arrayLimit, '{PATH} exceeds the limit of 4']
  },
});

function arrayLimit(val: any[]) {
  return val.length <= 4;
}

const Question = mongoose.model<QuestionDocument>('Question', questionSchema);

export default Question;
