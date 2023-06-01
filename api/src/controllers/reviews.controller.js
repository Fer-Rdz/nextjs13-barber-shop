import { Reviews } from "../models/reviews.js";
import { Clients } from "../models/clients.js";

export const getReviews = async (req, res) => {
  const reviews = await Reviews.findAll({
    include: [Clients],
  });
  res.json(reviews);
};

export const getReviewById = async (req, res) => {
  const { id } = req.params;
  const review = await Reviews.findOne({
    where: { id },
    include: [Clients],
  });
  res.json(review);
};

export const getReviewByClientId = async (req, res) => {
  const { client_id } = req.params;
  const review = await Reviews.findOne({
    where: { client_id },
    include: [Clients],
  });
  res.json(review);
};

export const createReview = async (req, res) => {
  const { id, message, client_id, stars } = req.body;
  const newReviews = await Reviews.create({
    id,
    message,
    client_id,
    stars,
  });
  res.json(newReviews);
};

export const updateReview = async (req, res) => {
  const { id } = req.params;
  const { message, stars } = req.body;
  const review = await Reviews.findByPk(id);
  review.message = message;
  review.stars = stars;
  await review.save();
  res.send("Service updated");
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;
  await Reviews.destroy({
    where: {
      id,
    },
  });
  res.send("Review Delete");
};
