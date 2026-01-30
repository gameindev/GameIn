import { Save, Settings } from "lucide-react";
import { SettingsCard } from "../styles/settingStyles";
import { Button, Grid, Select, TextInput, Title, Text } from "@mantine/core";
import { formatDateHelper } from "../../../shared/utils/helpers/formDate.helper";
import { useEffect, useMemo, useState } from "react";
import { countriesMapper } from "../types/countries.mapper";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { useUpdateCreatorProfile } from "../hooks/useUpdateCreatorProfile";
import { setUser } from "../../auth/store/userSlice";
import { currentUser } from "../../auth/store/selector";
import { creatorProfileValidationSchema } from "../schema/creatorProfileValidation";

const CreatorDetails = ({ details = {} }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(currentUser);
    const { first_name, last_name, gender, contact, website, country } = details?.creator_profile || details || {};

    const [firstNameValue, setFirstNameValue] = useState(first_name || "");
    const [lastNameValue, setLastNameValue] = useState(last_name || "");
    const [genderValue, setGenderValue] = useState(gender || "");
    const [contactValue, setContactValue] = useState(contact || "");
    const [countryValue, setCountryValue] = useState(country || "");
    const [loading, setLoading] = useState(false);
    const [websiteValue, setWebsiteValue] = useState(website || "");
    const [contactError, setContactError] = useState("");
    const [websiteError, setWebsiteError] = useState("");
    const [profileError, setProfileError] = useState("");
    
    const updateCreatorProfile = useUpdateCreatorProfile(setProfileError, dispatch, setUser, user);



    useEffect(() => {
        if (details?.creator_profile) {
            setGenderValue(gender || "prefer not to say");
            setFirstNameValue(first_name || "");
            setLastNameValue(last_name || "");
            setContactValue(contact || "");
            setCountryValue(country || "");
            setWebsiteValue(website || "");
        }
    }, [details, gender, first_name, last_name, contact, website, country]);

        

    const genderOptions = useMemo(() => {
        return [
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
            { value: "prefer not to say", label: "Prefer not to say" },
        ];
    }, []);

    const countryOptions = useMemo(() => {
        return countriesMapper.map((country) => ({
            value: country.code,
            label: country.name,
        }));
    }, []);

    const handleUpdateProfile = async () => {
        // Reset errors
        setContactError("");
        setWebsiteError("");
        setProfileError("");
        
        const payload = {};
        
        // Only add fields that have values
        if (firstNameValue && firstNameValue.trim()) payload.first_name = firstNameValue;
        if (lastNameValue && lastNameValue.trim()) payload.last_name = lastNameValue;
        if (genderValue && genderValue.trim()) payload.gender = genderValue;
        if (contactValue && contactValue.trim()) payload.contact = contactValue;
        if (websiteValue && websiteValue.trim()) payload.website = websiteValue;
        if (countryValue && countryValue.trim()) payload.country = countryValue;
        
        // Validate with Yup schema first
        try {
            await creatorProfileValidationSchema.validate(payload, { abortEarly: false });
        } catch (validationError) {
            // Handle Yup validation errors - do NOT call API
            if (validationError.inner) {
                validationError.inner.forEach((err) => {
                    if (err.path === 'contact') {
                        setContactError(err.message);
                    } else if (err.path === 'website') {
                        setWebsiteError(err.message);
                    } else {
                        setProfileError(err.message);
                    }
                });
            } else {
                setProfileError(validationError.message || "Validation failed");
            }
            return; // Exit early if validation fails
        }
        
        // Only proceed if validation passes
        setLoading(true);
        try {
            await updateCreatorProfile(user.id, payload);
        } catch (apiError) {
            console.error("Error updating creator profile:", apiError);
            // Error is handled in the hook
        } finally {
            setLoading(false);
        }
    }

    return (
        <SettingsCard>
            <div className="title">
                <div className="icon">
                    <Settings />
                </div>
                <Title tt={'uppercase'} order={4} c="textWhite">Creator Details</Title>
            </div>
            <Grid gutter="md">
                <Grid.Col span={6}>
                    <TextInput
                        label="FIRST NAME"
                        placeholder="First Name"
                        value={firstNameValue}
                        onChange={(e) => setFirstNameValue(e.target.value)}
                        // readOnly
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput
                        label="LAST NAME"
                        placeholder="Last Name"
                        value={lastNameValue}
                        onChange={(e) => setLastNameValue(e.target.value)}
                        // readOnly
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Select
                        label="GENDER"
                        placeholder="Gender"
                        data={genderOptions}
                        value={genderValue}
                        onChange={(value) => setGenderValue(value)}
                        searchable
                        clearable
                        nothingFoundMessage="No gender found"
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput
                        label="CONTACT"
                        placeholder="+1234567890"
                        value={contactValue}
                        onChange={(e) => {
                            setContactValue(e.target.value);
                            setContactError("");
                        }}
                        error={contactError}
                    />
                </Grid.Col>

                
                <Grid.Col span={6}>
                    <Select
                        label="Country"
                        placeholder="Search country..."
                        data={countryOptions}
                        searchable
                        clearable
                        nothingFoundMessage="No country found"
                        value={countryValue}
                        onChange={(value) => setCountryValue(value)}
                    />
                </Grid.Col>

                <Grid.Col span={6}>
                    <TextInput
                        label="WEBSITE"
                        placeholder="Website"
                        value={websiteValue}
                        onChange={(e) => {
                            setWebsiteValue(e.target.value);
                            setWebsiteError("");
                        }}
                        error={websiteError}
                    />
                </Grid.Col>

                {profileError && (
                    <Grid.Col span={12}>
                        <Text c="red" size="sm">{profileError}</Text>
                    </Grid.Col>
                )}

                <Grid.Col span={6} className="mt-4">
                    <Button
                        variant="primary"
                        size="md"
                        loading={loading}
                        onClick={handleUpdateProfile}
                        leftSection={<Save />}
                    >
                        Save Changes
                    </Button>
                </Grid.Col>
            </Grid>
        </SettingsCard>
    )
}

export default CreatorDetails;