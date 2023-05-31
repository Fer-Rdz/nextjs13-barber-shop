import { Router } from "express";
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  getReviewById,
} from "../controllers/reviews.controller.js";

const router = Router();

router
  .get("/reviews", getReviews)
  .get("/reviews/:id", getReviewById)
  .post("/reviews", createReview)
  .delete("/reviews/:id", deleteReview)
  .put("/reviews/:id", updateReview);

export default router;
