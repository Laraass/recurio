import { FastifyInstance } from "fastify";
import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  toggleSubscription,
} from "../controllers/userController";
import { auth } from "../middleware/auth";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/users/register", registerUser);

  fastify.post("/users/login", loginUser);

  fastify.post("/users/logout", { preHandler: auth }, logoutUser);

  fastify.get("/users/profile", { preHandler: auth }, getProfile);

  fastify.patch("/users/subscribe", { preHandler: auth }, toggleSubscription);
}
