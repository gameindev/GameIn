import React, { useState } from "react";
import { Box, Flex, Combobox, InputBase, useCombobox } from "@mantine/core";
import HexContainer from "./HexContainer";
import InputCardItem from "./InputCardItem";
import { theme } from "../../../styles/theme/customTheme";

function MultiSelector({ placeholder, value = [], onChange, options = [], error  }) {
  const [searchTerm, setSearchTerm] = useState("");

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const safeValue = Array.isArray(value) ? value : [];

  const handleSelectCreator = (name) => {
    const creatorToAdd = options.find((c) => c.name === name);
    if (creatorToAdd && !safeValue.some((c) => c.id === creatorToAdd.id)) {
      onChange([creatorToAdd, ...safeValue]);
    }
    setSearchTerm("");
    combobox.closeDropdown();
  };

  const handleRemoveCreator = (idToRemove) => {
    onChange(safeValue.filter((c) => c.id !== idToRemove));
  };

  const filteredOptions = options
    .filter(
      (c) =>
        !safeValue.some((s) => s.id === c.id) &&
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((c) => (
      <Combobox.Option value={c.name} key={c.id}>
        {c.name}
      </Combobox.Option>
    ));

  return (
    <Box>
      {safeValue.length > 0 && (
        <Flex mb="sm" wrap="wrap">
          {safeValue.map((creator) => (
            <InputCardItem
              key={creator.id}
              id={creator.id}
              icon={
                <HexContainer
                  size={50}
                  radius={0.4}
                  background={theme.colors.primary[0]}
                />
              }
              value={creator.name}
              onChange={() => {}}
              added={true}
              onToggle={() => handleRemoveCreator(creator.id)}
              readOnly={true}
            />
          ))}
        </Flex>
      )}

      <Combobox
        store={combobox}
        onOptionSubmit={handleSelectCreator}
        withinPortal={false}
      >
        <Combobox.Target>
          <InputBase
            placeholder={placeholder}
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.currentTarget.value);
              combobox.openDropdown();
            }}
            onClick={() => combobox.openDropdown()}
            error={error}
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {filteredOptions.length > 0 ? (
              filteredOptions
            ) : (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Box>
  );
}

export default MultiSelector;
