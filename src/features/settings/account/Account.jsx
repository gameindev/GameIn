import { Save, Settings, User } from "lucide-react";
import SectionHeader from "../../../shared/components/SectionHeader";
import { SettingsCard, SettingsWrap } from "../styles/settingStyles";
import {
    Grid,
    Textarea,
    TextInput,
    Title,
    Select,
    Button,
    Space,
    PasswordInput,
    Text,
    Checkbox,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { languageMapper } from "../types/language.mapper";
import { timezonesMapper } from "../types/timezones.mapper";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/store/hooks";
import { currentUser } from "../../auth/store/selector";
import BrandDetails from "../components/BrandDetails";
import CreatorDetails from "../components/CreatorDetails";
import { USERTYPES } from "../../../shared/enums/userTypesEnum";
import FormField from "../../../shared/components/FormField";
import { showNotification } from "@mantine/notifications";
import { useUpdatePassword } from "../hooks/useUpdatePassword";
import { useUpdateAccount } from "../hooks/useUpdateAccount";
import { setUser } from "../../auth/store/userSlice";

const Account = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(currentUser);
    const [language, setLanguage] = useState("English");
    const [timezone, setTimezone] = useState(null);
    const [birthday, setBirthday] = useState(
        user?.date_of_birth ? new Date(user.date_of_birth) : null
    );
    const [email, setEmail] = useState(user?.email || "");
    const [username, setUsername] = useState(user?.username || "");
    const [loading, setLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [accountError, setAccountError] = useState("");
    // const [verified, setVerified] = useState(!!user?.is_verified);

    useEffect(() => {
        if (user) {
            setBirthday(user.date_of_birth ? new Date(user.date_of_birth) : null);
            setEmail(user.email);
            setUsername(user.username);
            setLanguage(user.language || "English");
            setTimezone(user.timezone || null);
            // setVerified(!!user.is_verified);
        }
    }, [user]);

    const languageOptions = useMemo(() => {
        return languageMapper.map((lang) => ({
            value: lang.English,
            label: lang.English,
        }));
    }, []);

    const timezoneOptions = useMemo(() => {
        return timezonesMapper.map((timezone) => ({
            value: timezone.value,
            label: timezone.text,
        }));
    }, []);

    const updateAccount = useUpdateAccount(
        setAccountError,
        dispatch,
        setUser,
        user
    );
    const updatePassword = useUpdatePassword(
        setPasswordError,
        setConfirmPasswordError
    );

    // HANDLE ACCOUNT
    const validateAccount = () => {
        if (!username || username.trim() === "") {
            return "Username is required";
        }
        if (!email || email.trim() === "") {
            return "Email is required";
        }
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Please enter a valid email address";
        }
        if (!birthday) {
            return "Date of birth is required";
        }
        return "";
    };

    const handleSave = async () => {
        setAccountError("");

        // Validate required fields
        const validationError = validateAccount();
        if (validationError) {
            setAccountError(validationError);
            return;
        }

        setLoading(true);

        try {
            await updateAccount(user.id, {
                email,
                username,
                language,
                timezone,
                birthday,
            });
        } catch (error) {
            console.error("Error updating account:", error);
        } finally {
            setLoading(false);
        }
    };

    // HANDLE PASSWORD
    const validatePassword = (value) => {
        if (!value) {
            return "Password is required";
        }
        if (value.length < 8) {
            return "Password must be at least 8 characters";
        }
        if (!/[a-z]/.test(value)) {
            return "Password must contain at least one lowercase letter";
        }
        if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
        }
        if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
        }
        if (!/[^a-zA-Z0-9]/.test(value)) {
            return "Password must contain at least one special character";
        }
        return "";
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        setPasswordError("");
    };

    const handleConfirmPasswordChange = (value) => {
        setConfirmPassword(value);
        setConfirmPasswordError("");
    };

    const handlePasswordSubmit = async () => {
        const passwordValidationError = validatePassword(password);
        if (passwordValidationError) {
            setPasswordError(passwordValidationError);
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            setConfirmPasswordError("Passwords do not match");
            return;
        }

        setPasswordLoading(true);
        try {
            await updatePassword(user.id, password, confirmPassword);
            // Clear password fields after success
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error("Error updating password:", error);
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <>
            <SectionHeader text="Account" icon={<User />} />
            <SettingsWrap>
                <SettingsCard>
                    <div className="title">
                        <div className="icon">
                            <Settings />
                        </div>
                        <Title tt={"uppercase"} order={4} c="textWhite">
                            Account Information
                        </Title>
                    </div>

                    <Grid gutter="md">
                        <Grid.Col span={6}>
                            <TextInput
                                label="USERNAME"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                withAsterisk
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Select
                                label="LANGUAGE"
                                placeholder="Search language..."
                                data={languageOptions}
                                searchable
                                clearable
                                nothingFoundMessage="No language found"
                                value={language}
                                onChange={setLanguage}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="EMAIL"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                withAsterisk
                            />
                        </Grid.Col>
                        {/* <Grid.Col span={6} style={{ display: "flex"}}>
              <Checkbox
                label="Email Verified"
                checked={verified}
                onChange={(e) => {
                  const next = e.currentTarget.checked;
                  setVerified(next);
                  dispatch(setUser({ ...user, is_verified: next }));
                }}
              />
            </Grid.Col> */}
                        <Grid.Col span={6}>
                            <Select
                                label="TIMEZONE"
                                placeholder="Search timezone..."
                                data={timezoneOptions}
                                searchable
                                clearable
                                nothingFoundMessage="No timezone found"
                                value={timezone}
                                onChange={setTimezone}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <DateInput
                                label="DATE OF BIRTH"
                                placeholder="Date of Birth"
                                value={birthday}
                                onChange={setBirthday}
                                maxDate={new Date()}
                                clearable
                                withAsterisk
                            />
                        </Grid.Col>
                        <Grid.Col span={6}></Grid.Col>
                        {accountError && (
                            <Grid.Col span={12}>
                                <Text c="red" size="sm">
                                    {accountError}
                                </Text>
                            </Grid.Col>
                        )}

                        <Grid.Col span={6} className="mt-4">
                            <Button
                                variant="primary"
                                size="md"
                                loading={loading}
                                onClick={handleSave}
                                leftSection={<Save />}
                            >
                                Save Changes
                            </Button>
                        </Grid.Col>
                    </Grid>
                </SettingsCard>

                <Space h="md" />

                <SettingsCard>
                    <div className="title">
                        <div className="icon">
                            <Settings />
                        </div>
                        <Title tt={"uppercase"} order={4} c="textWhite">
                            Account Security
                        </Title>
                    </div>
                    <Grid align="start">
                        <Grid.Col span={6}>
                            <PasswordInput
                                label="PASSWORD"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => handlePasswordChange(e.currentTarget.value)}
                                error={passwordError}
                            />
                        </Grid.Col>

                        <Grid.Col span={6}>
                            <PasswordInput
                                label="CONFIRM PASSWORD"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    handleConfirmPasswordChange(e.currentTarget.value)
                                }
                                withAsterisk
                                error={confirmPasswordError}
                            />
                        </Grid.Col>

                        <Grid.Col span={6} className="mt-4">
                            <Button
                                variant="primary"
                                size="md"
                                loading={passwordLoading}
                                onClick={handlePasswordSubmit}
                                leftSection={<Save />}
                            >
                                Save Changes
                            </Button>
                        </Grid.Col>
                    </Grid>
                </SettingsCard>

                <Space h="md" />

                {user?.user_type === USERTYPES.BRAND ? (
                    <BrandDetails details={user} />
                ) : (
                    <CreatorDetails details={user} />
                )}
            </SettingsWrap>
        </>
    );
};

export default Account;
