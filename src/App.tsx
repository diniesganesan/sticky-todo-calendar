import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { StickyTodoCalendar } from './container';

function App() {
  return (
    <ChakraProvider>
      <StickyTodoCalendar />
    </ChakraProvider>
  );
}

export default App;
