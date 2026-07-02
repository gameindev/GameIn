import { RouterProvider } from "react-router"
import router from "./router"
import MaintenanceGuard from "./guards/MaintenanceGuard"
import SessionValidator from "./guards/SessionValidator"


function App() {

    return (
        <MaintenanceGuard>
            <SessionValidator />
            <RouterProvider router={router} />
        </MaintenanceGuard>
    )
}

export default App
