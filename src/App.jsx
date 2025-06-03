// import { Button, useMantineColorScheme } from "@mantine/core"
import { RouterProvider } from "react-router";
import router from "./routes";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { startTokenRefreshScheduler } from "./utils/api/startTokenRefreshScheduler";
import { isLoggedIn } from "./stores/user/user.selector";
import { getTokenExpiry } from "./utils/tokenManager";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";

function App() {
  // const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const accessToken = useSelector((state) => state.user.accessToken);

  useEffect(() => {
    if (accessToken) {
      const expiry = getTokenExpiry(accessToken);
      const date = new Date(expiry * 1000);
      console.log(date.toString());
      console.log(expiry);
    }
  }, [accessToken]);

  const isLoggedInUser = useSelector(isLoggedIn);

  useEffect(() => {
    if (isLoggedInUser) {
      startTokenRefreshScheduler();
    }
  }, [isLoggedInUser]);

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
