'use client';

import React, { useState, useRef, useCallback, PropsWithChildren } from 'react';

interface Props {
  className?: string;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  minSize?: { width: number; height: number };
  maxSize?: { width: number; height: number };
  onPositionChange?: (position: { x: number; y: number }) => void;
  onSizeChange?: (size: { width: number; height: number }) => void;
  draggable?: boolean;
  resizable?: boolean;
}

export const FlowWrapper = ({
  children,
  className = '',
  defaultPosition = { x: 0, y: 0 },
  defaultSize = { width: 300, height: 200 },
  minSize = { width: 100, height: 100 },
  maxSize = { width: 800, height: 600 },
  onPositionChange,
  onSizeChange,
  draggable = true,
  resizable = true,
}: PropsWithChildren<Props>) => {
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const wrapperRef = useRef<HTMLDivElement>(null);

  // 드래그 시작
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!draggable) return;

      setIsDragging(true);
      const rect = wrapperRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
      e.preventDefault();
    },
    [draggable]
  );

  // 리사이즈 시작
  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      if (!resizable) return;

      setIsResizing(true);
      setResizeStart({
        x: e.clientX,
        y: e.clientY,
        width: size.width,
        height: size.height,
      });
      e.preventDefault();
      e.stopPropagation();
    },
    [resizable, size]
  );

  // 마우스 이동 처리
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;

        setPosition({ x: newX, y: newY });
        onPositionChange?.({ x: newX, y: newY });
      }

      if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;

        const newWidth = Math.max(
          minSize.width,
          Math.min(maxSize.width, resizeStart.width + deltaX)
        );
        const newHeight = Math.max(
          minSize.height,
          Math.min(maxSize.height, resizeStart.height + deltaY)
        );

        setSize({ width: newWidth, height: newHeight });
        onSizeChange?.({ width: newWidth, height: newHeight });
      }
    },
    [
      isDragging,
      isResizing,
      dragOffset,
      resizeStart,
      minSize,
      maxSize,
      onPositionChange,
      onSizeChange,
    ]
  );

  // 마우스 업 처리
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  // 이벤트 리스너 등록/해제
  React.useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={wrapperRef}
      className={`flow-wrapper ${className}`}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        border: '2px solid #e2e8f0',
        borderRadius: '8px',
        backgroundColor: 'white',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* 리사이즈 핸들 */}
      {resizable && (
        <div
          className="resize-handle"
          style={{
            position: 'absolute',
            right: '-6px',
            bottom: '-6px',
            width: '12px',
            height: '12px',
            backgroundColor: '#3b82f6',
            borderRadius: '50%',
            cursor: 'nw-resize',
            zIndex: 10,
          }}
          onMouseDown={handleResizeStart}
        />
      )}

      {/* 컨텐츠 영역 */}
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '16px',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
};
