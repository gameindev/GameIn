import { useState } from "react";
import {
  Button,
  Text,
  Stack,
  Group,
  Image,
  FileInput,
  Alert,
  Loader,
} from "@mantine/core";
import HexContainer from "../../ui/HexContainer";
import { theme } from "../../../../styles/theme/customTheme";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "../../../../stores/selectors";
import useApi from "./../../../../hooks/useApi";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE_MB, USERTYPES } from "../../../../utils/enum";
import { refreshUser } from "./../../../../stores/thunks/userThunks";

export default function EditImage({ type = "avatar", close }) {
  const dispatch = useDispatch();
  const { user } = useSelector(currentUser);
  const { patch, loading } = useApi();

  const getImageUrl = (path) => (path ? `${import.meta.env.VITE_ASSET_URL}/${path}` : null);

  const [image, setImage] = useState({
    preview: getImageUrl(
      type === "avatar" ? user?.profileImage?.path : user?.coverImage?.path
    ),
    file: null,
  });

  const [error, setError] = useState(null);
  
  const userType = user?.userType?.toLowerCase();
  const profileType = userType === "brand" ? "brandProfile" : userType === "creator" ? "creatorProfile" : "";
  const profileId = user?.[profileType].id;
  
  const handleImageChange = (file) => {
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return setError("Only JPEG, JPG, PNG, or WEBP images are allowed.");
    }

    if (file.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
      return setError(`File size should be less than ${MAX_FILE_SIZE_MB}MB.`);
    }

    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage({ preview: e.target.result, file });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!image.file || !profileId) return;

    const formData = new FormData();
    formData.append(
      type === "avatar" ? "profileImageFile" : "coverImageFile",
      image.file
    );

    const endpoint = `/${userType}-profiles/${profileId}/${
      type === "avatar" ? "profile-pic" : "cover-pic"
    }`;

    try {
      await patch(endpoint, formData, {
        "Content-Type": "multipart/form-data",
      });
      dispatch(refreshUser());
      close();
    } catch (err) {
      setError("Failed to upload image.", err);
    }
  };

  return (
    <Stack>
      <Text weight={500} size="sm">
        {type === "avatar" ? "Profile Picture" : "Cover Photo"}
      </Text>

      {type === "avatar" ? (
        <Group justify="center">
          <HexContainer size={200} background={theme.colors.inputBgColor[0]}>
            {image.preview ? (
              <img
                src={image.preview}
                alt="Avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <Text size="xs" c="dimmed" ta="center" mt="xl">
                No image available
              </Text>
            )}
          </HexContainer>
        </Group>
      ) : image.preview ? (
        <Image
          src={image.preview}
          alt="Cover Preview"
          radius="md"
          withPlaceholder
          height={150}
          fit="cover"
        />
      ) : (
        <Text size="xs" c="dimmed" ta="center" mt="sm">
          No image available
        </Text>
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

      <Button variant="primary" onClick={handleSave} loading={loading}>
        Save {type === "avatar" ? "Avatar" : "Cover"}
      </Button>
    </Stack>
  );
}
