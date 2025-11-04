import { UserType } from "../../users/enums/user-type.enums";

export interface ActiveUserData {
    sub: number;
    email: string;
    username: string;
    user_type: UserType;
}