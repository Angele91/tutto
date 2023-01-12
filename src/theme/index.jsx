import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
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