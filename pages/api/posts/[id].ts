import { NextApiRequest, NextApiResponse } from "next";
import { Connection } from "mysql";

import withMiddleware from "../../../middleware";

const GetPostById = (req: NextApiRequest & {db: Connection}, res: NextApiResponse) => {
    if (!req.query.id) {
        res.status(400).send(JSON.stringify({
            success: false,
            message: "Bad Request"
        }));
        res.end();
        return;
    }

    req.db.query("SELECT * FROM posts WHERE id = ?", [req.query.id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(JSON.stringify({
                success: false,
                message: "Server Error"
            }));
            res.end();
            return;
        }
        
        if (result === undefined || result[0] === undefined) {
            res.status(404).send(JSON.stringify({
                success: false,
                message: `Post with ID ${req.query.id} not found`
            }));
            res.end();
            return;
        }

        res.status(200).send(JSON.stringify({ success: true, data: result[0] }));
        res.end();
    });
}

export default withMiddleware(GetPostById);
