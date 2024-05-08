import {createTheme, MantineProvider} from "@mantine/core";
import "./App.css"
import {router} from "./app/router";
import {Counter} from "./features/counter/Counter"
import {Quotes} from "./features/quotes/Quotes"
import logo from "./logo.svg"
import '@mantine/core/styles.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {WindowsContextProvider} from "./app/components/WindowsContext";

const theme = createTheme({
  /** Put your mantine theme override here */
});


const App = () => {
  return (
    <MantineProvider theme={theme}>
      <div className="App">
        <WindowsContextProvider>
          <RouterProvider router={router} />
        </WindowsContextProvider>
      </div>
    </MantineProvider>
  )
}

export default App
