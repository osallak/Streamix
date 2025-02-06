"use client";

import { VolumeMute, VolumeUp } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import YouTube from "react-youtube";

interface YoutubePlayerProps {
  videoId: string;
  buttonSize?: "small" | "medium" | "large";
  frameStyle?: React.CSSProperties;
  autoPlay?: boolean;
  muted?: boolean;
}

export default function YoutubePlayer({
  videoId,
  buttonSize = "small",
  frameStyle,
  autoPlay = false,
  muted = false,
}: YoutubePlayerProps) {
  const [isMuted, setIsMuted] = useState(muted);
  const playerRef = useRef<any>(null);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      playsinline: 1,
      autoplay: autoPlay ? 1 : 0,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      mute: muted ? 1 : 0,
      loop: 1,
      playlist: videoId, // Required for looping
      showinfo: 0,
      iv_load_policy: 3, // Hide video annotations
    },
  };

  const handleMute = async () => {
    if (!playerRef?.current?.internalPlayer) return;

    try {
      const muted = await playerRef.current.internalPlayer.isMuted();
      if (muted) {
        await playerRef.current.internalPlayer.unMute();
        setIsMuted(false);
      } else {
        await playerRef.current.internalPlayer.mute();
        setIsMuted(true);
      }
    } catch (error) {
      console.error("Error toggling mute:", error);
    }
  };

  const handleReady = (event: any) => {
    if (autoPlay) {
      event.target.playVideo();
    }
    if (muted) {
      event.target.mute();
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        ...(frameStyle && { ...frameStyle }),
      }}
    >
      <YouTube
        ref={playerRef}
        videoId={videoId}
        opts={opts}
        onReady={handleReady}
        style={{
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(1.5)",
        }}
      />
      <IconButton
        onClick={handleMute}
        sx={{
          color: "white",
          position: "absolute",
          right: { xs: "1.5rem", md: "2rem" },
          bottom: { xs: "auto", md: "25%" },
          top: { xs: "45%", md: "auto" },
          border: `${buttonSize === "small" ? 2 : 4}px solid`,
          borderColor: "white",
          opacity: 0.6,
          transition: "all .2s ease",
          zIndex: 10,
          transform: { xs: "scale(0.8)", md: "scale(1)" },
          padding: { xs: "8px", md: "12px" },
          "&:hover": {
            opacity: 1,
          },
        }}
      >
        {isMuted ? (
          <VolumeMute
            sx={{
              width: { xs: buttonSize === "small" ? "1rem" : "2rem", md: "2.5rem" },
              height: { xs: buttonSize === "small" ? "1rem" : "2rem", md: "2.5rem" },
            }}
          />
        ) : (
          <VolumeUp
            sx={{
              width: { xs: buttonSize === "small" ? "1rem" : "2rem", md: "2.5rem" },
              height: { xs: buttonSize === "small" ? "1rem" : "2rem", md: "2.5rem" },
            }}
          />
        )}
      </IconButton>
    </Box>
  );
}
