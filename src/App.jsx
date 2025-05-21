// import { Button, useMantineColorScheme } from "@mantine/core"
import { RouterProvider } from "react-router";
import router from "./routes";

function App() {
  // const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <>
      {/* <Button variant="secondary"  onClick={()=>toggleColorScheme()}>
      Toggle to {colorScheme === 'dark' ? 'light' : 'dark'} mode
    </Button> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
