import { Router } from "express";

const adminRoute = Router();

adminRoute.get("/", (req, res) => {
  res.json({
    error: null,
    data: {
      title: "mi ruta",
      user: req.user,
    },
  });
});

export default adminRoute;
