import { ChakraProvider} from '@chakra-ui/react'
import { CartProvider } from '@/components/context/cart'
import Layout  from '@/components/layout/layout'
import { customTheme } from '@/components/layout/theme'


function MyApp({ Component, pageProps }) {
 
  return <ChakraProvider theme={customTheme}>
          <CartProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CartProvider>
         </ChakraProvider>
}

export default MyApp
