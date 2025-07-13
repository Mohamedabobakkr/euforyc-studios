'use client';

import { useEffect, useRef } from 'react';

export default function MomenceSchedule() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Clean up any existing scripts to prevent conflicts
    const existingScript = document.getElementById('momence-schedule-script');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Create a new script element
    const script = document.createElement('script');
    script.id = 'momence-schedule-script';
    script.async = true;
    script.type = 'module';
    script.setAttribute('host_id', '75303');
    script.setAttribute('teacher_ids', '[]');
    script.setAttribute('location_ids', '[]');
    script.setAttribute('tag_ids', '[]');
    script.setAttribute('default_filter', 'show-all');
    script.setAttribute('locale', 'en');
    script.src = 'https://momence.com/plugin/host-schedule/host-schedule.js';
    
    // Add the script to the container
    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }
    
    return () => {
      // Clean up when component unmounts
      if (existingScript) {
        existingScript.remove();
      }
      if (document.getElementById('momence-schedule-script')) {
        document.getElementById('momence-schedule-script')?.remove();
      }
    };
  }, []);
  
  return (
    <div className="w-full">
      <div id="ribbon-schedule" className="min-h-[600px]" ref={containerRef}></div>
    </div>
  );
} 