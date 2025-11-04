import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import { currentUser } from "../../../auth/store/selector";
import useApi from "../../../../shared/hooks/useApi";
import { setBio } from "../store/bioSlice";
import { USER_ENDPOINTS } from "../../../auth/api/userEndpoints";
import { refreshUser } from "../../../auth/store/thunks/userThunks";
import { showNotificationHelper } from "../../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../../shared/enums/notificationTypesEnum";

export const useEditBio = (gameUrls, navigate) => {
    const user = useAppSelector(currentUser);
    const { patch, post } = useApi();
    const dispatch = useAppDispatch();

    const onSubmit = async (data) => {
        try {
            let finalVideoUrl = data.introVideoUrl || "";

            // If a file is provided, upload it first and use its path as the URL
            if (data.introVideoFile) {
                if (data.introVideoFile.type !== 'video/mp4') {
                    showNotificationHelper(
                        "Invalid file",
                        "Only MP4 files are allowed for intro video.",
                        NOTIFICATION_TYPES.ERROR
                    );
                    return;
                }

                const formData = new FormData();
                formData.append('file', data.introVideoFile);

                const uploadResp = await post({
                    url: '/uploads/file',
                    payload: formData,
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                finalVideoUrl = uploadResp?.path || "";
            }

            const payload = {
                bio: data.bio,
                video_bio_url: finalVideoUrl,
                user_id: user.id,
                preferred_games: gameUrls.map((game, index) => ({
                    game_url: game.url,
                    sort_order: index,
                })),
            };

            await patch({
                url: USER_ENDPOINTS.BIO,
                payload,
            });

            dispatch(
                setBio({
                    bio: data.bio,
                    introVideoUrl: finalVideoUrl,
                    introVideoFile: data.introVideoFile,
                    gamesUrl: gameUrls,
                })
            );
            
            // Await the async thunk
            await dispatch(refreshUser());
            
            showNotificationHelper("Success", "Profile Updated Successfully", NOTIFICATION_TYPES.SUCCESS);
            navigate("/profile");
        } catch (err) {
            console.error("Error updating bio:", err);
            showNotificationHelper(
                "Error", 
                err?.response?.data?.message || "Failed to update bio",
                NOTIFICATION_TYPES.ERROR
            );
        }
    };

    return { onSubmit };
};

