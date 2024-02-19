import mongoose, { Schema } from 'mongoose';
var Difficulty;
(function (Difficulty) {
    Difficulty["Easy"] = "Easy";
    Difficulty["Medium"] = "Medium";
    Difficulty["Hard"] = "Hard";
})(Difficulty || (Difficulty = {}));
const answerChoiceSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    isCorrect: {
        type: Boolean,
        default: false,
    },
});
const questionSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
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
    has_img: {
        type: Boolean,
        required: true,
    },
    img_link: {
        type: String,
        required: false,
    },
    explanation: {
        type: String,
        required: false,
    },
});
function arrayLimit(val) {
    return val.length <= 4;
}
const MathQuestion = mongoose.model('MathQuestion', questionSchema, 'mathQuestions');
export default MathQuestion;
//# sourceMappingURL=MathQuestion.js.map