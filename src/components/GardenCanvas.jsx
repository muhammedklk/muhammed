import React, { useRef, useEffect } from 'react';

export default function GardenCanvas({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 360;
      }
    };
    window.addEventListener('resize', handleResize);

    // Mouse physics
    let mouse = { x: -1000, y: -1000, vx: 0, vy: 0, lastX: -1000, lastY: -1000 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      mouse.vx = currentX - mouse.lastX;
      mouse.vy = currentY - mouse.lastY;
      mouse.x = currentX;
      mouse.y = currentY;
      mouse.lastX = currentX;
      mouse.lastY = currentY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Create 7 Swaying Botanical Stems
    const stemCount = Math.min(Math.floor(width / 120), 8);
    const stems = [];

    const isDark = theme === 'dark';
    const stemColors = isDark
      ? ['#6C8E74', '#7D9D85', '#8FA896']
      : ['#4A6B53', '#5B7E64', '#3E5C46'];

    const flowerColors = isDark
      ? ['#9B7EF0', '#B99AFF', '#61C0BF', '#AB83A1', '#7C5CE1']
      : ['#7C5CE1', '#9B7EF0', '#2D5A46', '#8C5383', '#6A4CC8'];

    for (let i = 0; i < stemCount; i++) {
      const baseX = (width / (stemCount + 1)) * (i + 1) + (Math.random() * 30 - 15);
      const stemHeight = 180 + Math.random() * 80;
      stems.push({
        baseX: baseX,
        baseY: height - 10,
        tipX: baseX,
        tipY: height - stemHeight,
        targetTipX: baseX,
        height: stemHeight,
        angle: 0,
        angleVelocity: 0,
        color: stemColors[i % stemColors.length],
        flowerColor: flowerColors[i % flowerColors.length],
        flowerRadius: 18 + Math.random() * 12,
        petalCount: 5 + Math.floor(Math.random() * 3),
        rotation: Math.random() * Math.PI * 2,
      });
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw ground line
      ctx.beginPath();
      ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
      ctx.lineWidth = 1.5;
      ctx.moveTo(0, height - 10);
      ctx.lineTo(width, height - 10);
      ctx.stroke();

      stems.forEach((stem) => {
        // Calculate distance from mouse to tip
        const dx = mouse.x - stem.tipX;
        const dy = mouse.y - stem.tipY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Physics bend when mouse is near
        if (dist < 140) {
          const force = (1 - dist / 140) * 1.8;
          const pushX = (mouse.vx || (dx < 0 ? -1 : 1)) * force * 0.4;
          stem.angleVelocity += pushX * 0.05;
        }

        // Spring physics return to vertical
        const spring = -0.04 * stem.angle;
        const damping = 0.92;
        stem.angleVelocity += spring;
        stem.angleVelocity *= damping;
        stem.angle += stem.angleVelocity;

        // Curve tip coordinates
        const curTipX = stem.baseX + Math.sin(stem.angle) * stem.height * 0.8;
        const curTipY = stem.baseY - Math.cos(stem.angle) * stem.height;
        stem.tipX = curTipX;
        stem.tipY = curTipY;

        // Control point for smooth bezier stem bend
        const ctrlX = stem.baseX + Math.sin(stem.angle * 0.5) * stem.height * 0.4;
        const ctrlY = stem.baseY - stem.height * 0.5;

        // Draw Stem
        ctx.beginPath();
        ctx.moveTo(stem.baseX, stem.baseY);
        ctx.quadraticCurveTo(ctrlX, ctrlY, stem.tipX, stem.tipY);
        ctx.strokeStyle = stem.color;
        ctx.lineWidth = 3.5;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Draw Leaves
        const midX = (stem.baseX + stem.tipX) / 2;
        const midY = (stem.baseY + stem.tipY) / 2;
        ctx.save();
        ctx.translate(midX, midY);
        ctx.rotate(stem.angle + 0.4);
        ctx.beginPath();
        ctx.ellipse(12, 0, 14, 5, 0, 0, Math.PI * 2);
        ctx.fillStyle = stem.color;
        ctx.fill();
        ctx.restore();

        // Draw Flower Head
        ctx.save();
        ctx.translate(stem.tipX, stem.tipY);
        stem.rotation += 0.005 + Math.abs(stem.angleVelocity) * 0.05;
        ctx.rotate(stem.rotation);

        // Draw Petals
        for (let p = 0; p < stem.petalCount; p++) {
          const pAngle = (p * Math.PI * 2) / stem.petalCount;
          const px = Math.cos(pAngle) * stem.flowerRadius * 0.8;
          const py = Math.sin(pAngle) * stem.flowerRadius * 0.8;
          ctx.beginPath();
          ctx.arc(px, py, stem.flowerRadius * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = stem.flowerColor;
          ctx.globalAlpha = 0.88;
          ctx.fill();
        }

        // Center Pistil
        ctx.beginPath();
        ctx.arc(0, 0, stem.flowerRadius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#FFF8E7' : '#2A2927';
        ctx.globalAlpha = 1;
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [theme]);

  return (
    <div className="garden-canvas-container">
      <canvas ref={canvasRef} className="garden-canvas" />
      <div className="garden-hint font-sans text-muted-custom">
        <span>✦ Hover your pointer across the garden to watch the flowers bend.</span>
      </div>

      <style>{`
        .garden-canvas-container {
          position: relative;
          width: 100%;
          height: 360px;
          margin-top: 1.5rem;
          margin-bottom: 2rem;
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        .garden-canvas {
          display: block;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        .garden-hint {
          position: absolute;
          bottom: 1rem;
          left: 1.25rem;
          right: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.82rem;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
