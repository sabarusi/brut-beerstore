import {theme, extendTheme } from "@chakra-ui/react"
import "@fontsource/caveat"

export const customTheme = extendTheme({
    colors:{
        primary: theme.colors.green
    },
    fonts:{
    primary:"Caveat"
    },
    styles: {
        global: (props) => ({
          "html, body, #root": {
            height:"100%",
            fontSize: "md",
            lineHeight: "tall"
          }})
        }
    });