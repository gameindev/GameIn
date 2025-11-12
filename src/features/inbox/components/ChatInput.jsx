import React, { useState, useCallback, memo, useRef } from "react";
import {
  Box,
  Group,
  Textarea,
  Button,
  Badge,
  ActionIcon,
  Progress,
  Modal,
  Image,
  Text,
} from "@mantine/core";
import { IconX, IconFile, IconPhoto, IconDownload } from "@tabler/icons-react";
import { theme } from "../../../shared/styles/theme/customTheme";

const ChatInput = memo(({ onSend }) => {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleKey = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [message, attachments]
  );

  const handleSend = useCallback(() => {
    if (message.trim() || attachments.length > 0) {
      onSend(message, attachments);
      setMessage("");
      setAttachments([]);
      setUploadProgress({});
    }
  }, [message, attachments, onSend]);

  const handleFileSelect = useCallback((e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
    e.target.value = null;
  }, []);

  const removeAttachment = useCallback((fileName) => {
    setAttachments((prev) => prev.filter((file) => file.name !== fileName));
    setUploadProgress((prev) => {
      const updated = { ...prev };
      delete updated[fileName];
      return updated;
    });
  }, []);

  const handleImagePreview = useCallback((file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) =>
        setPreviewImage({ src: e.target.result, name: file.name });
      reader.readAsDataURL(file);
    }
  }, []);

  const getFileIcon = useCallback((fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    return ["jpg", "jpeg", "png", "gif"].includes(ext) ? (
      <IconPhoto size={16} />
    ) : (
      <IconFile size={16} />
    );
  }, []);

  return (
    <Box
      p="md"
      px={70}
      style={{ borderTop: `1px solid ${theme.colors.inputBgColor[0]}` }}
    >
      {/* Attachments */}
      {attachments.length > 0 && (
        <Box mb="xs">
          <Group spacing="xs" style={{ flexWrap: "wrap" }}>
            {attachments.map((file) => (
              <Badge
                key={file.name}
                size="lg"
                radius="sm"
                color="dark"
                leftSection={getFileIcon(file.name)}
                rightSection={
                  <ActionIcon
                    size="xs"
                    color="gray"
                    onClick={() => removeAttachment(file.name)}
                  >
                    <IconX size={12} />
                  </ActionIcon>
                }
                styles={{
                  root: { padding: "6px 8px", cursor: "pointer" },
                }}
                onClick={() =>
                  file.type.startsWith("image/") && handleImagePreview(file)
                }
              >
                {file.name.length > 20
                  ? `${file.name.slice(0, 17)}...`
                  : file.name}
              </Badge>
            ))}
          </Group>
        </Box>
      )}

      <Box>
        <Group spacing={8} style={{ flex: 1 }}>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileSelect}
            multiple
          />
          <Textarea
            autosize
            minRows={2}
            maxRows={4}
            placeholder="Type your message..."
            style={{ flex: 1 }}
            radius="xl"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKey}
          />
        </Group>
        <Group spacing={8} mt={15} justify="flex-end">
          <Button
            variant="primary"
            size="sm"
            color={theme.colors.primary[0]}
            onClick={handleSend}
            disabled={!message.trim() && attachments.length === 0}
          >
            Send
          </Button>
        </Group>
      </Box>

      <Modal
        opened={!!previewImage}
        onClose={() => setPreviewImage(null)}
        title={previewImage?.name}
        size="lg"
      >
        {previewImage && (
          <Box>
            <Image
              src={previewImage.src}
              alt={previewImage.name}
              fit="contain"
              height={400}
            />
            <Group position="center" mt="md">
              <ActionIcon variant="filled" color="blue" size="lg">
                <IconDownload size={20} />
              </ActionIcon>
            </Group>
          </Box>
        )}
      </Modal>
    </Box>
  );
});

export default ChatInput;
