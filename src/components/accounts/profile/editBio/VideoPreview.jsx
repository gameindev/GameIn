import React, { useState, useEffect } from "react";
import { ImageWrapper, PlayIcon, VideoWrapper } from "./style";

export function VideoPreview({ videoUrl, videoFile }) {
  const [showVideo, setShowVideo] = useState(false);
  const [poster, setPoster] = useState(null);

  const getVideoId = (url) => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1);
      if (parsed.hostname.includes("youtube.com"))
        return parsed.searchParams.get("v");
    } catch {
      return null;
    }
  };

  const videoId = getVideoId(videoUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  const thumbnailUrl = videoId && `https://img.youtube.com/vi/${videoId}/0.jpg`;

  useEffect(() => {
    if (videoFile) {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(videoFile);
      video.crossOrigin = "anonymous";
      video.muted = true;
      video.playsInline = true;

      const canvas = document.createElement("canvas");

      const capturePoster = () => {
        video.currentTime = 0.5;
        video.onseeked = () => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          setPoster(canvas.toDataURL("image/jpeg"));
        };
      };

      video.addEventListener("loadeddata", capturePoster);
      return () => {
        video.removeEventListener("loadeddata", capturePoster);
      };
    }
  }, [videoFile]);

  if (!videoFile && !videoUrl && !videoId) {
    return <ImageWrapper>No Video Found</ImageWrapper>;
  }

  if (videoFile) {
    if (!showVideo) {
      return (
        <ImageWrapper
          onClick={() => setShowVideo(true)}
          style={{
            backgroundImage: `url(${poster})`,
          }}
        >
          <PlayIcon>▶</PlayIcon>
        </ImageWrapper>
      );
    }

    return (
      <VideoWrapper>
        <video controls src={URL.createObjectURL(videoFile)} poster={poster} />
      </VideoWrapper>
    );
  }

  if (videoUrl && videoId) {
    return !showVideo ? (
      <ImageWrapper
        onClick={() => setShowVideo(true)}
        style={{
          backgroundImage: `url(${thumbnailUrl})`,
        }}
      >
        <PlayIcon>▶</PlayIcon>
      </ImageWrapper>
    ) : (
      <VideoWrapper>
        <iframe
          src={embedUrl}
          title="Intro Video"
          allowFullScreen
          frameBorder="0"
        />
      </VideoWrapper>
    );
  }

  return null;
}
