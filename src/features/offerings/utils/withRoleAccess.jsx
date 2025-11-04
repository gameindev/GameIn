import { useMemo } from "react";
import { useAppSelector } from "../../../app/store/hooks";
import { currentUser } from "../../auth/store/selector";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";



export function withRoleAccess(Component) {
    return function RoleAccessWrapper(props) {
        const user = useAppSelector(currentUser);

        const rolePermissions = useMemo(() => {
            const role = user?.user_type?.toLowerCase() || "";
            switch (role) {
                case USERTYPES.CREATOR.toLowerCase():
                    return {
                        canEdit: true,
                        overrideDisabledFields: ["all"],
                    };
                case USERTYPES.BRAND.toLowerCase():
                    return {
                        canEdit: true,
                        overrideDisabledFields: ["repetation", "size", "duration",],
                    };
                case USERTYPES.COMMUNITY.toLowerCase():
                    return {
                        canEdit: false,
                        overrideDisabledFields: [],
                    };
                default:
                    return {
                        canEdit: false,
                        overrideDisabledFields: [],
                    };
            }
        }, [user?.user_type]);

        return <Component {...props} rolePermissions={rolePermissions} />;
    };
}