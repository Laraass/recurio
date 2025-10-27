import { FastifyInstance } from "fastify";
import {
  deleteUser,
  editUserRole,
  listAllUsers,
  sendEmail,
} from "../controllers/adminController";
import { verifyAdmin } from "../middleware/verifyAdmin";

export default async function adminRoutes(server: FastifyInstance) {
  server.get("/admin/users", {preHandler: [verifyAdmin] }, listAllUsers);
  server.put("/admin/users/:id/role", {preHandler: [verifyAdmin] }, editUserRole);
  server.delete("/admin/users/:id", {preHandler: [verifyAdmin] }, deleteUser);
  server.post("/admin/email", {preHandler: [verifyAdmin]}, sendEmail)
}
