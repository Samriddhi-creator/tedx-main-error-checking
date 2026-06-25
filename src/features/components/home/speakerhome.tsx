"use client";

import React, { useState, useEffect } from 'react';
import { SPEAKER_PAGES, SpeakerPageData } from '../../../data/page';
import { Bebas_Neue, Space_Grotesk } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export default function SpeakerHome() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeSidebarSpeakerId, setActiveSidebarSpeakerId] = useState<number | null>(null);

  const currentPage: SpeakerPageData = SPEAKER_PAGES[activeIndex] || SPEAKER_PAGES[0];
  const currentSidebarList = currentPage.sidebarSpeakers || [];

  useEffect(() => {
    setActiveSidebarSpeakerId(null);
  }, [activeIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (activeSidebarSpeakerId === null) {
        if (currentSidebarList.length > 0) {
          setActiveSidebarSpeakerId(currentSidebarList[0].id);
        }
      } else {
        const currentSubIndex = currentSidebarList.findIndex(
          (s) => s.id === activeSidebarSpeakerId
        );

        if (currentSubIndex !== -1 && currentSubIndex < currentSidebarList.length - 1) {
          setActiveSidebarSpeakerId(currentSidebarList[currentSubIndex + 1].id);
        } else {
          setActiveSidebarSpeakerId(null);
        }
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [activeSidebarSpeakerId, currentSidebarList]);

  if (!currentPage) {
    return (
      <div style={{ minHeight: '100vh', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ letterSpacing: '2px' }}>LOADING SPEAKER CONFIGURATION...</p>
      </div>
    );
  }

  const selectedSidebarSpeaker = currentSidebarList.find(
    (speaker) => speaker.id === activeSidebarSpeakerId
  );

  const displayImage = selectedSidebarSpeaker ? selectedSidebarSpeaker.image : currentPage.mainSpeaker?.image;
  const displayTitle = selectedSidebarSpeaker ? "SPEAKER" : currentPage.mainSpeaker?.name;
  const displayName = selectedSidebarSpeaker ? selectedSidebarSpeaker.displayName : currentPage.mainSpeaker?.displayName;
  const displayDescription = selectedSidebarSpeaker ? selectedSidebarSpeaker.description : currentPage.mainSpeaker?.description;

  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? SPEAKER_PAGES.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % SPEAKER_PAGES.length);
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#0a0505',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '40px 20px',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      
      {/* INJECTED RESPONSIVE LAYOUT STYLES */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scale-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.8;
          transform: scale(1);
          transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;
          outline: none;
        }
        @media (min-width: 768px) {
          .scale-btn {
            width: 150px;
            height: 150px;
          }
        }
        .scale-btn:hover {
          opacity: 1;
        }
        .scale-btn:active {
          transform: scale(0.94);
        }

        /* Responsive structural control handling layout shifting */
        .speaker-grid {
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 24px;
        }
        .thumb-column {
          display: flex;
          flex-direction: row;
          order: 2;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 4px;
          justify-content: center;
        }
        .portrait-column {
          width: 100%;
          height: 340px;
          order: 1;
        }
        .details-column {
          width: 100%;
          order: 3;
          display: flex;
          flex-direction: column;
          padding-left: 0;
        }

        /* Consolidated true inline heading block wrapper layout styles */
        .title-underline-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: fit-content;
          margin-bottom: 24px;
        }
        .heading-title {
          font-size: clamp(40px, 7vw, 64px);
          text-transform: uppercase;
          letter-spacing: 2px;
          transform: scaleY(1.25);
          margin: 0;
          display: inline-block;
        }
        .red-line {
          width: 100%;
          height: 5px;
          background-color: #b30000;
          margin-top: 12px;
        }

        .content-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
          margin-top: 10px;
        }

        @media (min-width: 1024px) {
          .speaker-grid {
            display: grid;
            grid-template-columns: 70px 480px 1fr;
            gap: 40px;
            align-items: start;
          }
          .thumb-column {
            flex-direction: column;
            order: unset;
            max-height: 560px;
            overflow-y: auto;
            overflow-x: hidden;
            justify-content: flex-start;
            padding-bottom: 0;
          }
          .portrait-column {
            height: 560px;
            order: unset;
          }
          .details-column {
            height: 560px;
            order: unset;
            padding-left: 20px;
            justify-content: space-between;
          }
          .content-block {
            align-items: flex-start;
            text-align: left;
          }
          .title-underline-container {
            align-items: flex-start;
            margin-left: 150px;
          }
        }
      `}} />

      <div className="speaker-grid" style={{ maxWidth: '1200px', position: 'relative' }}>
        
        {/* THUMBNAILS PANEL */}
        <div className="thumb-column no-scrollbar">
          {/* MAIN SPEAKER THUMBNAIL */}
          <div
            onClick={() => setActiveSidebarSpeakerId(null)}
            style={{
              width: '55px',
              height: '55px',
              flexShrink: 0,
              cursor: 'pointer',
              borderRadius: '4px',
              overflow: 'hidden',
              boxSizing: 'border-box',
              border: activeSidebarSpeakerId === null ? '2px solid #e61c1c' : '2px solid rgba(255,255,255,0.2)',
              opacity: activeSidebarSpeakerId === null ? 1 : 0.5,
              transition: 'all 0.2s ease'
            }}
          >
            <img
              src={currentPage.mainSpeaker?.image}
              alt="Main"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* SIDEBAR SPEAKERS LIST */}
          {currentSidebarList.map((sidebarSpeaker) => {
            const isSelected = sidebarSpeaker.id === activeSidebarSpeakerId;
            return (
              <div
                key={sidebarSpeaker.id}
                onClick={() => setActiveSidebarSpeakerId(sidebarSpeaker.id)}
                style={{
                  width: '55px',
                  height: '55px',
                  flexShrink: 0,
                  cursor: 'pointer',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  border: isSelected ? '2px solid #e61c1c' : '2px solid transparent',
                  opacity: isSelected ? 1 : 0.6,
                  transition: 'all 0.2s ease',
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                <img
                  src={sidebarSpeaker.image}
                  alt={sidebarSpeaker.displayName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            );
          })}
        </div>

        {/* FEATURED MAIN PHOTO PORTRAIT BOX */}
        <div className="portrait-column" style={{
          borderRadius: '24px',
          overflow: 'hidden',
          border: '2px solid rgba(230, 28, 28, 0.6)', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}>
          <img
            src={displayImage}
            alt={displayName}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'all 0.4s ease-in-out'
            }}
          />
        </div>

        {/* DETAILS PANEL & ACTION CONTROLS */}
        <div className="details-column">
          <div className="content-block">
            
            {/* LINKED VIEWPORT CONTAINER: Underline acts directly on header width size parameters */}
            <div className="title-underline-container">
              <h3 className={`${bebasNeue.className} heading-title`}>
                {displayTitle}
              </h3>
              <div className="red-line" />
            </div>

            <h4 
              className={bebasNeue.className}
              style={{
                fontSize: 'clamp(30px, 5vw, 35px)',
                margin: '0 0 15px 0',
                color: '#ffffff',
                textTransform: 'capitalize',
                letterSpacing: '1px'
              }}
            >
              {displayName}
            </h4>

            <p 
              className={spaceGrotesk.className}
              style={{
                fontSize: '15px',
                lineHeight: '1.6',
                color: '#cccccc',
                textAlign: 'justify',
                maxWidth: '100%',
                marginBottom: '24px',
                fontWeight: '400'
              }}
            >
              {displayDescription}
            </p>
          </div>

          {/* NEXT / PREV CAROUSEL CONTROLS */}
          <div style={{
            display: 'flex',
            gap: '12px',
            alignSelf: 'center',
            marginTop: 'auto',
            marginBottom: '10px'
          }}>
            {/* LEFT BUTTON */}
            <button onClick={handlePrev} className="scale-btn">
              <img 
                src="/image 13.svg" 
                alt="Previous Page" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
              />
            </button>

            {/* RIGHT BUTTON */}
            <button onClick={handleNext} className="scale-btn">
              <img 
                src="/image 14.svg" 
                alt="Next Page" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
              />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}