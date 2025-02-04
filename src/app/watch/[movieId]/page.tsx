"use client";

import { Box, IconButton, Modal } from "@mui/material";
import {
  ArrowBack,
  Bookmark,
  Fullscreen,
  FullscreenExit,
} from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function VideoPlayer({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const resolvedParams = use(params);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!videoContainerRef.current) return;

    if (!document.fullscreenElement) {
      try {
        await videoContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.error("Error attempting to exit fullscreen:", err);
      }
    }
  };

  return (
    <Modal open={true} sx={{ bgcolor: "black" }}>
      <Box
        ref={videoContainerRef}
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          bgcolor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Video Player Controls */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            padding: 2,
            transition: "opacity 0.3s ease",
            opacity: showControls ? 1 : 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => router.back()} sx={{ color: "white" }}>
            <ArrowBack sx={{ fontSize: "2rem" }} />
          </IconButton>
          <Box>
            <IconButton
              onClick={() => {
                /* TODO: Implement save functionality */
              }}
              sx={{ color: "white", mr: 1 }}
            >
              <Bookmark sx={{ fontSize: "2rem" }} />
            </IconButton>
            <IconButton onClick={toggleFullscreen} sx={{ color: "white" }}>
              {isFullscreen ? (
                <FullscreenExit sx={{ fontSize: "2rem" }} />
              ) : (
                <Fullscreen sx={{ fontSize: "2rem" }} />
              )}
            </IconButton>
          </Box>
        </Box>

        {/* Video Player */}
        <iframe
          src={`${process.env.NEXT_PUBLIC_MOVIES_URL_BASE}${resolvedParams.movieId}`}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
          allowFullScreen
        />
      </Box>
    </Modal>
  );
}
