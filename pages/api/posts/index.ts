import { NextApiRequest, NextApiResponse } from "next";
import { Connection } from "mysql";

import withMiddleware from "../../../middleware";

const GetPosts = (req: NextApiRequest & {db: Connection}, res: NextApiResponse) => {
    let page = 0;
    if (req.query.page) {
        let parsedPage = parseInt(req.query.page.toString())
        if (isNaN(parsedPage) || parsedPage <= 0) {
            res.status(400).send(JSON.stringify({
                success: false,
                message: "page GET parameter must be a number and must be bigger than 0"
            }));
            res.end();
            return;
        }

        page = parsedPage - 1;
    }

    const serverError = (err: any) => {
        console.error(err);
        res.status(500).send(JSON.stringify({
            success: false,
            message: "Server Error"
        }));
        res.end();
    }

    req.db.query("SELECT COUNT(*) FROM posts", [], (err, count_result) => {
        if (err) {
            serverError(err);
            return;
        }

        req.db.query("SELECT * FROM posts ORDER BY created_at DESC LIMIT ?, 10", [page * 10], (err, post_result) => {
            if (err) {
                serverError(err);
                return;
            }

            let posts = [];
            for (let post of post_result) {
                // Saving data yes
                if (!post.summary) {
                    post.summary = post.content.replace(/\r/g, "").split("\n\n")[0];
                    if (post.summary.length > 150) post.summary = post.summary.substring(0, 150) + "...";
                }
                post.content = undefined;

                posts.push(post);
            }

            let page_count = Math.floor((count_result[0]["COUNT(*)"] - 1) / 10) + 1;
            let json = {
                success: true,
                data: {
                    page_count: page_count,
                    posts: post_result
                }
            }
            res.status(200).send(JSON.stringify(json));
            res.end();
        });
    });
}

export default withMiddleware(GetPosts);
