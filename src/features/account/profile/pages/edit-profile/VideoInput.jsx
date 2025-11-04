import { FileInput, Group, Radio, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import FormField from "../../../../../shared/components/FormField";


export default function VideoInput({ control, setValue }) {
    const [videoInputType, setVideoInputType] = useState("url");

    const videoUrl = useWatch({ control, name: "introVideoUrl" });
    const videoFile = useWatch({ control, name: "introVideoFile" });

    useEffect(() => {
        if (videoFile) {
            setVideoInputType("upload");
        } else if (videoUrl) {
            setVideoInputType("url");
        }
    }, [videoUrl, videoFile]);

    return (
        <>
            <Radio.Group
                value={videoInputType}
                onChange={(val) => setVideoInputType(val)}
                label="Intro Video Source"
            >
                <Group mt="xs">
                    <Radio value="url" label="Enter URL" />
                    <Radio value="upload" label="Upload File" />
                </Group>
            </Radio.Group>

            {videoInputType === "url" ? (
                <FormField
                    name="introVideoUrl"
                    control={control}
                    Component={TextInput}
                    componentProps={{
                        label: "Intro Video URL",
                        placeholder: "Paste YouTube video URL",
                        onChange: (e) => {
                            setValue("introVideoUrl", e.currentTarget.value);
                            if (videoFile) {
                                setValue("introVideoFile", null);
                            }
                        },
                    }}
                />
            ) : (
                <Controller
                    name="introVideoFile"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <FileInput
                            label="Upload Intro Video"
                            accept="video/mp4"
                            placeholder="Upload your video"
                            value={field.value}
                            onChange={(file) => {
                                field.onChange(file);
                                if (videoUrl) {
                                    setValue("introVideoUrl", "");
                                }
                            }}
                            error={error?.message}
                        />
                    )}
                />
            )}
        </>
    );
}
