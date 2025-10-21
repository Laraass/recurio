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

 // change when sub data is added
export const addSubscription = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { userId } = request.params as { userId: string };
        const { price, description, company, image } = request.body as {
            price: number;
            description?: string;
            company?: string;
            image?: string;
        }

        if (!price ) {
            return reply.status(400).send({ error: "Price is required"})
        }

        const subscription = await Subscription.create({
            userId,
            price,
            description,
            company: company || "",
            image: image || "",
        })

        reply.status(201).send({ message: "Subscription added!", subscription})
    } catch (error) {
        reply.status(500).send({ error: "Failed to add subscription", details: error })
    }
}

export const editSubscription = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = request.params as { id: string }
        const edit = request.body as Partial<{
            price: number;
            description: string;
        }>;

        const subscription = await Subscription.findByIdAndUpdate(id, edit, { new: true })
        if (!subscription) return reply.status(404).send({ error: "Subscription not found"})

        reply.send({ message: "Subscription edited", subscription })
        } catch (error) {
        reply.status(500).send({ error: "Failed to edit subscription", details: error })
    }
}

