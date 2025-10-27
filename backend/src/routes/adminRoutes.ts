import { FastifyInstance } from "fastify";
import { listAllUsers } from "../controllers/adminController";

export default async function adminRoutes(server: FastifyInstance) {
    server.get("/admin/users", listAllUsers)
}