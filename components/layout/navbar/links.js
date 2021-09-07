import { Button } from "@chakra-ui/button"
import { Box } from "@chakra-ui/layout"
import { AnimatePresence, motion } from "framer-motion"

const MenuItem = ({text, onClick})=>{
    return  <Box d="flex" 
                 align="center"
                 as={motion.div} 
                 whileHover={{scale:1.1}}
                 pb={4}>
                    <Button as="a"
                            variant="unstyled" 
                            fontWeight={200} 
                            fontSize="4xl" 
                            onClick={onClick}
                            cursor="pointer">
                            {text}
                    </Button>
             </Box>          
}

export default function LinkMenu({links}){
    return <AnimatePresence>
                {links?.map((link, i)=> <MenuItem key={i}
                                             text={link.text} 
                                             onClick={link.action}
                                    />)
                }
            </AnimatePresence>
}
