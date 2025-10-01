import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { currentUser } from "../../../stores/selectors";

export function withRoleAccess(Component) {
  return function RoleAccessWrapper(props) {
    const { user } = useSelector(currentUser);

    const rolePermissions = useMemo(() => {
      const role = user?.user_type?.toLowerCase() || "";
      switch (role) {
        case "creator":
          return {
            canEdit: true,
            overrideDisabledFields: ["all"],
          };
        case "brand":
          return {
            canEdit: true,
            overrideDisabledFields: ["repetation", "size", "duration",],
          };
        case "community":
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
