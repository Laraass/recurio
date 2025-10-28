import mongoose from "mongoose";
import dotenv from "dotenv";
import { Subscription } from "../models/Subscription";
import { subscriptions } from "../data/subscriptions";
dotenv.config();

const seedSubscriptions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Connected to MongoDB");

    for (const sub of subscriptions) {
      const cleanSub = { ...sub };

      const exists = await Subscription.findOne({ company: sub.company });

      if (!exists) {
        await Subscription.create(cleanSub);
        console.log(`Added subscription: ${sub.company}`);
      } else {
        console.log(`Skipped (already exists): ${sub.company}`);
      }
    }

    console.log("Seeding completed");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedSubscriptions();
