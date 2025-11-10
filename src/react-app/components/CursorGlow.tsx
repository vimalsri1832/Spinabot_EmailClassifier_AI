import { useEffect } from 'react';

export default function CursorGlow() {
  // Cursor glow disabled - using default cursor
  return null;
  
  /* eslint-disable @typescript-eslint/no-unused-vars */
  useEffect(() => {
    // Remove any existing cursors first
    const existingCursor = document.getElementById('custom-cursor');
    const existingGlow = document.getElementById('cursor-glow');
    if (existingCursor) existingCursor.remove();
    if (existingGlow) existingGlow.remove();

    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.style.willChange = 'transform';
    cursor.style.pointerEvents = 'none';
    document.body.appendChild(cursor);

    const cursorGlow = document.createElement('div');
    cursorGlow.id = 'cursor-glow';
    cursorGlow.style.willChange = 'transform';
    cursorGlow.style.pointerEvents = 'none';
    document.body.appendChild(cursorGlow);

    let rafId: number;

    const moveCursor = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.opacity = '1';
        
        cursorGlow.style.left = (e.clientX - 175) + 'px';
        cursorGlow.style.top = (e.clientY - 175) + 'px';
        cursorGlow.style.opacity = '1';
      });
    };

    const handleMouseDown = () => {
      cursor.classList.add('clicking');
    };

    const handleMouseUp = () => {
      cursor.classList.remove('clicking');
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a') || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        cursor.classList.add('hovering');
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a') || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        cursor.classList.remove('hovering');
      }
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      cursor.remove();
      cursorGlow.remove();
    };
  }, []);

  return null;
}
