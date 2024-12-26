import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicsController from "./controllers/topicsController.js";
import * as questionController from "./controllers/questionsController.js";
import * as authController from "./controllers/authController.js";
import * as answersController from "./controllers/answersController.js";

const router = new Router();

router.get("/", mainController.showMain);

// Topics
router.get("/topics", topicsController.listTopics);
router.post("/topics", topicsController.addTopic);
router.get("/topics/:id", topicsController.listTopicsbyId);

// Asking questions
router.get("/quiz", topicsController.listTopics);
router.get("/quiz/:tId", questionController.getQuestionsByTId);
// router.get("/quiz/:tId/questions/:qId");
// router.post("/quiz/:tId/questions/:qId/options/:oId");
// router.get("/quiz/:tId/questions/:qId/correct");
// router.get("/quiz/:tId/questions/:qId/incorrect");

// Login
// router.get("/auth/login", authController.login);
// router.post("/auth/login", authController.login);

// Registration
// router.get("/auth/register", );
// router.post("/auth/register", );

// router.post("/chores/:id/claim", choreController.claimChore);
// router.post("/chores/:id/complete", choreController.completeChore);

export { router };





