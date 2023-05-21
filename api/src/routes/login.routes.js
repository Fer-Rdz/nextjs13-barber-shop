import { Router } from "express";
import { Clients } from "../models/clients.js";
import jwt from "jsonwebtoken";
const loginRoute = Router();

loginRoute.post("/login", async (req, res) => {
  const user = await Clients.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(400).json({ message: "a" });

  if (req.body.password !== user.password)
    return res
      .status(400)
      .json({ message: "contraseña no valida" })
      .send(
        console.log(user.password, "", req.body.password, "", req.body.email)
      );

  const token = jwt.sign(
    {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      id: user.id,
    },
    process.env.JWT_PRIVATE_KEY
  );

  res.header("auth-token", token).json({
    error: null,
    data: { token },
  });
});

export default loginRoute;
