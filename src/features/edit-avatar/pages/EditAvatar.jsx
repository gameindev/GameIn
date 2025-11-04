import {
    Button,
    Text,
    Stack,
    Group,
    Image,
    FileInput,
    Alert,
} from "@mantine/core";
import { useDispatch } from "react-redux";
import useApi from "../../../shared/hooks/useApi";
import { useAppSelector } from "../../../app/store/hooks";
import { useState } from "react";
import useHandleImageChange from "../hooks/useHandleImageChange";
import getCroppedImg from "../../../shared/utils/helpers/cropImage.helper";
import useUploadImage from "../hooks/useUploadImage";
import { theme } from "../../../shared/styles/theme/customTheme";
import HexContainer from "../../../shared/components/HexContainer";
import Cropper from "react-easy-crop";
import { currentUser } from "../../auth/store/selector";




export default function EditAvatar({ type = "avatar", close }) {
    const dispatch = useDispatch();
    const { patch, loading } = useApi();
    const user = useAppSelector(currentUser);

    
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


    const handleImageChange = useHandleImageChange(setCropProps, setError, setImage);

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

    const uploadImage = useUploadImage(patch);

    const handleUpload = async () => {       
        
        if (!image.file) {
            setError("Please select an image first");
            return;
        }
        
        if (!profileId) {
            setError("Profile ID not found");
            return;
        }
        
        await uploadImage(image, profileId, user_type, type, close, setError);
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
                        style={{ maxWidth: "auto !important" }}
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
                    <div className="myCropImage" style={{ position: "relative", width: "100%", height: 300 }}>
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
                onClick={handleUpload}
                loading={loading}
                disabled={!image.file}
            >
                Save {type === "avatar" ? "Avatar" : "Cover"}
            </Button>
        </Stack>
    )
}