import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

export const auth = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const authHeader = request.headers["authorization"];
    if (!authHeader) {
      return reply.status(401).send({ error: "Authorization header missing " });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return reply.status(401).send({ error: "Token missing" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secretkey"
    ) as {
      userId: string;
      role: string;
    };

    (request as any).userId = decoded.userId;
    (request as any).role = decoded.role;
  } catch (error) {
    return reply.status(401).send({ error: "Invalid or expired token" });
  }
};
