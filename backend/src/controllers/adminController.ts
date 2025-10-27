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

export const editUserRole = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = request.params as { id: string }
        const { role } = request.body as { role: "default" | "subscriber" | "admin" }

        const user = await User.findByIdAndUpdate(id, { role }, {new: true }).select("-password")
        if (!user) return reply.status(404).send({ error: "User not found" })

        reply.send({ message: "User role updated", user})
    } catch (error) {
        reply.status(500).send({ error: "Failed to update user role", details: error })
    }
}

export const deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = request.params as { id: string }

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return reply.status(404).send({ error: "User not found" })

        reply.send({ message: "User deleted", userId: id })
    } catch (error) {
        reply.status(500).send({ error: "Failed to delete user", details: error })
    }
}

