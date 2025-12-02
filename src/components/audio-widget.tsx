"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const YOUTUBE_VIDEO_ID = "6MAzUT1YhWE"; // provided playlist/track ID
const YT_SCRIPT_ID = "youtube-iframe-api";
const HOST_ID = "anfa-youtube-audio-host";
const BAR_COUNT = 6;

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  setVolume?: (volume: number) => void;
  getVolume?: () => number;
  getPlayerState?: () => number;
};

type YTNamespace = {
  Player: new (
    element: string | HTMLElement,
    options: {
      videoId: string;
      height?: string;
      width?: string;
      playerVars?: Record<string, string | number | boolean | undefined>;
      events?: {
        onReady?: () => void;
        onStateChange?: (event: { data: number }) => void;
      };
    },
  ) => YTPlayer;
  PlayerState: {
    PLAYING: number;
    PAUSED: number;
    ENDED: number;
  };
};

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: YTNamespace;
    __anfaAudioStore?: {
      player: YTPlayer | null;
      ready: boolean;
      isPlaying: boolean;
      isMuted: boolean;
      initializing: boolean;
    };
  }
}

export function AudioWidget() {
  const playerRef = useRef<YTPlayer | null>(null);
  const isBrowser = typeof window !== "undefined";
  const initialStore = isBrowser ? window.__anfaAudioStore : undefined;

  const [ready, setReady] = useState(() => initialStore?.ready ?? false);
  const [isPlaying, setIsPlaying] = useState(() => initialStore?.isPlaying ?? false);
  const [isMuted, setIsMuted] = useState(() => initialStore?.isMuted ?? false);
  const [autoplayAttempted, setAutoplayAttempted] = useState(false);
  const [barHeights, setBarHeights] = useState<number[]>(() =>
    Array.from({ length: BAR_COUNT }, () => 0.3),
  );

  const handleStateChange = useCallback((event: { data: number }) => {
    if (!window.__anfaAudioStore) return;
    const playerState = window.YT?.PlayerState;
    if (!playerState) return;
    const isActive = event.data === playerState.PLAYING;
    setIsPlaying(isActive);
    window.__anfaAudioStore.isPlaying = isActive;
  }, []);

  const initPlayer = useCallback(
    (host: HTMLDivElement) => {
      if (playerRef.current) return;
      const yt = window.YT;
      if (!yt) return;
      playerRef.current = new yt.Player(host, {
        videoId: YOUTUBE_VIDEO_ID,
        height: "0",
        width: "0",
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
        },
        events: {
          onReady: () => {
            setReady(true);
            playerRef.current?.setVolume?.(60);
            playerRef.current?.unMute?.();
            setIsMuted(false);
            if (!window.__anfaAudioStore) {
              window.__anfaAudioStore = {
                player: playerRef.current,
                ready: true,
                isPlaying: false,
                isMuted: false,
                initializing: false,
              };
            } else {
              window.__anfaAudioStore.player = playerRef.current;
              window.__anfaAudioStore.ready = true;
              window.__anfaAudioStore.isMuted = false;
              window.__anfaAudioStore.initializing = false;
            }
            if (!autoplayAttempted) {
              setAutoplayAttempted(true);
              const startPlayback = () => playerRef.current?.playVideo();
              window.setTimeout(() => {
                startPlayback();
                window.setTimeout(() => {
                  const playerState = playerRef.current?.getPlayerState?.();
                  const ytState = window.YT?.PlayerState;
                  if (playerState !== ytState?.PLAYING) {
                    playerRef.current?.mute?.();
                    setIsMuted(true);
                    if (window.__anfaAudioStore) window.__anfaAudioStore.isMuted = true;
                    playerRef.current?.playVideo();
                  }
                }, 1200);
              }, 200);
            }
          },
          onStateChange: handleStateChange,
        },
      });
    },
    [autoplayAttempted, handleStateChange],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.__anfaAudioStore ??= {
      player: null,
      ready: false,
      isPlaying: false,
      isMuted: false,
      initializing: false,
    };

    const store = window.__anfaAudioStore;

    let host = document.getElementById(HOST_ID) as HTMLDivElement | null;
    if (!host) {
      host = document.createElement("div");
      host.id = HOST_ID;
      host.style.display = "none";
      document.body.appendChild(host);
    }

    const attachExistingPlayer = () => {
      if (!store.player) return;
      playerRef.current = store.player as YTPlayer;
      setReady(store.ready);
      setIsMuted(store.isMuted);
      setIsPlaying(store.isPlaying);
    };

    if (store.player) {
      attachExistingPlayer();
      return;
    }

    if (store.initializing) {
      const watcher = window.setInterval(() => {
        if (store.player) {
          attachExistingPlayer();
          window.clearInterval(watcher);
        }
      }, 150);
      return () => window.clearInterval(watcher);
    }

    store.initializing = true;

    const ensureScript = () => {
      if (!document.getElementById(YT_SCRIPT_ID)) {
        const script = document.createElement("script");
        script.id = YT_SCRIPT_ID;
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.body.appendChild(script);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer(host);
    } else {
      window.onYouTubeIframeAPIReady = () => initPlayer(host!);
      ensureScript();
    }

    return () => {
      window.onYouTubeIframeAPIReady = undefined;
    };
  }, [initPlayer]);

  const toggleMute = () => {
    if (!ready || !playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
      if (window.__anfaAudioStore) window.__anfaAudioStore.isMuted = false;
    } else {
      playerRef.current.mute();
      setIsMuted(true);
      if (window.__anfaAudioStore) window.__anfaAudioStore.isMuted = true;
    }
  };

  useEffect(() => {
    if (!ready) return;
    if (!isPlaying) {
      requestAnimationFrame(() => {
        setBarHeights(Array.from({ length: BAR_COUNT }, () => 0.2));
      });
      return;
    }

    const interval = window.setInterval(() => {
      const volume = playerRef.current?.getVolume?.() ?? 0;
      const intensity = Math.max(0.25, volume / 100);
      setBarHeights(
        Array.from({ length: BAR_COUNT }, () =>
          Math.min(1.2, Math.max(0.2, intensity * (0.7 + Math.random()))),
        ),
      );
    }, 180);

    return () => window.clearInterval(interval);
  }, [isPlaying, ready]);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2 text-[var(--foreground)]">
      <div className="pointer-events-auto flex items-center gap-4 rounded-full border border-[var(--border)] bg-white/95 px-5 py-2 shadow-2xl">
        <div className="flex flex-col text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
          <span className="text-[var(--foreground)]">Audio</span>
          <span className="text-[9px] tracking-[0.4em] text-[#a78a6e]">
            {ready && isPlaying ? (isMuted ? "Muted" : "Playing") : "Starting"}
          </span>
        </div>
        <SoundBars values={barHeights} />
        <button
          type="button"
          onClick={toggleMute}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--primary)]"
          disabled={!ready}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
      <div id={HOST_ID} className="h-0 w-0 overflow-hidden" aria-hidden="true" />
    </div>
  );
}

function SoundBars({ values }: { values: number[] }) {
  return (
    <div className="sound-bars">
      {values.map((value, idx) => (
        <span key={`bar-${idx}`} style={{ transform: `scaleY(${value})` }} />
      ))}
    </div>
  );
}
