// import { Button, useMantineColorScheme } from "@mantine/core"
import { Footer, Header } from "./layouts";
import { WelcomePage } from "./pages";

function App() {
  // const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <>
      <Header />
      {/* <Button variant="secondary"  onClick={()=>toggleColorScheme()}>
      Toggle to {colorScheme === 'dark' ? 'light' : 'dark'} mode
    </Button> */}
      <WelcomePage />

      <Footer />
    </>
  );
}

export default App;
