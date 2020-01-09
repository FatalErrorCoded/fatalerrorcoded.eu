import { NextApiRequest, NextApiResponse } from "next";
import * as mysql from "mysql";

const connection = mysql.createConnection({
    host: process.env.DB_URI,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});



const withDatabase = (handler: (req: NextApiRequest & { db: mysql.Connection }, res: NextApiResponse) => any) =>
    (req: NextApiRequest & { db: mysql.Connection }, res: NextApiResponse) =>
{
    if (connection.state === "disconnected") {
        return new Promise((resolve, reject) => {
            connection.connect((err) => {
                if (err) reject(err);
                req.db = connection;
                resolve(handler(req, res));
            });
        });
    }

    req.db = connection;
    return handler(req, res);
}

export default withDatabase;
