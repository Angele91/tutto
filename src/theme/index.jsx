import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: 'dark', // 'dark' | 'light'
  useSystemColorMode: false,
}

export const theme = extendTheme({
  config,
  styles: {
    global: {
      // Everything uses Inter
      body: {
        fontFamily: 'Inter',
      }
    }
  },
  components: {
    Card: {
      baseStyle: {
        borderRadius: '8px',
      }
    }
  },
  colors: {
    background: '#EDF2F7'
  }
})