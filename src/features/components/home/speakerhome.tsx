// src/features/components/home/speakerhome.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { SPEAKER_PAGES, SpeakerPageData } from '../../../data/page';

export default function SpeakerHome() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeSidebarSpeakerId, setActiveSidebarSpeakerId] = useState<number | null>(null);

  const currentPage: SpeakerPageData = SPEAKER_PAGES[activeIndex] || SPEAKER_PAGES[0];

  useEffect(() => {
    setActiveSidebarSpeakerId(null);
  }, [activeIndex]);

  if (!currentPage) {
    return (
      <div style={{ minHeight: '100vh', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ letterSpacing: '2px' }}>LOADING SPEAKER CONFIGURATION...</p>
      </div>
    );
  }

  const currentSidebarList = currentPage.sidebarSpeakers || [];

  const selectedSidebarSpeaker = currentSidebarList.find(
    (speaker) => speaker.id === activeSidebarSpeakerId
  );

  const displayImage = selectedSidebarSpeaker ? selectedSidebarSpeaker.image : currentPage.mainSpeaker?.image;
  const displayTitle = selectedSidebarSpeaker ? "PANEL SPEAKER" : currentPage.mainSpeaker?.name;
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
      padding: '60px 40px',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        display: 'grid',
        gridTemplateColumns: '120px 480px 1fr',
        gap: '40px',
        position: 'relative'
      }}>
        
        {/* SIDEBAR NAVIGATION COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h2 style={{
            textTransform: 'uppercase',
            fontSize: '22px',
            fontWeight: 'bold',
            letterSpacing: '2px',
            margin: '0 0 10px 0',
            color: '#ffffff'
          }}>
            {currentPage.pageTitle}
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            maxHeight: '520px',
            overflowY: 'auto',
            paddingRight: '5px'
          }}>
        
            <div
              onClick={() => setActiveSidebarSpeakerId(null)}
              style={{
                width: '65px',
                height: '65px',
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

            {currentSidebarList.map((sidebarSpeaker) => {
              const isSelected = sidebarSpeaker.id === activeSidebarSpeakerId;
              return (
                <div
                  key={sidebarSpeaker.id}
                  onClick={() => setActiveSidebarSpeakerId(sidebarSpeaker.id)}
                  style={{
                    width: '65px',
                    height: '65px',
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
        </div>

        {/* FEATURED SPEAKERS PORTRAIT BOX */}
        <div style={{
          width: '100%',
          height: '560px',
          borderRadius: '32px',
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
              transition: 'all 0.3s ease-in-out'
            }}
          />
        </div>

        {/* DETAILS PANEL & ACTION CONTROLS */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: '20px',
          position: 'relative',
          height: '560px'
        }}>
    
          <div style={{ marginBottom: 'auto', marginTop: '40px' }}>
            {/* MODIFIED: Reduced weight to 600 (semi-bold) and matched your layout fonts */}
            <h3 style={{
              fontSize: '48px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              margin: '0 0 8px 0',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              {displayTitle}
            </h3>
            
            <div style={{ width: '80px', height: '5px', backgroundColor: '#b30000', marginBottom: '20px' }} />

            <h4 style={{
              fontSize: '24px',
              fontWeight: '700',
              margin: '0 0 15px 0',
              color: '#ffffff',
              textTransform: 'capitalize'
            }}>
              {displayName}
            </h4>

            <p style={{
              fontSize: '15px',
              lineHeight: '1.6',
              color: '#cccccc',
              textAlign: 'justify',
              maxWidth: '460px',
              marginBottom: '24px'
            }}>
              {displayDescription}
            </p>
          </div>

          {/* NEXT / PREV CAROUSEL CONTROLS */}
          <div style={{
            display: 'flex',
            gap: '20px',
            alignSelf: 'flex-end',
            marginBottom: '20px',
            marginRight: '40px'
          }}>
            
            <style>{`
              .scale-btn {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0;
                width: 150px;
                height: 150px;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0.8;
                transform: scale(1);
                transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;
                outline: none;
              }
              .scale-btn:hover {
                opacity: 1;
              }
              .scale-btn:active {
                transform: scale(0.94);
              }
            `}</style>

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