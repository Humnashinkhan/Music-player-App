import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import MusicCard from "./components/MusicCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // If moving to desktop, ensure sidebar is shown
      if (!mobile) {
        setShowSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setShowSidebar((prev) => !prev);
    }
  };



  return (
    <div className="flex flex-col md:flex-row h-screen relative">
    {/* Mobile Topbar */}
    {isMobile && (
      <div className="bg-[#2c271d] text-white p-4 flex justify-between items-center md:hidden">
        <button onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} className="text-2xl" />
        </button>
        <h2 className="text-xl font-bold">My Spotify</h2>
      </div>
    )}

    {/* Sidebar */}
    <div
      className={`${
        isMobile
          ? showSidebar
            ? "absolute z-50 bg-[#2c271d]"
            : "hidden"
          : "block"
      }`}
    >
      <Sidebar />
    </div>

    {/* Main content */}
    <div className="flex flex-col md:flex-row w-full">
      <Player onSongSelect={setCurrentSong} />
      <MusicCard song={currentSong} />
    </div>
  </div>
  );
};

export default App;
