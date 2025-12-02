"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

const YOUTUBE_VIDEO_ID = "6MAzUT1YhWE"; // provided playlist/track ID
const YT_SCRIPT_ID = "youtube-iframe-api";
const HOST_ID = "anfa-youtube-audio-host";
const BAR_COUNT = 6;

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT: typeof YT;
    __anfaAudioStore?: {
      player: YT.Player | null;
      ready: boolean;
      isPlaying: boolean;
      isMuted: boolean;
      initializing: boolean;
    };
  }
}

export function AudioWidget() {
  const playerRef = useRef<YT.Player | null>(null);
  const isBrowser = typeof window !== "undefined";
  const initialStore = isBrowser ? window.__anfaAudioStore : undefined;

  const [ready, setReady] = useState(() => initialStore?.ready ?? false);
  const [isPlaying, setIsPlaying] = useState(() => initialStore?.isPlaying ?? false);
  const [isMuted, setIsMuted] = useState(() => initialStore?.isMuted ?? false);
  const [autoplayAttempted, setAutoplayAttempted] = useState(false);
  const [barHeights, setBarHeights] = useState<number[]>(() =>
    Array.from({ length: BAR_COUNT }, () => 0.3),
  );

  const handleStateChange = useCallback((event: YT.OnStateChangeEvent) => {
    if (!window.__anfaAudioStore) return;
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      window.__anfaAudioStore.isPlaying = true;
    } else if (
      event.data === window.YT.PlayerState.PAUSED ||
      event.data === window.YT.PlayerState.ENDED
    ) {
      setIsPlaying(false);
      window.__anfaAudioStore.isPlaying = false;
    }
  }, []);

  const initPlayer = useCallback(
    (host: HTMLDivElement) => {
      if (playerRef.current) return;
      playerRef.current = new window.YT.Player(host, {
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
            playerRef.current?.setVolume(60);
            const muted = playerRef.current?.isMuted?.() ?? false;
            setIsMuted(muted);
            if (!window.__anfaAudioStore) {
              window.__anfaAudioStore = {
                player: playerRef.current,
                ready: true,
                isPlaying: false,
                isMuted: muted,
                initializing: false,
              };
            } else {
              window.__anfaAudioStore.player = playerRef.current;
              window.__anfaAudioStore.ready = true;
              window.__anfaAudioStore.isMuted = muted;
              window.__anfaAudioStore.initializing = false;
            }
            if (!autoplayAttempted) {
              setAutoplayAttempted(true);
              setTimeout(() => {
                playerRef.current?.playVideo();
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
      playerRef.current = store.player;
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

  const togglePlayback = () => {
    if (!ready || !playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      if (window.__anfaAudioStore) window.__anfaAudioStore.isPlaying = false;
    } else {
      playerRef.current.playVideo();
      if (window.__anfaAudioStore) window.__anfaAudioStore.isPlaying = true;
    }
  };

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
        <button
          type="button"
          onClick={togglePlayback}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--primary)] text-white"
          disabled={!ready}
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
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
