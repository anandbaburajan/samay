import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../src/utils/db";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
    try {
        await connectToDatabase();
        const result = await mongoose.connection.db.admin().ping();
        if (result.ok) {
            return res.status(200).json(result);
        }
        return res.status(500).json({ ok: 0 });
    } catch (err) {
        return res.status(500).json({ ok: 0 });
    }
};
