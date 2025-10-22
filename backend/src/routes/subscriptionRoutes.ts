import { FastifyInstance } from "fastify";
import {
  addSubscription,
  deleteSubscription,
  editSubscription,
  listAllSubscriptions,
  listUserSubscriptions,
} from "../controllers/subscriptionController";
import { auth } from "../middleware/auth";

export default async function subscriptionRoutes(fastify: FastifyInstance) {
  fastify.get("/subscriptions", listAllSubscriptions);

  fastify.get(
    "/users/:userId/subscriptions",
    { preHandler: auth },
    listUserSubscriptions
  );

  fastify.post(
    "/users/:userId/subscriptions",
    { preHandler: auth },
    addSubscription
  );

  fastify.patch(
    "/users/:userId/subscriptions/:id",
    { preHandler: auth },
    editSubscription
  );

  fastify.delete(
    "/users/:userId/subscriptions/:id",
    { preHandler: auth },
    deleteSubscription
  );

  fastify.get(
    "/users/:userId/subscriptions/statistics",
    { preHandler: auth },
    async (request, reply) => {}
  );
}
