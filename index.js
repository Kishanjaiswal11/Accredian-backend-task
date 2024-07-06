import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sendEmail } from "./gmail.js";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post("/refer", async (req, res) => {
  const { referrerName, referrerEmail, refereeName, refereeEmail, message } =
    req.body;

  if (!referrerName || !referrerEmail || !refereeName || !refereeEmail) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  try {
    const referral = await prisma.refer_earn.create({
      data: {
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail,
        message,
      },
    });

    const emailResult = await sendEmail(refereeName, refereeEmail, message);
    if (emailResult instanceof Error) {
      return res.status(500).json({ error: "Error sending email" });
    }

    res.status(201).json(referral);
  } catch (error) {
    console.error("Error creating referral:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
