import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../models/User";

export const listAllUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const users = await User.find().select("-password");
        reply.send({ users })
    } catch (error) {
        reply.status(500).send({ error: "Failed to fetch users", details: error })
    }
}

