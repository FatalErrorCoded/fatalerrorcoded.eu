import * as React from 'react'
import Layout from '../components/Layout'
import { NextPage } from 'next'

const IndexPage: NextPage = () => {
    return (
        <Layout>
            <section>
                <h1>Who the frick are you?</h1>
                <p>Hello there. I am a 16 year old Czech dude who does coding and stuff.</p>
            </section>
            <section>
                <h1>What languages and IDE do you use?</h1>
                <p>My favorite IDE is Visual Studio Code, running on top of glorious Manjaro Linux</p>
                <p>I am a jack of all trades as well, most experienced with Javascript, C++ and Rust, and some experience with Java, C# and PHP (HTML included as well, obviously)</p>
            </section>
        </Layout>
    )
}

export default IndexPage
