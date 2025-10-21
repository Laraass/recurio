import { FastifyReply, FastifyRequest } from "fastify";
import { Subscription } from "../models/Subscription";

export const listAllSubscriptions = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const subscriptions = await Subscription.find();
        reply.send({ subscriptions })
    } catch (error) {
        reply.status(500).send({ error: "Failed to fetch subscriptions", details: error })
    }
}

export const listUserSubscriptions = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { userId } = request.params as { userId: string };

        const subscriptions = await Subscription.find({ userId })
        reply.send({ subscriptions })
    } catch (error) {
        reply.status(500).send({ error: "Failed to fetch user subscriptions", details: error })
    }
}

