import { Stack } from '@chakra-ui/react'
import React from 'react'
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("./footer/footer"))
const Navbar = dynamic(() => import('./navbar/Navbar'))

export default function Layout({children}){
    return (<Stack height="100vh" spacing={0}>
                <Navbar/>
                {children}
                <Footer/>
            </Stack>
    )
}
