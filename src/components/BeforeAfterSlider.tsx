"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface Props {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  height?: number;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  height = 400,
}: Props) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(
    (clientX: number) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = Math.min(Math.max((x / rect.width) * 100, 0), 100);
      setPosition(pct);
    },
    []
  );

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    updatePosition(e.clientX);
  };

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging) return;
      updatePosition(e.clientX);
    },
    [dragging, updatePosition]
  );

  const onMouseUp = useCallback(() => setDragging(false), []);

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => {
    setDragging(true);
    updatePosition(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  };

  const onTouchEnd = () => setDragging(false);

  // Attach global mouse events
  const containerWithListeners = (node: HTMLDivElement | null) => {
    if (!node) return;
    (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    node.addEventListener("mousemove", onMouseMove as unknown as EventListener);
    node.addEventListener("mouseup", onMouseUp);
    node.addEventListener("mouseleave", onMouseUp);
  };

  return (
    <div
      ref={containerWithListeners}
      style={{
        position: "relative",
        width: "100%",
        height: `${height}px`,
        overflow: "hidden",
        borderRadius: "12px",
        cursor: dragging ? "grabbing" : "col-resize",
        userSelect: "none",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* AFTER IMAGE (full width, bottom layer) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <Image
          src={afterImage}
          alt={afterLabel}
          fill
          style={{ objectFit: "cover" }}
          draggable={false}
        />
      </div>

      {/* BEFORE IMAGE (clipped) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          transition: dragging ? "none" : "clip-path 0.1s",
        }}
      >
        <Image
          src={beforeImage}
          alt={beforeLabel}
          fill
          style={{ objectFit: "cover" }}
          draggable={false}
        />
      </div>

      {/* DIVIDER LINE */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${position}%`,
          transform: "translateX(-50%)",
          width: "2px",
          background: "#00f5c8",
          boxShadow: "0 0 12px rgba(0,245,200,0.6)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      {/* HANDLE */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: `${position}%`,
          transform: "translate(-50%, -50%)",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: "#00f5c8",
          border: "3px solid #fff",
          boxShadow: "0 0 20px rgba(0,245,200,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 11,
          pointerEvents: "none",
          fontSize: "1rem",
          color: "#05070d",
          fontWeight: "700",
        }}
      >
        ⇆
      </div>

      {/* BEFORE LABEL */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          zIndex: 9,
          background: "rgba(5,7,13,0.8)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "50px",
          padding: "0.3rem 0.8rem",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.65rem",
          color: "#eef0f6",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          opacity: position > 15 ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      >
        {beforeLabel}
      </div>

      {/* AFTER LABEL */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          zIndex: 9,
          background: "rgba(0,245,200,0.15)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(0,245,200,0.3)",
          borderRadius: "50px",
          padding: "0.3rem 0.8rem",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.65rem",
          color: "#00f5c8",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          opacity: position < 85 ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      >
        {afterLabel}
      </div>
    </div>
  );
}