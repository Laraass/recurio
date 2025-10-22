import { FastifyInstance } from "fastify";
import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  subscribeEmail,
} from "../controllers/userController";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/users/register", registerUser);

  fastify.post("/users/login", loginUser);

  fastify.post("/users/logout", logoutUser);

  fastify.get("/users/profile", getProfile);

  fastify.patch("/users/subscribe", subscribeEmail);
}
