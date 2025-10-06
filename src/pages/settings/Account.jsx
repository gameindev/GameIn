import SectionHeader from "../../components/shared/ui/SectionHeader";
import { Settings, User } from "lucide-react";
import { Grid, Textarea, TextInput, Title } from "@mantine/core";
import { SettingsCard, SettingsWrap } from "../../styles/pages/SettingStyles";
import SwitchButton from "../../components/shared/ui/Switch";

export default function Account() {

  // const accountFields = [{
  //   label: "Account Information",
  //   fields: [
  //     {
  //       name: "nickname",
  //       className: "input-wrapper",
  //       variant: "secondaryGrey",
  //       label: "Nickname",
  //       placeholder: "Nickname",
  //       component: TextInput,
  //       componentType: "",
  //     },
  //     {
  //       name: "nicename",
  //       className: "input-wrapper",
  //       variant: "secondaryGrey",
  //       label: "Nicename",
  //       placeholder: "Nicename",
  //       component: TextInput,
  //       componentType: "",
  //     },
  //     {
  //       name: "nicename",
  //       className: "input-wrapper",
  //       variant: "secondaryGrey",
  //       label: "Nicename",
  //       placeholder: "Nicename",
  //       component: TextInput,
  //       componentType: "",
  //     }
  //   ]
  // }];


  return (
    <>
      <SectionHeader text="Account" icon={<User />} />
      <SettingsWrap>
        <SettingsCard>
          <div className="title">
            <div className="icon">
              <Settings />
            </div>
            <Title tt={'uppercase'} order={4} c="textWhite">Account Information</Title>
          </div>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Nicename"
                placeholder="Nicename"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Language"
                placeholder="Language"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Email"
                placeholder="Email"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Timezone"
                placeholder="Timezone"
              />
            </Grid.Col>
          </Grid>
        </SettingsCard>
        <SettingsCard>
          <div className="title">
            <div className="icon">
              <Settings />
            </div>
            <Title tt={'uppercase'} order={4} c="textWhite">Account Security</Title>
          </div>
          <Grid align="end">
            <Grid.Col span={6}>
              <TextInput
                label="Password"
                placeholder="Password"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <SwitchButton label="Two Factor Authentication" />
            </Grid.Col>
          </Grid>
        </SettingsCard>
        <SettingsCard>
          <div className="title">
            <div className="icon">
              <Settings />
            </div>
            <Title tt={'uppercase'} order={4} c="textWhite">Personal Details</Title>
          </div>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Name"
                placeholder="Name"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Birthday"
                placeholder="Language"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Gender"
                placeholder="Gender"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Textarea 
                label="Address"
                placeholder="Address"
              />
            </Grid.Col>
          </Grid>
        </SettingsCard>
      </SettingsWrap>

      {/* <Text>Manage your account settings and preferences</Text> */}
    </>
  );
}
