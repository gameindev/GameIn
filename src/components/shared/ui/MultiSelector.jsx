import React, { useState } from "react";
import { Box, Flex, Combobox, InputBase, useCombobox } from "@mantine/core";
import { theme } from "../../../styles/theme/customTheme";
import HexContainer from "./HexContainer";
import InputCardItem from "./InputCardItem";

const allAvailableCreators = [
  { id: "1", name: "React" },
  { id: "2", name: "Mantine" },
  { id: "3", name: "JavaScript" },
  { id: "4", name: "TypeScript" },
  { id: "5", name: "Next.js" },
  { id: "6", name: "Frontend" },
  { id: "7", name: "Backend" },
];

function MultiSelector({ placeholder }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCreators, setSelectedCreators] = useState([]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const handleSelectCreator = (name) => {
    const creatorToAdd = allAvailableCreators.find((c) => c.name === name);
    if (
      creatorToAdd &&
      !selectedCreators.some((c) => c.id === creatorToAdd.id)
    ) {
      setSelectedCreators([creatorToAdd, ...selectedCreators]);
    }
    setSearchTerm("");
    combobox.closeDropdown();
  };

  const handleRemoveCreator = (idToRemove) => {
    setSelectedCreators((prev) => prev.filter((c) => c.id !== idToRemove));
  };

  const filteredOptions = allAvailableCreators
    .filter(
      (c) =>
        !selectedCreators.some((s) => s.id === c.id) &&
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((c) => (
      <Combobox.Option value={c.name} key={c.id}>
        {c.name}
      </Combobox.Option>
    ));

  return (
    <Box>
      {selectedCreators.length > 0 && (
        <Flex mb="sm" wrap="wrap">
          {selectedCreators.map((creator) => (
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
