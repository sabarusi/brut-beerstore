import dynamic from "next/dynamic"
import { Stack } from "@chakra-ui/layout";
import {useRouter} from "next/router"
import LinkMenu from "./links";
const CustomModal = dynamic(() => import("@/components/shop/modal"))

export default function MenuMobile({isOpen,onClose}){
    const router = useRouter();
    return <CustomModal isOpen={isOpen} 
                        onClose={onClose}>
                        <Stack align="center"
                                fontFamily={"Caveat"} 
                                color="primary.400" 
                                fontSize={"5xl"}
                                spacing={10}>
                                    <LinkMenu links={[{text:"Home",
                                                       action:()=> {router.push("/", undefined,{shallow:true});
                                                                     onClose()}
                                                      },
                                                      {text:"Shop",
                                                       action:()=>{router.push("/shop",undefined,{shallow:true});
                                                                  onClose()}
                                                      },
                                                      {text:"About",
                                                       action:()=>{onClose(); 
                                                                   setTimeout(()=> router.push("/#about", 
                                                                                   undefined, 
                                                                                   {shallow:true})
                                                                  ,300)}
                                                      }]
                                                    }        
                                    />
                                </Stack>
                        </CustomModal>
}