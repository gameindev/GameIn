import React from "react";
import { Select, Group } from "@mantine/core";
import { Controller } from "react-hook-form";

const DOBPicker = ({ control, error }) => {
    const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`.padStart(2, "0"));

    const months = [
        { label: "January", value: "01" },
        { label: "February", value: "02" },
        { label: "March", value: "03" },
        { label: "April", value: "04" },
        { label: "May", value: "05" },
        { label: "June", value: "06" },
        { label: "July", value: "07" },
        { label: "August", value: "08" },
        { label: "September", value: "09" },
        { label: "October", value: "10" },
        { label: "November", value: "11" },
        { label: "December", value: "12" },
    ];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => `${currentYear - i}`);

    return (
        <Group grow>
            <Controller
                name="dobDay"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        label="Day"
                        placeholder="Select day"
                        data={days}
                        withAsterisk
                        error={error}
                        allowDeselect={false}
                    />
                )}
            />
            <Controller
                name="dobMonth"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        label="Month"
                        placeholder="Select month"
                        data={months}
                        withAsterisk
                        error={error ? " " : false}
                        allowDeselect={false}
                    />
                )}
            />
            <Controller
                name="dobYear"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        label="Year"
                        placeholder="Select year"
                        data={years}
                        withAsterisk
                        error={error ? " " : false}
                        allowDeselect={false}
                    />
                )}
            />
        </Group>
    );
};

export default React.memo(DOBPicker);
