import { FastifyReply, FastifyRequest } from "fastify";
import { Subscription } from "../models/Subscription";
import { subscriptions } from "../data/subscriptions";

export const listAllSubscriptions = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
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

export const addSubscription = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { userId } = request.params as { userId: string };
        const { price, description, company } = request.body as {
            price: number;
            description?: string;
            company: string;
        }

        if (!price ) {
            return reply.status(400).send({ error: "Price is required"})
        }

        const existingSub = subscriptions.find(sub => sub.company === company)
        if (!existingSub) {
            return reply.status(400).send({ error: "Invalid subscription" })
        }

        const alreadyAdded = await Subscription.findOne({ userId, company })
        if (alreadyAdded) {
            return reply.status(400).send({ error: "Subscription already added"})
        }

        const subscription = await Subscription.create({
            userId,
            price,
            description,
            company: existingSub.company,
            category: existingSub.category,
            image: existingSub.image,
        })

        reply.status(201).send({ message: "Subscription added!", subscription})
    } catch (error) {
        reply.status(500).send({ error: "Failed to add subscription", details: error })
    }
}

export const editSubscription = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = request.params as { id: string }
        const { price, description } = request.body as {
            price: number;
            description?: string;
        }

        if (!price ) {
            return reply.status(400).send({ error: "Price is required"})
        }

        const subscription = await Subscription.findByIdAndUpdate(id, { price, description }, { new: true })
        if (!subscription) return reply.status(404).send({ error: "Subscription not found"})

        reply.send({ message: "Subscription edited", subscription })
        } catch (error) {
        reply.status(500).send({ error: "Failed to edit subscription", details: error })
    }
}

export const deleteSubscription = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = request.params as { id: string };
        const subscription = await Subscription.findByIdAndDelete(id);
        if (!subscription) return reply.status(404).send({ error: "Subscription not found" })

        reply.send({ message: "Subscription deleted" })
    } catch (error) {
        reply.status(500).send({ error: "Failed to delete subscription", details: error})
    }
}


