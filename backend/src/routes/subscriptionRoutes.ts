import { FastifyInstance } from "fastify";
import {
  addSubscription,
  deleteSubscription,
  editSubscription,
  listAllSubscriptions,
  listUserSubscriptions,
} from "../controllers/subscriptionController";

export default async function subscriptionRoutes(fastify: FastifyInstance) {
  fastify.get("/subscriptions", listAllSubscriptions);

  fastify.get("/users/:userId/subscriptions", listUserSubscriptions);

  fastify.post("/users/:userId/subscriptions", addSubscription);

  fastify.patch("/users/:userId/subscriptions/:id", editSubscription);

  fastify.delete("/users/:userId/subscriptions/:id", deleteSubscription);

  fastify.get(
    "/users/:userId/subscriptions/statistics",
    async (request, reply) => {}
  );
}
