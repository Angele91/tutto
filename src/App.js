import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import { Router } from '@reach/router';
import { MainView } from './views/MainView';
import { theme } from './theme';
import { NotesView } from './views/NotesView';
import { SummaryView } from './views/SummaryView';
import { CustomFieldsFilter } from './components/CustomFieldsFilter';
import { useTasks } from './hooks/tasks/useTasks';
import { Tasks } from './jotai/atoms/tasks';

function App() {
  const { tasks: { isTasksFilterOpen }, closeTasksFilter } = useTasks(Tasks);

  return (
    <ChakraProvider theme={theme}>
      <CustomFieldsFilter
        isOpen={isTasksFilterOpen}
        onClose={closeTasksFilter}
      />
      <Router>
        <MainView path="/" />
        <NotesView path="/notes" />
        <SummaryView path="/summary" />
      </Router>
    </ChakraProvider>
  );
}

export default App;
