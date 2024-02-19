import mongoose, { Schema } from 'mongoose';
const categoryPerformanceSchema = new Schema({
    category: {
        type: String,
        required: true,
    },
    totalQuestions: {
        type: Number,
        required: true,
    },
    correctAnswers: {
        type: Number,
        required: true,
    },
});
const difficultyPerformanceSchema = new Schema({
    difficulty: {
        type: String,
        required: true,
    },
    totalQuestions: {
        type: Number,
        required: true,
    },
    correctAnswers: {
        type: Number,
        required: true,
    },
});
const completedQuestionSchema = new Schema({
    questionId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    isCorrect: {
        type: Boolean,
        required: true,
    },
});
const userAnalyticsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    totalQuestionsAnswered: {
        type: Number,
        required: true,
    },
    totalCorrectAnswers: {
        type: Number,
        required: true,
    },
    categoryPerformance: [categoryPerformanceSchema],
    difficultyPerformance: [difficultyPerformanceSchema],
    completedQuestions: [completedQuestionSchema],
});
const UserAnalytics = mongoose.model('UserAnalytics', userAnalyticsSchema);
export default UserAnalytics;
//# sourceMappingURL=UserAnalytics.js.map