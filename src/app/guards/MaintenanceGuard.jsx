import { useEffect } from "react";
import MaintenancePage from "../layout/MaintenancePage";

/**
 * MaintenanceGuard component
 * 
 * Checks if maintenance mode is enabled via VITE_MAINTENANCE_MODE environment variable.
 * If enabled, shows the maintenance page instead of the protected content.
 * 
 * Optional bypass: Set VITE_MAINTENANCE_BYPASS_SECRET in env and use ?bypass=SECRET in URL
 */
const MaintenanceGuard = ({ children }) => {
    
    // Check if maintenance mode is enabled
    const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === "true";
    const bypassSecret = import.meta.env.VITE_MAINTENANCE_BYPASS_SECRET;
    
    useEffect(() => {
        // Check for bypass parameter in URL
        const urlParams = new URLSearchParams(window.location.search);
        const bypassParam = urlParams.get("bypass");
        
        if (isMaintenanceMode && bypassSecret && bypassParam === bypassSecret) {
            // Store bypass in sessionStorage so it persists during navigation
            sessionStorage.setItem("maintenance_bypass", "true");
        }
    }, [isMaintenanceMode, bypassSecret]);

    // Check if maintenance is enabled and bypass is not active
    const shouldShowMaintenance = isMaintenanceMode && 
        !sessionStorage.getItem("maintenance_bypass");

    if (shouldShowMaintenance) {
        return <MaintenancePage />;
    }

    return <>{children}</>;
};

export default MaintenanceGuard;

