import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../models/User";
import { sendEmail as sendMail } from "../utils/email";
import { Subscription } from "../models/Subscription";

export const listAllUsers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { search } = request.query as { search?: string };

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(query).select("-password");
    reply.send({ users });
  } catch (error) {
    reply.status(500).send({ error: "Failed to fetch users", details: error });
  }
};

export const editUserRole = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as { id: string };
    const { role } = request.body as {
      role: "default" | "subscriber" | "admin";
    };

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select("-password");
    if (!user) return reply.status(404).send({ error: "User not found" });

    reply.send({ message: "User role updated", user });
  } catch (error) {
    reply
      .status(500)
      .send({ error: "Failed to update user role", details: error });
  }
};

export const deleteUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as { id: string };

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser)
      return reply.status(404).send({ error: "User not found" });

    reply.send({ message: "User deleted", userId: id });
  } catch (error) {
    reply.status(500).send({ error: "Failed to delete user", details: error });
  }
};

export const sendEmail = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const subscribers = await User.find({ role: "subscriber" }).select(
      "name email _id"
    );

    for (const user of subscribers) {
      const subscriptions = await Subscription.find({ userId: user._id });
      const totalSum = subscriptions.reduce((sum, sub) => sum + sub.price, 0);

      const emailMessage = `Hello ${user.name}! Your total cost for your subscriptions this month is ${totalSum} kr.`;

      await sendMail({
        to: user.email,
        subject: "Your monthly subscription summary",
        text: emailMessage,
      });
    }

    reply.send({
      message: `Emails sent to ${subscribers.length} subscribers`,
    });
  } catch (error) {
    reply.status(500).send({ error: "Failed to send emails", details: error });
  }
};
