import { UserType } from "src/users/enums/user-type.enums";

export interface ActiveUserData {
    // ID of the user
    sub: number;
    // Email of the user
    email: string;
    // Type of the user
    user_type: UserType;
}