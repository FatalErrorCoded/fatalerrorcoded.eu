import { NextPage } from "next";
import axios from "axios";

import Layout from "../../components/Layout";
import Markdown from "react-markdown";

const BlogIndexPage: NextPage<{id: string, post?: any, status: number}> = ({ id, post, status }) => {
    if (status !== 200) {
        return (
            <Layout isBlog={true}>
                <span>{status}</span>
            </Layout>
        )
    }

    return (
        <Layout isBlog={true} canonical={`/blog/${id}`} title={post.title}>
            <h2>{post.title}</h2>
            <Markdown source={post.content} />
        </Layout>
    );
}

BlogIndexPage.getInitialProps = async (context) => {
    let id = context.query.id.toString();
    let res = await axios.get(`http://localhost:3000/api/posts/${id}`);

    return {
        post: res.status === 200 ? res.data.data : undefined,
        status: res.status,
        id
    }
}

export default BlogIndexPage;
