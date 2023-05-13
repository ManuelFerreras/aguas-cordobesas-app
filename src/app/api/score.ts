// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../lib/mongodb";
import Score from "../../models/Score";

type Data = {
  score: number;
  username: string;
};

type Response = {
  message: string;
  scores?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "POST") {
    try {
      await connectDB();
      const newScore = await new Score({
        difficulty: req.body.difficulty,
        score: req.body.score,
        username: req.body.session.user.name,
        image: req.body.session.user.image,
      });
      await newScore.save();
      return res.status(200).json({ message: "Score submitted." });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "No fue posible guardar el score." });
    }
  } else if (req.method === "GET") {
    try {
      await connectDB();
      const scores = await Score.find();
      return res.json({ scores: scores, message: "ok" });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "No fue posible conseguir los scores" });
    }
  }
}
