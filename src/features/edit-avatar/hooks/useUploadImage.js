import { refreshUser } from "../../auth/store/thunks/userThunks";
import { useAppDispatch } from "../../../app/store/hooks";


const useUploadImage = (patch) => {
    const dispatch = useAppDispatch();

    return async (image, profileId, user_type, type, close, setError) => {
        if (!image?.file) {
            setError("No image file selected");
            return;
        }
        
        if (!profileId) {
            setError("Profile ID not found");
            return;
        }

        if (!user_type) {
            setError("User type not found");
            return;
        }

        const formData = new FormData();
        formData.append(
            type === "avatar" ? "profile_image" : "cover_image",
            image.file
        );
        

        const endpoint = `/${user_type}-profiles/${profileId}/${type === "avatar" ? "profile-pic" : "cover-pic"}`;

        try {
            await patch({
                url: endpoint,
                payload: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            
            await dispatch(refreshUser()).unwrap();
            close();
        } catch (error) {            
            setError(`Failed to upload image: ${error?.message || error || "Unknown error"}`);
        }
    };
};

export default useUploadImage;