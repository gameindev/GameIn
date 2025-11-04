import { Space, Stack, Title } from "@mantine/core";


export default function Completed() {
    return (
        <Stack spacing="xl" align="center">            
            
            <Space h="lg" />
            <Title order={2} ta="center" style={{ fontSize: '2.625em', lineHeight: 'normal' }}>
                <span style={{ color: 'var(--mantine-color-primary-text)' }}>you got mail!</span> <br />
                please verify<br /> your email<br /> address to get<br /> started
            </Title>

            <Space h="xl" />
        </Stack>
    )
}