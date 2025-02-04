'use client';

import { VolumeMute, VolumeUp } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useRef, useState } from 'react';
import YouTube from 'react-youtube';

interface YoutubePlayerProps {
  id: string;
  btSize?: 'small' | 'medium' | 'large';
  frameStyle?: React.CSSProperties;
}

const opts = {
  height: '100%',
  width: '100%',
  playerVars: {
    playsinline: 1,
    autoplay: 1,
    controls: 0,
    modestbranding: 0,
    rel: 0,
    mute: 1,
    loop: 1,
  },
};

export default function YoutubePlayer({ id, btSize = 'small', frameStyle }: YoutubePlayerProps) {
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef<any>(null);

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
      console.error('Error toggling mute:', error);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        ...(frameStyle && { ...frameStyle }),
      }}
    >
      <YouTube
        ref={playerRef}
        videoId={id}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        opts={{
          ...opts,
          playerVars: { ...opts.playerVars, playlist: id },
        }}
      />
      <IconButton
        onClick={handleMute}
        sx={{
          color: 'primary.main',
          position: 'absolute',
          right: btSize === 'large' ? '2rem' : '80%',
          top: btSize === 'medium' ? '60%' : '70%',
          border: `${btSize === 'small' ? 2 : 4}px solid`,
          borderColor: 'primary.main',
          opacity: 0.6,
          transition: 'all .2s ease',
          '&:hover': {
            opacity: 1,
          },
        }}
      >
        {isMuted ? (
          <VolumeMute
            sx={{
              width: btSize === 'small' ? '1rem' : '2rem',
              height: btSize === 'small' ? '1rem' : '2rem',
            }}
          />
        ) : (
          <VolumeUp
            sx={{
              width: btSize === 'small' ? '1rem' : '2rem',
              height: btSize === 'small' ? '1rem' : '2rem',
            }}
          />
        )}
      </IconButton>
    </Box>
  );
}
