// src/features/components/home/funfair.tsx
"use client";

import React, { useState } from 'react';
import { Bebas_Neue, Space_Grotesk } from "next/font/google"; 

interface PolaroidPhoto {
  id: number;
  src: string;
  alt: string;
  frameSrc: string; // <-- Path to each unique polaroid background asset image
}

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

// Mock gallery images with custom matched frames mapped directly to their layout indices
const FUNFAIR_PHOTOS: PolaroidPhoto[] = [
  { id: 1, src: "", alt: "Activity 1", frameSrc: "/image 50.png" },
  { id: 2, src: "", alt: "Activity 2", frameSrc: "/image 51.png" },
  { id: 3, src: "", alt: "Activity 3", frameSrc: "/image 52.png" },
  { id: 4, src: "", alt: "Activity 4", frameSrc: "/image 53.png" },
  { id: 5, src: "", alt: "Activity 5", frameSrc: "/image 54.png" },
  { id: 6, src: "", alt: "Activity 6", frameSrc: "/image 55.png" },
];

export default function FunFairSection() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const activePhoto = FUNFAIR_PHOTOS[selectedPhotoIndex] || FUNFAIR_PHOTOS[0];

  return (
    <section style={{
      backgroundColor: 'transparent', 
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      boxSizing: 'border-box',
      padding: '40px 20px'
    }}>
      
      {/* Title Header Layout Area */}
      <div style={{ textAlign: 'center', maxWidth: '850px', marginTop: '0px', marginBottom: '30px' }}>
        <h1 
          className={`${bebasNeue.className} text-[40px] font-bold scale-y-120`}
          style={{
            fontSize: '72px',
            marginTop: '0px', 
            marginBottom: '20px',
          }}
        >
          <span style={{ color: '#e61c1c' }}>FUN</span> FAIR
        </h1>
        
        <p 
          className={`${spaceGrotesk.className} tracking-normal scale-y-125`}
          style={{
            fontSize: '17.5px',
            color: 'white',
            margin: '0 auto 40px auto',
            textAlign: 'center',
            fontWeight: '300',
            whiteSpace: 'normal', 
            lineHeight: '1.6'
          }}
        >
          Before ideas take center stage, the journey begins with Funfair, a lively student
          -driven celebration that brings the IIT Patna campus to life. Featuring interactive 
          games, creative activities, and vibrant photo opportunities, the event creates an 
          atmosphere filled with energy, laughter, and connection. More than just a pre-event, 
          Funfair serves as the opening chapter of the TEDxIITPatna experience.
        </p>
      </div>

      {/* Main Interactive Stage Workspace */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.5fr',
        gap: '40px',
        width: '100%',
        maxWidth: '1100px',
        alignItems: 'center', 
      }}>
        
        {/* LEFT COLUMN*/}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <span 
            className={bebasNeue.className}
            style={{
              color: '#e61c1c',
              fontSize: '24px',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}
          >
            A trip down the memory lane... ↴
          </span>
          
          {/* Big Spotlight Polaroid Canvas Box */}
          <div style={{
            position: 'relative',
            width: '440px',
            height: '440px',
            marginLeft: '0px',
            backgroundImage: "url('/image 56.png')", 
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            justifyContent: 'center',
          }}>
            {/* Inner Active Photo Window placement layout */}
            <div style={{
              position: 'absolute',
              top: '88px',      
              width: '334px',    
              height: '240px',
              overflow: 'hidden',
            }}>
              {activePhoto?.src && (
                <img 
                  src={activePhoto.src} 
                  alt={activePhoto.alt || "Active view"} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Grid Thumbnails */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '15px',
        }}>
          {FUNFAIR_PHOTOS.map((photo, index) => {
            const isSelected = index === selectedPhotoIndex;
            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhotoIndex(index)}
                style={{
                  position: 'relative',
                  width: '230px',
                  height: '210px',
                  backgroundImage: `url('${photo.frameSrc}')`, 
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  transition: 'transform 0.2s ease',
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                  // REMOVED: Blue outline, border-radius changes, and blue drop shadow styling to preserve raw asset edges.
                }}
              >
              
                <div style={{
                  position: 'absolute',
                  top: '40px',     
                  width: '151px',
                  height: '110px',
                  overflow: 'hidden',
                  backgroundColor: '#111'
                }}>
                  {photo.src && (
                    <img 
                      src={photo.src} 
                      alt={photo.alt} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}