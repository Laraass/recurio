import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../models/User";
import bcrypt from "bcryptjs";

export const registerUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try{
        const { name, email, password } = request.body as {
            name: string, 
            email: string, 
            password: string
        };

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name, 
            email,
            password: hashPassword
        });

        reply.status(201).send({ message: "User registered!", userId: user._id });
    } catch (error) {
        reply.status(500).send({ error: "Failed to register user", details: error });
    }
}

