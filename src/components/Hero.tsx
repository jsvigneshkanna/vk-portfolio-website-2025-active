'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = [
    'Freelancer',
    'Full-stack Developer',
    'Software Engineer',
    'Tech Blogger'
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-between py-16 px-4 md:px-12 max-w-7xl mx-auto gap-8">
      {/* Left side - Profile Image */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-start">
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-slate-700 dark:border-slate-300 shadow-lg">
          <Image
            src="/profile-image.jpg"
            alt="J S Vignesh Kanna"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      
      {/* Right side - Name and animated text */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-white">
          J S Vignesh Kanna
        </h1>
        
        <div className="flex items-center text-xl md:text-2xl font-medium">
          <span className="mr-2">I am</span>
          <span className="text-amber-500 font-bold flex items-center">
            &lt;{' '}
            <span className="mx-2 inline-block min-w-40">
              {roles[currentRole]}
            </span>
            {' '}&gt;
          </span>
        </div>
        
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="px-6 py-2 bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 rounded-md shadow-md hover:shadow-lg transition-all">
            Short bio
          </button>
          <button className="px-6 py-2 bg-slate-700 text-white dark:bg-slate-300 dark:text-slate-900 rounded-md shadow-md hover:shadow-lg transition-all">
            Github bio
          </button>
          <button className="px-6 py-2 bg-slate-600 text-white dark:bg-slate-400 dark:text-slate-900 rounded-md shadow-md hover:shadow-lg transition-all">
            Long bio
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero; 