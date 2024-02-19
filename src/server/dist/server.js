import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from "mongoose";
import session from 'express-session';
import passport from 'passport';
import { User } from './models/User.js';
import Question from './models/Question.js';
import MathQuestion from './models/MathQuestion.js';
import CalcQuestion from './models/CalcQuestion.js';
import GrammarQuestion from './models/GrammarQuestion.js';
import ReadingQuestion from './models/ReadingQuestion.js';
import ScienceQuestion from './models/ScienceQuestion.js';
import UserAnalytics from './models/UserAnalytics.js';
import UserEmail from './models/UserEmail.js';
import Post from './models/Post.js';
import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
import { config } from 'dotenv';
config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'scholarsbeacon@gmail.com',
        pass: 'P0kemm0!'
    }
});
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: "Unauthorized" });
}
// Middleware to check if the user is an admin
function ensureAdmin(req, res, next) {
    // if (req.user && (req.user as UserDocument).role === "admin") {
    //   return next();
    // }
    // res.status(403).json({ message: "Forbidden" });
}
const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log("Successfully connected to MongoDB!");
});
app.get('/five-sat', async (req, res) => {
    try {
        // Fetch 3 random Math questions
        const mathQuestions = await MathQuestion.aggregate([
            { $sample: { size: 2 } }
        ]);
        // Fetch 2 random Reading questions
        const grammarQuestions = await GrammarQuestion.aggregate([
            { $sample: { size: 3 } }
        ]);
        // Combine the questions
        const questions = [...mathQuestions, ...grammarQuestions];
        // Send the combined questions as the response
        res.json(questions);
    }
    catch (error) {
        console.error('Error fetching SAT questions:', error);
        res.status(500).json({ message: 'Error fetching questions' });
    }
});
app.post('/submit-email', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    try {
        // Save the email in the database
        const newUser = new UserEmail({ email });
        await newUser.save();
        // Count the number of users registered before this one
        const userNumber = await UserEmail.countDocuments({ createdAt: { $lt: newUser.createdAt } });
        // Send a default email to the user
        const mailOptions = {
            from: 'yourEmail@example.com',
            to: email,
            subject: 'Welcome to Our Service',
            text: 'Thank you for registering. Your registration number is ' + (userNumber + 1) + '.'
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'Error sending email' });
            }
            else {
                console.log('Email sent: ' + info.response);
                res.json({ message: 'Email submitted successfully', userNumber: userNumber + 1 });
                return;
            }
        });
    }
    catch (error) {
        console.error('Error in /submit-email route:', error);
        res.status(500).json({ message: 'Error processing your request' });
    }
    return;
});
app.post('/auth/google', async (req, res) => {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    User.findOne({ googleId: userid }).then((currentUser) => {
        if (currentUser) {
            // already have the user
            req.session.user = currentUser;
            res.json(currentUser);
        }
        else {
            // if not, create user in our db
            console.log(payload.picture);
            new User({
                googleId: userid,
                username: payload.name,
                email: payload.email,
                photo: payload.picture,
                // add other attributes 
            }).save().then((newUser) => {
                req.session.user = newUser;
                res.json(newUser);
            });
        }
    });
});
app.post('/api/add-questions/:type', async (req, res) => {
    const { type } = req.params; // Extract the type from the URL
    let questionModel;
    switch (type.toLowerCase()) {
        case 'calc':
            questionModel = CalcQuestion;
            break;
        case 'math':
            questionModel = MathQuestion; // Assuming MathQuestion is your model for Math questions
            break;
        case 'reading':
            questionModel = ReadingQuestion; // And so on for other types
            break;
        case 'grammar':
            questionModel = GrammarQuestion;
            break;
        case 'science':
            questionModel = ScienceQuestion;
            break;
        default:
            return res.status(400).json({ message: 'Invalid question type provided' });
    }
    console.log(questionModel.modelName); // Should log the model name like 'MathQuestion'
    console.log(questionModel.collection.name); // Should log the intended collection name like 'mathQuestions'
    const question = new questionModel(req.body); // Use the determined model to create a new question
    await question.save();
    res.json({ message: 'Question added successfully!' });
    return;
});
app.get('/api/questions', async (req, res) => {
    const questions = await Question.find(); // Retrieve all questions
    res.json(questions); // Send the questions back to the client
});
app.get('/api/questions/:id', async (req, res) => {
    const question = await Question.findById(req.params.id);
    res.json(question);
});
app.get('/auth/current_user', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    }
    else {
        res.status(401).json({ message: 'Not logged in' });
    }
});
app.post('/api/submit-answer', async (req, res) => {
    const { userId, questionId, isCorrect } = req.body;
    // Fetch the question for additional details
    const question = await Question.findById(questionId);
    if (!question) {
        res.status(404).json({ error: 'Question not found.' });
        return;
    }
    try {
        // Fetch the user's analytics document
        let analytics = await UserAnalytics.findOne({ userId });
        if (!analytics) {
            // If the user doesn't have an analytics document yet, create one
            analytics = new UserAnalytics({
                userId,
                totalQuestionsAnswered: 1,
                totalCorrectAnswers: isCorrect ? 1 : 0,
                categoryPerformance: [{ category: question.category, totalQuestions: 1, correctAnswers: isCorrect ? 1 : 0 }],
                difficultyPerformance: [{ difficulty: question.difficulty, totalQuestions: 1, correctAnswers: isCorrect ? 1 : 0 }],
                completedQuestions: [{ questionId, isCorrect }],
            });
        }
        else {
            // If the analytics document exists, update it
            analytics.totalQuestionsAnswered++;
            if (isCorrect) {
                analytics.totalCorrectAnswers++;
            }
            const categoryStat = analytics.categoryPerformance.find(cp => cp.category === question.category);
            if (categoryStat) {
                categoryStat.totalQuestions++;
                if (isCorrect) {
                    categoryStat.correctAnswers++;
                }
            }
            else {
                analytics.categoryPerformance.push({ category: question.category, totalQuestions: 1, correctAnswers: isCorrect ? 1 : 0 });
            }
            const difficultyStat = analytics.difficultyPerformance.find(dp => dp.difficulty === question.difficulty);
            if (difficultyStat) {
                difficultyStat.totalQuestions++;
                if (isCorrect) {
                    difficultyStat.correctAnswers++;
                }
            }
            else {
                analytics.difficultyPerformance.push({ difficulty: question.difficulty, totalQuestions: 1, correctAnswers: isCorrect ? 1 : 0 });
            }
            analytics.completedQuestions.push({ questionId, isCorrect });
        }
        await analytics.save();
        res.json({ message: 'User analytics updated successfully.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating user analytics.' });
    }
});
// Get all posts
app.get('/api/posts', async (req, res) => {
    const posts = await Post.find().populate('user', 'username email photo'); // populate user to get user details
    res.json(posts);
});
// Get a specific post
app.get('/api/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id).populate('user', 'username email photo');
    res.json(post);
});
// Create a new post
app.post('/api/posts', async (req, res) => {
    // Assuming that the Post model includes 'createdBy' and 'createdAt' properties
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        // user: req.session.user!._id, // Check if user exists in the future
        created_by: req.body.created_by,
        created_at: req.body.created_at,
    });
    const saved = await post.save();
    res.json({ message: 'Post created successfully!', id: saved._id });
});
app.post('/api/posts/:id/comments', async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
        const comment = {
            text: req.body.text,
            created_by: req.body.created_by, // Check if user exists in the future
        };
        post.comments.push(comment);
        await post.save();
        res.json({ message: 'Comment added successfully!' });
    }
    else {
        res.status(404).json({ message: 'Post not found.' });
    }
});
app.get('/test', (req, res) => {
    res.send('Test route');
});
const port = process.env.PORT || '5000';
app.listen(port, () => console.log(`Server started on port ${port}`));
//# sourceMappingURL=server.js.map