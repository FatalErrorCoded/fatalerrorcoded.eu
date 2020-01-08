import { NextPage } from "next";

import Layout from "../../components/Layout";

const BlogIndexPage: NextPage = () => {
    return (
        <Layout isBlog={true} canonical="/blog">
            <span>BLOG POSTS GO HERE</span>
        </Layout>
    );
}

export default BlogIndexPage;
