import { useState } from "react";
import {
  Button,
  Text,
  Stack,
  Group,
  Image,
  FileInput,
  Alert,
} from "@mantine/core";
import Cropper from "react-easy-crop";
import HexContainer from "../../ui/HexContainer";
import { theme } from "../../../../styles/theme/customTheme";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "../../../../stores/selectors";
import useApi from "../../../../hooks/useApi";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE_MB } from "../../../../utils/enum";
import { refreshUser } from "../../../../stores/thunks/userThunks";
import getCroppedImg from "../../../../utils/helpers/cropImageHelper";

export default function EditImage({ type = "avatar", close }) {
  const dispatch = useDispatch();
  const { patch, loading } = useApi();
  const { user } = useSelector(currentUser);

  const user_type = user?.user_type?.toLowerCase();
  const profile = user?.[`${user_type}_profile`];
  const profileId = profile?.id;
  const currentPath =
    type === "avatar"
      ? profile?.profile_image?.path
      : profile?.cover_image?.path;

  const [image, setImage] = useState({
    preview: currentPath
      ? `${import.meta.env.VITE_ASSET_URL}/${currentPath}`
      : null,
    file: null,
  });

  const [error, setError] = useState(null);
  const [cropProps, setCropProps] = useState({
    crop: { x: 0, y: 0 },
    zoom: 1,
    croppedAreaPixels: null,
    showCropper: false,
  });

  const handleImageChange = (file) => {
    if (!file) return;

    const isValidType = ACCEPTED_IMAGE_TYPES.includes(file.type);
    const isValidSize = file.size / 1024 / 1024 <= MAX_FILE_SIZE_MB;

    if (!isValidType || !isValidSize) {
      setError(
        !isValidType
          ? "Only JPEG, JPG, PNG, or WEBP images are allowed."
          : `File size should be less than ${MAX_FILE_SIZE_MB}MB.`
      );
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage({ preview: e.target.result, file });
      setCropProps((prev) => ({ ...prev, showCropper: true }));
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (_, croppedPixels) => {
    setCropProps((prev) => ({ ...prev, croppedAreaPixels: croppedPixels }));
  };

  const applyCrop = async () => {
    try {
      const blob = await getCroppedImg(
        image.preview,
        cropProps.croppedAreaPixels
      );
      const file = new File([blob], image.file.name, { type: "image/jpeg" });
      setImage({ preview: URL.createObjectURL(blob), file });
      setCropProps((prev) => ({ ...prev, showCropper: false }));
    } catch {
      setError("Failed to crop image.");
    }
  };

  const uploadImage = async () => {
    if (!image.file || !profileId) return;

    const formData = new FormData();
    formData.append(
      type === "avatar" ? "profile_image" : "cover_image",
      image.file
    );

    const endpoint = `/${user_type}-profiles/${profileId}/${
      type === "avatar" ? "profile-pic" : "cover-pic"
    }`;

    try {
      await patch({
        url: endpoint,
        payload: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(refreshUser());
      close();
    } catch {
      setError("Failed to upload image.");
    }
  };

  const renderPreview = () => {
    if (!image.preview) {
      return (
        <Text size="xs" c="dimmed" ta="center" mt="sm">
          No image available
        </Text>
      );
    }

    return type === "avatar" ? (
      <Group justify="center">
        <HexContainer size={200} background={theme.colors.inputBgColor[0]}>
          <img
            src={image.preview}
            alt="Avatar"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </HexContainer>
      </Group>
    ) : (
      <Image
        src={image.preview}
        alt="Cover Preview"
        radius="md"
        height={150}
        fit="cover"
      />
    );
  };

  return (
    <Stack>
      <Text weight={500} size="sm">
        {type === "avatar" ? "Profile Picture" : "Cover Photo"}
      </Text>

      {cropProps.showCropper ? (
        <>
          <div style={{ position: "relative", width: "100%", height: 300 }}>
            <Cropper
              image={image.preview}
              crop={cropProps.crop}
              zoom={cropProps.zoom}
              aspect={type === "avatar" ? 1 : 16 / 3}
              onCropChange={(crop) =>
                setCropProps((prev) => ({ ...prev, crop }))
              }
              onZoomChange={(zoom) =>
                setCropProps((prev) => ({ ...prev, zoom }))
              }
              onCropComplete={handleCropComplete}
            />
          </div>
          <Group justify="center" mt="sm">
            <Button onClick={applyCrop}>Crop</Button>
            <Button
              variant="outline"
              color="red"
              onClick={() =>
                setCropProps((prev) => ({ ...prev, showCropper: false }))
              }
            >
              Cancel
            </Button>
          </Group>
        </>
      ) : (
        renderPreview()
      )}

      <FileInput
        placeholder={`Select ${type === "avatar" ? "Avatar" : "Cover"} Image`}
        accept="image/png,image/jpeg,image/webp"
        onChange={handleImageChange}
        error={error}
      />

      {error && (
        <Alert color="red" title="Error" mt="sm">
          {error}
        </Alert>
      )}

      <Button
        variant="primary"
        onClick={uploadImage}
        loading={loading}
        disabled={!image.file}
      >
        Save {type === "avatar" ? "Avatar" : "Cover"}
      </Button>
    </Stack>
  );
}
