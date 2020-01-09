import { NextPage } from "next";
import Link from "next/link";
import axios from "axios";

import Layout from "../../components/Layout";

const BlogIndexPage: NextPage<{posts?: any, status: number}> = ({ posts, status }) => {
    if (status !== 200) {
        return (
            <Layout isBlog={true} canonical={"/blog"}>
                <span>{status}</span>
            </Layout>
        )
    }

    let post_tags = [];
    for (let post of posts.posts) {
        post_tags.push(
            <div key={post.id}>
                <h2 style={{margin: "0px"}}><Link href={`/blog/${post.id}`}><a>{post.title}</a></Link></h2>
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

BlogIndexPage.getInitialProps = async () => {
    let res = await axios.get(`http://localhost:3000/api/posts`);

    return {
        posts: res.status === 200 ? res.data.data : undefined,
        status: res.status
    }
}

export default BlogIndexPage;
