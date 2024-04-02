import { NextApiRequest, NextApiResponse } from "next";

const reloadPrerendering = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  if (req.body.secret !== process.env.REACT_APP_WEBHOOK_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    if (req.body.pathname) await res.revalidate(req.body.pathname);
    return res.status(200).send("OK");
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
};

export default reloadPrerendering;
