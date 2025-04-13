import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import dummyData from "../data/dummyData.json";

const Player = ({ onSongSelect }) => {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSongs(dummyData);
  }, []);

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-[130vh] bg-[#2c271d] p-9 md:w-[600px]">
      <h2 className="font-bold text-white text-3xl">For You</h2>

      <div className="relative w-96 mt-8 mb-4">
        {/* Icon inside input */}
        <FontAwesomeIcon
          icon={faSearchengin}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-2xl"
        />

        <input
          placeholder="Search Song, Artist"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-[500px] h-12 bg-[#574a3b] text-white rounded-xl pl-12 text-[18px] focus:outline-none"
        />
      </div>

      <div className="space-y-4">
        {filteredSongs.map((song, index) => (
          <div
            key={index}
            onClick={() => onSongSelect(song)}
            className="flex items-center justify-between hover:bg-[#574a3b] p-3 rounded-xl text-white transition duration-300 ease-in-out cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <img
                src={song.thumbnail}
                alt={song.title}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{song.title}</p>
                <p className="text-sm text-gray-300">{song.artistName}</p>
              </div>
            </div>
            <p className="text-sm">{song.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Player;
