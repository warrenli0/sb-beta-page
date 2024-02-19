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
function arrayLimit(val) {
    return val.length <= 4;
}
const Question = mongoose.model('Question', questionSchema);
export default Question;
//# sourceMappingURL=Question.js.map