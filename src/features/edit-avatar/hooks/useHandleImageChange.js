import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE_MB } from "../../../shared/enums/mediaTypesEnum";


const useHandleImageChange = (setCropProps, setError, setImage) => {
    return (file) => {
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
            if (setImage) {
                setImage({ preview: e.target.result, file });
            }
            if (setCropProps) {
                setCropProps((prev) => ({ ...prev, showCropper: true }));
            }
        };
        reader.readAsDataURL(file);
    };
};

export default useHandleImageChange;