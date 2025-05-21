// import { Button, useMantineColorScheme } from "@mantine/core"
import { Footer, Header } from "./layouts";
import { WelcomePage } from "./pages";
import { Routes, Route } from "react-router";
import { Register, Signin } from "./pages/auth";

function App() {
  // const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <>
      <Header />
      {/* <Button variant="secondary"  onClick={()=>toggleColorScheme()}>
      Toggle to {colorScheme === 'dark' ? 'light' : 'dark'} mode
    </Button> */}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
