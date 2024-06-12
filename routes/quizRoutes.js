// const express = require("express");
// const {
//   createQuiz,
//   getQuizzes,
//   getQuizById,
//   submitQuiz,
//   updateQuiz,
//   deleteQuiz,
// } = require("../controllers/quizController");
// const { protect } = require("../middleware/authMiddleware");
// const router = express.Router();

// router.route("/").post(protect, createQuiz).get(getQuizzes);

// // router.route("/:id").get(getQuizById).post(submitQuiz);
// // router.route('/:id').put(protect, updateQuiz);
// // router.route('/:id').delete(protect, deleteQuiz);
// router.route("/:id")
//   .get(getQuizById)
//   .post(submitQuiz)
//   .put(protect, updateQuiz)
//   .delete(protect, deleteQuiz);

// module.exports = router;


const express = require("express");
const {
  createQuiz,
  getQuizzes,
  getQuizById,
  submitQuiz,
  updateQuiz,
  deleteQuiz
} = require("../controllers/quizController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, createQuiz).get(getQuizzes);
 router.route("/:id").get(getQuizById).post(submitQuiz);
 router.put("/update", protect, updateQuiz);
router.delete("/delete", protect, deleteQuiz);

// router.route("/:id")
//   .get(getQuizById)
//   .post(submitQuiz)
//   .put(protect, updateQuiz)
//   .delete(protect, deleteQuiz);

module.exports = router;
