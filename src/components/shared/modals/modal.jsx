import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import IconButton from "./../ui/IconButton";

export default function ReusableModal({ title, children }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title={title} centered>
        {children}
      </Modal>

      <IconButton onClick={open} />
    </>
  );
}
