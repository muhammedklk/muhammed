import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let currentProgress = 0;
    const duration = 450;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      const easeOutRatio = 1 - Math.pow(1 - progressRatio, 3);
      currentProgress = Math.round(85 * easeOutRatio);
      setProgress(currentProgress);

      if (progressRatio < 1) {
        requestAnimationFrame(animate);
      } else {
        // Complete build to 100%
        const finishTime = performance.now();
        const finishAnimate = (now) => {
          const finishElapsed = now - finishTime;
          const ratio = Math.min(finishElapsed / 250, 1);
          const finalVal = Math.round(85 + 15 * ratio);
          setProgress(finalVal);

          if (ratio < 1) {
            requestAnimationFrame(finishAnimate);
          } else {
            setTimeout(() => {
              setLoaded(true);
            }, 180);
          }
        };
        requestAnimationFrame(finishAnimate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  if (loaded) return null;

  return (
    <div id="preloader" className={`site-preloader ${loaded ? 'loaded' : ''}`}>
      <div className="preloader-inner">
        <div className="site-logo preloader-site-logo">
          <span className="logo-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="12" height="12" rx="3.5" stroke="currentColor" strokeWidth="2.5" />
              <rect x="10" y="10" width="12" height="12" rx="3.5" fill="currentColor" />
            </svg>
          </span>
          <span className="logo-text" style={{ fontSize: '28px' }}>
            Muhammed<span className="logo-dot">.</span>
          </span>
        </div>
        <div className="preloader-progress-track">
          <div className="preloader-progress-bar" id="preloader-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="preloader-counter">
          <span id="preloader-number">{progress}</span>%
        </div>
      </div>
    </div>
  );
};

export default Preloader;
