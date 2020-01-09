import { NextApiRequest, NextApiResponse } from "next";
import { Connection } from "mysql";

import withMiddleware from "../../../middleware";

const GetPostById = (req: NextApiRequest & {db: Connection}, res: NextApiResponse) => {
    res.setHeader("Content-Type", "application/json");
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

        let post = result[0];
        if (!post.summary) {
            post.summary = post.content.replace(/\r/g, "").split("\n\n")[0];
            if (post.summary.length > 150) post.summary = post.summary.substring(0, 150) + "...";
        }

        res.status(200).send(JSON.stringify({ success: true, data: post }));
        res.end();
    });
}

export default withMiddleware(GetPostById);
