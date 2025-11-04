import { Save, Settings } from "lucide-react";
import { SettingsCard } from "../styles/settingStyles";
import { Button, Grid, Select, Textarea, TextInput, Title, Text } from "@mantine/core";
import { formatDateHelper } from "../../../shared/utils/helpers/formDate.helper";
import { countriesMapper } from "../types/countries.mapper";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { useUpdateBrandProfile } from "../hooks/useUpdateBrandProfile";
import { currentUser } from "../../auth/store/selector";
import { setUser } from "../../auth/store/userSlice";
import { brandProfileValidationSchema } from "../schema/brandProfileValidation";

const BrandDetails = ({ details = {} }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(currentUser);
    const { brand_name, head_office, contact, website, country } = details?.brand_profile || details || {};
    
    const [brandNameValue, setBrandNameValue] = useState(brand_name || "");
    const [headOfficeValue, setHeadOfficeValue] = useState(head_office || "");
    const [contactValue, setContactValue] = useState(contact || "");
    const [websiteValue, setWebsiteValue] = useState(website || "");
    const [countryValue, setCountryValue] = useState(country || "");
    const [loading, setLoading] = useState(false);
    const [contactError, setContactError] = useState("");
    const [websiteError, setWebsiteError] = useState("");
    const [profileError, setProfileError] = useState("");
    
    const updateBrandProfile = useUpdateBrandProfile(setProfileError, dispatch, setUser, user);

    useEffect(() => {
        if (details?.brand_profile) {
            setBrandNameValue(brand_name || "");
            setHeadOfficeValue(head_office || "");
            setContactValue(contact || "");
            setWebsiteValue(website || "");
            setCountryValue(country || "");
        }
    }, [details, brand_name, head_office, contact, website, country]);



    const countryOptions = useMemo(() => {
        return countriesMapper.map((country) => ({
            value: country.code,
            label: country.name,
        }));
    }, []);

    const handleUpdateBrandProfile = async () => {
        // Reset errors
        setContactError("");
        setWebsiteError("");
        setProfileError("");
        
        const payload = {};
        
        // Only add fields that have values
        if (brandNameValue && brandNameValue.trim()) payload.brand_name = brandNameValue;
        if (headOfficeValue && headOfficeValue.trim()) payload.head_office = headOfficeValue;
        if (contactValue && contactValue.trim()) payload.contact = contactValue;
        if (websiteValue && websiteValue.trim()) payload.website = websiteValue;
        if (countryValue && countryValue.trim()) payload.country = countryValue;
        
        // Validate with Yup schema first
        try {
            await brandProfileValidationSchema.validate(payload, { abortEarly: false });
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
            await updateBrandProfile(user.id, payload);
        } catch (apiError) {
            console.error("Error updating brand profile:", apiError);
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
                <Title tt={'uppercase'} order={4} c="textWhite">Brand Details</Title>
            </div>
            <Grid gutter="md">
                <Grid.Col span={6}>
                    <TextInput
                        label="BRAND NAME"
                        placeholder="Brand Name"
                        value={brandNameValue}
                        onChange={(e) => setBrandNameValue(e.target.value)}
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
                    <Textarea
                        label="HEAD OFFICE"
                        placeholder="Head Office"
                        value={headOfficeValue}
                        onChange={(e) => setHeadOfficeValue(e.target.value)}
                    />
                </Grid.Col>

                <Grid.Col span={6}></Grid.Col>

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
                        onClick={handleUpdateBrandProfile}
                        leftSection={<Save />}
                    >
                        Save Changes
                    </Button>
                </Grid.Col>
            </Grid>
        </SettingsCard>
    )
}

export default BrandDetails;