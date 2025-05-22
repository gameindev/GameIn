import React, { useEffect, useState } from "react";
import { Select, Group, Text } from "@mantine/core";
import { useWatch } from "react-hook-form";

const DOBPicker = ({ control, setValue, error }) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const dob = useWatch({ control, name: "dob" });

  useEffect(() => {
    if (dob) {
      const [y, m, d] = dob.split("-");
      setYear(y);
      setMonth(m);
      setDay(d);
    }
  }, [dob]);

  useEffect(() => {
    if (day && month && year) {
      const newDob = `${year}-${month}-${day}`;
      setValue("dob", newDob);
    }
  }, [day, month, year, setValue]);

  const days = Array.from({ length: 31 }, (_, i) =>
    `${i + 1}`.padStart(2, "0")
  );
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
    <>
      <Group grow>
        <Select
          label="Day"
          placeholder="Select day"
          data={days}
          value={day}
          onChange={setDay}
          withAsterisk
          error={error}
          allowDeselect={false}
        />
        <Select
          label="Month"
          placeholder="Select month"
          data={months}
          value={month}
          onChange={setMonth}
          withAsterisk
          error={error ? " " : false}
          allowDeselect={false}
        />
        <Select
          label="Year"
          placeholder="Select year"
          data={years}
          value={year}
          onChange={setYear}
          withAsterisk
          error={error ? " " : false}
          allowDeselect={false}
        />
      </Group>
    </>
  );
};

export default DOBPicker;
