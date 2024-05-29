import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import SubtitleCustomizer from './SubtitleCustomizer';
import { parseSRT, Subtitle } from './parseSRT';

const PlayerWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: auto;
`;

const SubtitleOverlay = styled.div<{ fontSize: number; color: string; bgColor: string }>`
  position: absolute;
  bottom: 50px;
  width: 100%;
  text-align: center;
  font-size: ${({ fontSize }) => fontSize}px;
  color: ${({ color }) => color};
  background: ${({ bgColor }) => bgColor};
  padding: 5px;
  opacity: 0.7;
`;

const VideoPlayer: React.FC = () => {
  const playerRef = useRef<ReactPlayer>(null);
  const [subSettings, setSubSettings] = useState({
    fontSize: 20,
    color: '#ffffff',
    bgColor: '#000000',
    enabled: true,
    text: '',
  });
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>('');

  const handlePlayPause = () => {
    const player = playerRef.current?.getInternalPlayer() as HTMLVideoElement | null;
    if (player) {
      if (player.paused) {
        player.play();
      } else {
        player.pause();
      }
    }
  };

  // Function to fetch and parse SRT file from a URL
  const fetchSRT = (url: string) => {
    fetch(url)
      .then(response => response.text())
      .then(data => {
        const subtitles = parseSRT(data);
        setSubtitles(subtitles);
      })
      .catch(error => console.error('Error fetching SRT file:', error));
  };

  useEffect(() => {
    // Replace with your SRT file URL
    const srtUrl = 'example.srt';
    fetchSRT(srtUrl);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const player = playerRef.current?.getInternalPlayer() as HTMLVideoElement | null;
      if (player && subtitles.length > 0) {
        const currentTime = player.currentTime;
        const currentSub = subtitles.find(
          (subtitle) => currentTime >= subtitle.start && currentTime <= subtitle.end
        );
        setCurrentSubtitle(currentSub ? currentSub.text : '');
      }
    }, 100);

    return () => clearInterval(interval);
  }, [subtitles]);

  return (
    <PlayerWrapper>
      <ReactPlayer
        ref={playerRef}
        url="/JJJJJ.mp4" // Ensure this path is correct and the file is in the public folder
        controls={true}
        width="100%"
        height="100%"
      />
      {subSettings.enabled && currentSubtitle && (
        <SubtitleOverlay
          fontSize={subSettings.fontSize}
          color={subSettings.color}
          bgColor={subSettings.bgColor}
        >
          {currentSubtitle}
        </SubtitleOverlay>
      )}
      <button onClick={handlePlayPause}>Play/Pause</button>
      <SubtitleCustomizer setSubSettings={setSubSettings} />
    </PlayerWrapper>
  );
};

export default VideoPlayer;
