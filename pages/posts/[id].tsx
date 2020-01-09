import { NextPage } from "next";
import NextError from "next/error";
import Head from "next/head";

import { useRef, useEffect } from "react";

import axios from "axios";
import Markdown from "react-markdown";
import ReactUtterances from "react-utterances";

import Layout from "../../components/Layout";
import getHostname from "../../src/getHostname";

const BlogPostPage: NextPage<{id: string, post?: any, status: number}> = ({ id, post, status }) => {
    if (status !== 200)
        return <NextError statusCode={status} />;

    let postRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (window && (window as any)._paq && postRef !== undefined) {
            (window as any)._paq.push(["trackContentImpressionsWithinNode", postRef.current]);
        }
    }, []);

    return (
        <Layout isBlog={true} canonical={`/posts/${id}`} title={post.title}>
            <Head>
                <meta property="og:description" content={post.summary} />
            </Head>
            <article ref={postRef}>
                <h2>{post.title}</h2>
                <Markdown source={post.content} />
            </article>
            { process.env.GITHUB_REPO && (
                <ReactUtterances repo={process.env.GITHUB_REPO}
                    type="pathname" />
            )}
        </Layout>
    );
}

BlogPostPage.getInitialProps = async (context) => {
    let splitid = context.query.id.toString().split("-")
    let id = splitid.pop();
    let titleid = splitid.join("-");
    let status = 200;
    
    try {
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
    } catch (err) {
        let status = err.response.status !== undefined ? err.response.status : 500;
        if (context.res) context.res.statusCode = status;
        return { status, id: `${titleid}-${id}` };
    }
}

export default BlogPostPage;
