import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
  faVolumeUp,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

const MusicCard = ({ song }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (song) {
      setIsPlaying(true);
      setProgress(0);
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [song]);

  useEffect(() => {
    const updateProgress = () => {
      const audio = audioRef.current;
      if (audio) {
        const percent = (audio.currentTime / audio.duration) * 100;
        setProgress(isNaN(percent) ? 0 : percent);
      }
    };
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (audio) audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!song) {
    return (
      <div className="md:w-[600px] h-[130vh] bg-[#2c271d] flex items-center justify-center text-white text-lg">
        Select a song
      </div>
    );
  }

  return (
    <div className="pl-10 md:w-[600px] h-[130vh] bg-[#2c271d] p-6 text-white flex flex-col justify-between">
      <audio ref={audioRef}>
        <source src={song.musicUrl} type="audio/mp3" />
      </audio>

      <div>
        <h2 className="text-3xl font-semibold mt-20">{song.title}</h2>
        <p className="text-gray-400 mb-4 mt-2">{song.artistName}</p>
        <img
          src={song.thumbnail}
          alt={song.title}
          className="mt-10 h-[400px] w-96 rounded-lg shadow"
        />
      </div>

      {/* Progress Bar */}
      <div className="md:w-96 bg-gray-600 rounded-full">
        <div
          className="bg-white h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Controls */}
      <div className="md:w-96 flex items-center justify-between px-4 mb-72 md:mb-36">
        <FontAwesomeIcon icon={faEllipsisH} className="text-xl" />
        <div className="flex items-center gap-6">
          <FontAwesomeIcon
            icon={faBackward}
            className="text-xl cursor-pointer"
          />
          <div
            onClick={togglePlay}
            className="text-2xl p-3 rounded-full bg-white text-black cursor-pointer"
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </div>
          <FontAwesomeIcon
            icon={faForward}
            className="text-xl cursor-pointer"
          />
        </div>
        <FontAwesomeIcon icon={faVolumeUp} className="text-xl" />
      </div>
    </div>
  );
};

export default MusicCard;
