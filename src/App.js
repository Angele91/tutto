import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import { Router } from '@reach/router';
import { MainView } from './views/MainView';
import { theme } from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <MainView path="/" />
      </Router>
    </ChakraProvider>
  );
}

export default App;
