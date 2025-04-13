import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

const Sidebar = () => {
  return (
    <div className="w-96 h-[130vh] bg-[#2c271d] p-4 relative">
      <h2 className="ml-4 mb-4 text-2xl font-bold text-white mt-5">
        <FontAwesomeIcon icon={faSpotify} className="w-12 text-4xl" />
        My Spotify
      </h2>
      <ul className="space-y-3 ml-4">
        <li className="p-2 rounded text-white text-[20px] mt-2">For You</li>
        <li className="p-2 rounded text-[20px] text-[#898989]">Top Tracks</li>
        <li className="p-2 rounded text-[20px] text-[#898989]">Favourites</li>
        <li className="p-2 rounded text-[20px] text-[#898989]">
          Recently Played
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
