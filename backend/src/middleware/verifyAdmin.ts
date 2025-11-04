import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

export const verifyAdmin = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader)
      return reply.status(401).send({ error: "No token provided" });

    const token = authHeader.split(" ")[1] as string;
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as any;

    if (decoded.role !== "admin") {
      return reply.status(403).send({ error: "Access denied, admin only." });
    }

    (request as any).userId = decoded.userId;
    (request as any).role = decoded.role;
  } catch (error) {
    reply.status(401).send({ error: "Invalid or expired token" });
  }
};
