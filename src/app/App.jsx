import { RouterProvider } from "react-router"
import router from "./router"
import MaintenanceGuard from "./guards/MaintenanceGuard"


function App() {

    return (
        <MaintenanceGuard>
            <RouterProvider router={router} />
        </MaintenanceGuard>
    )
}

export default App
