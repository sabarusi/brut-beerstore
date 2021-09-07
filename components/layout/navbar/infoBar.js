import Icon from "@chakra-ui/icon";
import { Stack, Text } from "@chakra-ui/layout";
import { FaBeer, FaTruck } from "react-icons/fa";

export default function InfoBar(){
    return  <Stack  direction="row" 
                    bg="primary.400" 
                    color="white"  
                    justify="space-around" 
                    fontWeight="bold" 
                    fontSize={{base:"xs",sm:"sm"}} 
                    textAlign="center" 
                    spacing={2}
                    p={2}>
                    <Stack direction="row" 
                            align="center" 
                            spacing={1}>
                                <Icon as={FaTruck}/>
                                <Text>
                                    Free shipping from $100
                                </Text>
                    </Stack>
                    <Stack direction="row" 
                            align="center" 
                            spacing={1}>
                                <Icon as={FaBeer}/>
                                <Text>
                                    Delivery in less than 24hs
                                </Text>
                    </Stack>
                </Stack>
}