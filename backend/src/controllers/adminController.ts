import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../models/User";

export const listAllUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { search } = request.query as { search?: string }

        const query = search
        ? {
            $or: [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ],
        }
        : {}

        const users = await User.find(query).select("-password");
        reply.send({ users })
    } catch (error) {
        reply.status(500).send({ error: "Failed to fetch users", details: error })
    }
}

