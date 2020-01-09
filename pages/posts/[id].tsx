import { NextPage } from "next";
import NextError from "next/error";
import Head from "next/head";

import axios from "axios";
import Markdown from "react-markdown";

import Layout from "../../components/Layout";
import getHostname from "../../src/getHostname";

const BlogIndexPage: NextPage<{id: string, post?: any, status: number}> = ({ id, post, status }) => {
    if (status !== 200)
        return <NextError statusCode={status} />;

    return (
        <Layout isBlog={true} canonical={`/posts/${id}`} title={post.title}>
            <Head>
                <meta property="og:description" content={post.summary} />
            </Head>
            <h2>{post.title}</h2>
            <Markdown source={post.content} />
        </Layout>
    );
}

BlogIndexPage.getInitialProps = async (context) => {
    let splitid = context.query.id.toString().split("-")
    let id = splitid.pop();
    let titleid = splitid.join("-");
    let status = 200;

    let res = await axios.get(`${getHostname(context.req)}/api/posts/${id}`);
    if (res.status !== 200 || titleid !== res.data.data.titleid) {
        status = res.status !== 200 ? res.status : 404;
        if (context.res)
            context.res.statusCode = status;
    }

    return {
        post: res.status === 200 ? res.data.data : undefined,
        status, id: `${titleid}-${id}`
    }
}

export default BlogIndexPage;
