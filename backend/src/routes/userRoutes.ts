import { FastifyInstance } from "fastify";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/users/register", async (request, reply) => {});

  fastify.post("/users/login", async (request, reply) => {});

  fastify.post("/users/logout", async (request, reply) => {});

  fastify.get("/users/profile", async (request, reply) => {});

  fastify.patch("/users/subscribe", async (request, reply) => {});
}
