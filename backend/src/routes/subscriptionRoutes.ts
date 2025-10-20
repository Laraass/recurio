import { FastifyInstance } from "fastify";

export default async function subscriptionRoutes(fastify: FastifyInstance) {

    fastify.get("/subscriptions", async (request, reply) => {});

    fastify.get("/users/:userId/subscriptions", async (request, reply) => {});

    fastify.post("/users/:userId/subscriptions", async (request, reply) => {});

    fastify.patch("/users/:userId/subscriptions/:id", async (request, reply) => {});

    fastify.delete("/users/:userId/subscriptions/:id", async (request, reply) => {});

    fastify.get("/users/:userId/subscriptions/statistics", async (request, reply) => {});

}