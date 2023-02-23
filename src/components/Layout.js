
import Head from "next/head"
import { NavBar } from "./NavBar"

export const Layout = ({children})=>(
    <>
        <Head>
            <title>Task App</title>
        </Head>
        <NavBar />
        {children}
    </>
)