import * as React from 'react'
import Layout from '../components/Layout'
import { NextPage } from 'next'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

type ProjectProps = {
    name: string,
    repository?: string
    status?: string
}

const Project: React.FunctionComponent<ProjectProps> = (props) => {
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                onClick={() => {
                    if (window && (window as any)._paq) {
                        (window as any)._paq.push(["trackEvent", "Project", props.name]);
                    }
                }}
            >
                <b>{props.name}</b>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div>
                    {props.children}
                    <br /><br />

                    {props.status &&
                        <>
                            <span style={{ color: "#909090" }}>Status: {props.status}</span>
                            <br />
                        </>
                    }
                    {props.repository && <a target="_blank" href={props.repository}>
                        Repository
                    </a>}
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

const IndexPage: NextPage = () => {
    return (
        <Layout canonical="/">
            <section>
                <h1>Who the frick are you?</h1>
                <p>Hello there. I am a 16 year old Czech dude who does coding and stuff.</p>
            </section>
            <section>
                <h1>What languages and IDE do you use?</h1>
                <p>My favorite IDE is Visual Studio Code, running on top of glorious Manjaro Linux</p>
                <p>I am a jack of all trades as well, most experienced with Javascript, C++ and Rust, and some experience with Java, C# and PHP (HTML included as well, obviously)</p>
            </section>
            <section>
                <h1>My projects</h1>
                <Project
                    name="guiworks" repository="https://github.com/fatalerrorcoded/guiworks" status="Active"
                >
                    <span>A React-style Discord.js library for interactive embeds</span>
                </Project>
                <Project
                    name="memeos" repository="https://gitlab.insrt.uk/fatalerrorcoded/memeos" status="Active"
                >
                    <span style={{ textDecoration: "line-through" }}>An epic meme OS for epic memers</span><br />
                    <span>An attempt at an operating system in Rust</span><br />
                    <span>Currently in the state of printing to the screen</span>
                </Project>
                <Project
                    name="jschlatt" repository="https://github.com/fatalerrorcoded/jschlatt" status="On hold"
                >
                    <span>A joke Discord bot that sends/plays jschlatt quotes</span>
                </Project>
                <Project
                    name="Rusty Fractals" repository="https://github.com/fatalerrorcoded/rusty-fractals" status='"complete"'
                >
                    <span>An OpenGL mandelbrot set viewer coded in Rust</span><br />
                    <span>Functional, but pretty buggy</span>
                </Project>
                <Project
                    name="victusrp.gq" repository="https://gitlab.insrt.uk/fatalerrorcoded/victusrp.gq" status="Abandoned"
                >
                    <span>A website for a Czech GTA V roleplay server</span><br />
                    <span>Probably my best work done without utilizing React, but abandoned after the GTA V server has been shut down.</span>
                </Project>
            </section>
            <section>
                <h1>Contact Me</h1>
                <p>Any questions and inquiries can be sent to me@fatalerrorcoded.eu, or you can send me a message on my Discord FatalErrorCoded#4173</p>
            </section>
        </Layout>
    )
}

export default IndexPage
