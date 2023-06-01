import { Router } from "express";
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  getReviewById,
  getReviewByClientId,
} from "../controllers/reviews.controller.js";

const router = Router();

router
  .get("/reviews", getReviews)
  .get("/reviews/:id", getReviewById)
  .get("/review/:client_id", getReviewByClientId)
  .post("/reviews", createReview)
  .delete("/reviews/:id", deleteReview)
  .put("/reviews/:id", updateReview);

export default router;
