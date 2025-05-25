// import { Button, useMantineColorScheme } from "@mantine/core"
import { RouterProvider } from "react-router";
import router from "./routes";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";

function App() {
    // const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    // const dispatch = useDispatch()

    // useEffect(() => {
    //     // getActiveUser();
    //     dispatch(checkUseSession())
    // },[dispatch]) 


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
