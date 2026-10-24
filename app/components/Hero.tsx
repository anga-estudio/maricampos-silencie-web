"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import BoldSilencie from "./BoldSilencie";

export default function Hero({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Tenta iniciar o áudio na primeira interação do usuário (necessário para mobile)
  useEffect(() => {
    let audioStarted = false;

    const startAudioOnInteraction = () => {
      if (!audioStarted && audioRef.current) {
        audioStarted = true;
        audioRef.current
          .play()
          .then(() => {
            setIsSoundOn(true);
          })
          .catch(() => {
            // Se falhar, o usuário pode ativar manualmente
          });
      }
    };

    // Garantir que o vídeo sempre toque
    const ensureVideoPlays = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    };

    // Eventos que indicam interação do usuário
    const events = ["click", "touchstart", "scroll", "keydown"];
    events.forEach((event) => {
      document.addEventListener(event, startAudioOnInteraction, { once: true });
    });

    // Tentar iniciar vídeo imediatamente
    ensureVideoPlays();

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, startAudioOnInteraction);
      });
    };
  }, []);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isSoundOn) {
        audioRef.current.pause();
        setIsSoundOn(false);
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsSoundOn(true);
          })
          .catch(() => {});
      }
    }
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        style={{
          WebkitAppearance: "none",
        }}
      >
        <source
          src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Ocean Sound */}
      <audio ref={audioRef} loop>
        <source
          src="https://cdn.pixabay.com/audio/2022/06/07/audio_b9bd4170e4.mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* Header Buttons */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-white transition-all hover:bg-white/30"
          aria-label={isSoundOn ? "Desativar som" : "Ativar som"}
        >
          {isSoundOn ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
          <span className="text-sm">{isSoundOn ? "Som ligado" : "Som desligado"}</span>
        </button>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 px-6 text-center text-white">
        <Image
          src="/logo-white.svg"
          alt={title}
          width={480}
          height={121}
          priority
          className="mx-auto mb-12"
        />
        <p className="mx-auto max-w-2xl text-xl leading-relaxed text-white/90">
          <BoldSilencie>{description}</BoldSilencie>
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          className="opacity-70"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
