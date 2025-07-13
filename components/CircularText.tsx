'use client';

import { useEffect, useRef } from 'react';

interface CircularTextProps {
  text: string;
  size?: number;
  color?: string;
  className?: string;
}

export default function CircularText({
  text,
  size = 300,
  color = '#1a260e',
  className = '',
}: CircularTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const canvasSize = size;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    
    // Text settings
    ctx.fillStyle = color;
    ctx.font = `${canvasSize / 12}px 'Playfair Display', serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Calculate radius for text placement
    const radius = canvasSize * 0.4;
    
    // Draw text in a circle
    const textArray = text.split('');
    const totalAngle = Math.PI * 2; // Full circle
    const anglePerChar = totalAngle / textArray.length;
    
    // Start at the top (negative Math.PI/2) and go clockwise
    let startAngle = -Math.PI / 2;
    
    textArray.forEach((char, i) => {
      const angle = startAngle + i * anglePerChar;
      
      // Position for this character
      const x = canvasSize / 2 + Math.cos(angle) * radius;
      const y = canvasSize / 2 + Math.sin(angle) * radius;
      
      // Save context before rotation
      ctx.save();
      
      // Translate to the position
      ctx.translate(x, y);
      
      // Rotate text
      ctx.rotate(angle + Math.PI / 2); // Add 90° to align text correctly
      
      // Draw the character
      ctx.fillText(char, 0, 0);
      
      // Restore context
      ctx.restore();
    });
    
    // Add a dot or small image in the middle (optional)
    ctx.beginPath();
    ctx.arc(canvasSize / 2, canvasSize / 2, 4, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    
  }, [text, size, color]);
  
  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
    </div>
  );
} 