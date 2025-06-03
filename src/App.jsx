// import { Button, useMantineColorScheme } from "@mantine/core"
import { RouterProvider } from "react-router";
import router from "./routes";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { startTokenRefreshScheduler } from "./utils/api/startTokenRefreshScheduler";
import { getTokenExpiry } from "./utils/tokenManager";
import { isLoggedIn } from "./stores/auth/authSelector";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";

function App() {
  // const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (accessToken) {
      const expiry = getTokenExpiry(accessToken);
      const date = new Date(expiry * 1000);
      console.log(date.toString());
      console.log(expiry);
    }
  }, [accessToken]);

  const isLoggedInUser = useSelector(isLoggedIn);
console.log(isLoggedInUser);

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
