const Quiz = require('../models/Quiz');
const User = require('../models/User');

const createQuiz = async (req, res) => {
  const { title, description, questions } = req.body;
  try {
    const quiz = new Quiz({
      title,
      description,
      questions,
      createdBy: req.user.id
    });
    await quiz.save();
    res.status(201).json({ message: 'Quiz created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('createdBy', 'username');
    res.json(quizzes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// const submitQuiz = async (req, res) => {
//   const { answers } = req.body;
//   try {
//     const quiz = await Quiz.findById(req.params.id);
//     if (!quiz) {
//       return res.status(404).json({ message: 'Quiz not found' });
//     }

//     let score = 0;
//     quiz.questions.forEach((question, index) => {
//       if (question.correctAnswer === answers[index]) {
//         score += 1;
//       }
//     });

//     res.json({ score, total: quiz.questions.length });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const submitQuiz = async (req, res) => {
    const { answers } = req.body;
    const { Id } = req.query; // Get quiz ID from query parameter
  
    try {
      const quiz = await Quiz.findById(Id);
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
  
      let score = 0;
      quiz.questions.forEach((question, index) => {
        if (question.correctAnswer === answers[index]) {
          score += 1;
        }
      });
  
      res.json({ score, total: quiz.questions.length });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

const updateQuiz = async (req, res) => {
    const { Id } = req.query; // Get quiz ID from query parameter
    console.log(Id, "Iddd isss");
    const { title, description, questions } = req.body;

    try {
        const quiz = await Quiz.findById(Id);

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // Update quiz fields
        quiz.title = title || quiz.title;
        quiz.description = description || quiz.description;
        quiz.questions = questions || quiz.questions;

        await quiz.save();
        res.json({ message: 'Quiz updated successfully', quiz });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteQuiz = async (req, res) => {
    const { Id } = req.query; // Get quiz ID from query parameter

    try {
        const quiz = await Quiz.findById(Id);

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        await quiz.remove();
        res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createQuiz, getQuizzes, getQuizById, submitQuiz, updateQuiz,deleteQuiz };
