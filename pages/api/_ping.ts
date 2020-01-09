// Used for health checks
import { NextApiRequest, NextApiResponse } from "next";

const Ping = (_req: NextApiRequest, res: NextApiResponse) => res.send("Pong!");

export default Ping;
