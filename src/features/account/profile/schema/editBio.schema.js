

import * as Yup from "yup";

const MAX_VIDEO_SIZE_MB = 5;
const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024;

const isSupportedVideoPlatform = (url) => {
    try {
        const parsed = new URL(url);
        const host = parsed.hostname;
        return ["youtube.com", "youtu.be"].some((domain) => host.includes(domain));
    } catch {
        return false;
    }
};

export const editBioSchema = Yup.object().shape({
    introVideoUrl: Yup.string()
        .nullable()
        .notRequired()
        .test(
            "is-supported-video-platform",
            "Only YouTube URLs are supported for now",
            (value, context) => {
                if (!value) {
                    return !!context.parent.introVideoFile;
                }
                return isSupportedVideoPlatform(value);
            }
        )
        .url("Enter a valid video URL"),
    introVideoFile: Yup.mixed()
        .nullable()
        .notRequired()
        .test("is-video-file", "Only video files are allowed", (value, context) => {
            if (!value) {
                return !!context.parent.introVideoUrl;
            }
            return value instanceof File && value.type.startsWith("video/");
        })
        .test(
            "file-size",
            `Video must be under ${MAX_VIDEO_SIZE_MB}MB`,
            (value, context) => {
                if (!value) {
                    return !!context.parent.introVideoUrl;
                }
                return value.size <= MAX_VIDEO_SIZE_BYTES;
            }
        ),

    bio: Yup.string()
        .max(500, "Bio must be under 500 characters")
        .required("Bio is required"),

    //   gamesUrl: Yup.array()
    //     .of(
    //       Yup.object().shape({
    //         url: Yup.string()
    //           .url("Must be a valid game URL")
    //           .required("URL is required"),
    //         title: Yup.string().required("Title is required"),
    //         favicon: Yup.object()
    //           .shape({
    //             url: Yup.string()
    //               .url("Invalid favicon URL")
    //               .required("Favicon URL is required"),
    //           })
    //           .required("Favicon is required"),
    //         favorite: Yup.boolean(),
    //       })
    //     )
    //     .min(1, "At least one game is required")
    //     .required("Games list is required"),
});
