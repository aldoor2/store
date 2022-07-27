import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<unknown> {
  try {
    if (req.headers["x-secret"] === process.env.REVALIDATE_SECRET) {
      await res.revalidate("/");

      return res.json({ revalidated: true });
    }

    return res.status(401).end();
  } catch (error) {
    return res.status(500).send("Error revalidating");
  }
}
