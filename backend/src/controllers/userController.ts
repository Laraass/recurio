import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { name, email, password, confirmPassword } = request.body as {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    };

    if (password !== confirmPassword) {
      return reply.status(400).send({ error: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return reply.status(400).send({ error: "Email already in use" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    reply.status(201).send({ message: "User registered!", userId: user._id });
  } catch (error) {
    reply
      .status(500)
      .send({ error: "Failed to register user", details: error });
  }
};

export const loginUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    const user = await User.findOne({ email });
    if (!user) return reply.status(401).send({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return reply.status(401).send({ error: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "7d" }
    );

    reply.send({
      message: "Log in successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    reply.status(500).send({ error: "Log in failed", details: error });
  }
};

export const logoutUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  reply.send({ message: "Log out successful" });
};

export const getProfile = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const userId = (request as any).userId;

    const user = await User.findById(userId).select("-password");
    if (!user) return reply.status(404).send({ error: "User not found" });

    reply.send({ user });
  } catch (error) {
    reply
      .status(500)
      .send({ error: "Failed to fetch profile", details: error });
  }
};

export const toggleSubscription = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const userId = (request as any).userId;

    const user = await User.findById(userId);
    if (!user) return reply.status(404).send({ error: "User not found" });

    const willSubscribe = user.role !== "subscriber";
    user.role = willSubscribe ? "subscriber" : "default";
    await user.save();

    reply.send({
      message: `Subscription ${willSubscribe ? "enabled" : "disabled"}`,
      user,
    });
  } catch (error) {
    reply
      .status(500)
      .send({ error: "Failed to update subscription status", details: error });
  }
};
