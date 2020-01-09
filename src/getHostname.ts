import { IncomingMessage } from "http";

const getHostname = (req: IncomingMessage | undefined) => {
    if (req === undefined) return process.env.REMOTE_HOSTNAME;
    else return process.env.LOCAL_HOSTNAME;
}

export default getHostname;
