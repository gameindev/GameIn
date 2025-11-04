import { UserSection } from "../styles/style";
import { calculateAge } from "../../../../shared/utils/helpers/calculateAge.helper";
import Verified from "../../../../shared/components/svg-icons/Verifed";
import Badge from "../../../../shared/components/svg-icons/Badge";
import CountryFlag from "../../../../shared/components/CountryFlag";
import { useEffect, useState } from "react";
import { IconGenderFemale, IconGenderGenderless, IconGenderMale, IconGenderTransgender } from "@tabler/icons-react";

export default function UserInfo({user}) {
    const age = calculateAge(user?.date_of_birth);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        setProfile(user?.brand_profile || user?.creator_profile);
    }, [user]);

    return (
        <UserSection>
            <div className="infoSection">
                <div className="user_info">
                    <div className="profile_name">{user.username}</div>
                    <div className="profile_info">
                        
                        {profile?.country && (
                            <div className="nationality">{<CountryFlag countryCode={profile?.country.toUpperCase()} size={16} />}</div>
                        )}

                        {user.user_type === "CREATOR" && (
                            <>
                                <div className="age">{age || "N/A"}</div>
                                
                                {user.creator_profile?.gender && (
                                    <>
                                        {user.creator_profile?.gender.toLowerCase() === "male" && <IconGenderMale size={16} color="gray" title="Male" />}
                                        {user.creator_profile?.gender.toLowerCase() === "female" && <IconGenderFemale size={16} color="gray" title="Female" />}
                                        {user.creator_profile?.gender.toLowerCase() === "other" && <IconGenderGenderless size={16} color="gray" title="Other" />}
                                        {user.creator_profile?.gender.toLowerCase() === "prefer not to say" && <IconGenderTransgender size={16} color="gray" title="Prefer not to say" />}
                                    </>
                                )}
                            </>
                        )}
                        {
                            user.is_verified && (
                                <div className="verified">
                                    <Verified />
                                </div>
                            )
                        }
                        <div className="badge_info">
                            <Badge />
                        </div>
                    </div>
                </div>
            </div>
        </UserSection>
    )
}