import { FastifyInstance } from "fastify";
import { editUserRole, listAllUsers } from "../controllers/adminController";

export default async function adminRoutes(server: FastifyInstance) {
    server.get("/admin/users", listAllUsers)
    server.put("/admin/users/:id/role", editUserRole);
}