import { useEffect, useRef, useState } from "react";
import { Video } from "../../types/Video";
import { Slider } from "antd";
import { StepForwardOutlined, StepBackwardOutlined, PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';

export function VideoPlayer({
  videos,
  currentVideoIndex,
}: {
  videos: Video[];
  currentVideoIndex: number;
}) {
  const [index, setIndex] = useState(currentVideoIndex);
  const video = videos[index];
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);

  const playPrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(videos.length - 1);
    }
  };

  const playNext = () => {
    if (index < videos.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }, [index]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("loadedmetadata", () => {
        setDuration(video.duration);
      });

      video.addEventListener("timeupdate", () => {
        setCurrentTime(video.currentTime);
      });
    }
  }, []);

  const onSliderChange = (value: number) => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = (value / 100) * duration;
      setCurrentTime(video.currentTime);
    }
  };

  return (
    <div>
      <video src={video.url} ref={videoRef}></video>
      <div>
        <h2 style={{ fontWeight: "bold" }}>
          {video.name} - {video.artist}
        </h2>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginBottom: "10px",
          width: "100%",
        }}
      >
        <div onClick={playPrevious} style={{
          marginLeft: 'auto',
          marginRight: '2rem',
        }}><StepBackwardOutlined style={{
          fontSize: '2rem',
        }} /></div>
        <div
          onClick={togglePlay}
        >{isPlaying ? <PauseCircleOutlined style={{
          fontSize: '2rem',
        }}/> : <PlayCircleOutlined style={{
          fontSize: '2rem',
        }}/>}</div>
        <div onClick={playNext} style={{
          marginLeft: '2rem',
          marginRight: 'auto',
        }}><StepForwardOutlined style={{
          fontSize: '2rem',
        }}/></div>
      </div>
      <Slider
        defaultValue={0}
        value={(currentTime / duration) * 100}
        onChange={onSliderChange}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          {new Date(currentTime * 1000).toISOString().substring(14, 19)}
        </span>
        <span>{new Date(duration * 1000).toISOString().substring(14, 19)}</span>
      </div>
    </div>
  );
}
