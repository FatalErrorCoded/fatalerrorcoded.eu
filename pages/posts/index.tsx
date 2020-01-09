import { NextPage } from "next";
import NextError from "next/error";
import Link from "next/link";

import axios from "axios";

import Layout from "../../components/Layout";
import getHostname from "../../src/getHostname";

const BlogIndexPage: NextPage<{posts?: any, status: number}> = ({ posts, status }) => {
    if (status !== 200)
        return <NextError statusCode={status} />

    let post_tags = [];
    for (let post of posts.posts) {
        post_tags.push(
            <div key={post.id}>
                <h3 style={{margin: "0px"}}>
                    <Link href="/posts/[id]" as={`/posts/${post.titleid}-${post.id}`}>
                        <a>{post.title}</a>
                    </Link>
                </h3>
                <p style={{color: "#909090"}}>{post.summary}</p>
            </div>
        )
    }

    return (
        <Layout isBlog={true} canonical={"/blog"}>
            {post_tags}
        </Layout>
    );
}

BlogIndexPage.getInitialProps = async (context) => {
    try {
        let res = await axios.get(`${getHostname(context.req)}/api/posts`);
        if (context.res) context.res.statusCode = res.status;

        return {
            posts: res.status === 200 ? res.data.data : undefined,
            status: res.status
        }
    } catch (err) {
        let status = err.response.status !== undefined ? err.response.status : 500;
        if (context.res) context.res.statusCode = status;
        return { status };
    }
}

export default BlogIndexPage;
