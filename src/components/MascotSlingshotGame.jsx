import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, Award, Target, HelpCircle } from 'lucide-react';

export default function MascotSlingshotGame({ theme }) {
  const canvasRef = useRef(null);
  const [shotsLeft, setShotsLeft] = useState(3);
  const [score, setScore] = useState(0);
  const [selectedMascot, setSelectedMascot] = useState('Claude');
  const [gameState, setGameState] = useState('aiming'); // aiming, flying, won, lost
  const [showInstructions, setShowInstructions] = useState(false);

  const isDark = theme === 'dark';

  // Game Physics State
  const gameRef = useRef({
    slingshotPos: { x: 140, y: 220 },
    dragPos: { x: 140, y: 220 },
    isDragging: false,
    mascot: { x: 140, y: 220, vx: 0, vy: 0, radius: 18, active: false },
    targets: [
      { id: 1, x: 520, y: 200, width: 28, height: 50, hit: false, color: '#EF4444', label: 'Problem' },
      { id: 2, x: 620, y: 170, width: 28, height: 80, hit: false, color: '#8B5CF6', label: 'Friction' },
      { id: 3, x: 720, y: 210, width: 28, height: 40, hit: false, color: '#10B981', label: 'Bug' },
    ],
  });

  const resetGame = () => {
    setShotsLeft(3);
    setScore(0);
    setGameState('aiming');
    gameRef.current.targets.forEach((t) => (t.hit = false));
    resetMascot();
  };

  const resetMascot = () => {
    gameRef.current.dragPos = { x: 140, y: 220 };
    gameRef.current.mascot = { x: 140, y: 220, vx: 0, vy: 0, radius: 18, active: false };
    gameRef.current.isDragging = false;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = 320);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 320;
      }
    };
    window.addEventListener('resize', handleResize);

    const slingshot = gameRef.current.slingshotPos;

    // Canvas Mouse handlers
    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseDown = (e) => {
      if (shotsLeft <= 0 || gameRef.current.mascot.active) return;
      const pos = getPos(e);
      const dx = pos.x - slingshot.x;
      const dy = pos.y - slingshot.y;
      if (Math.sqrt(dx * dx + dy * dy) < 45) {
        gameRef.current.isDragging = true;
        gameRef.current.dragPos = pos;
      }
    };

    const handleMouseMove = (e) => {
      if (!gameRef.current.isDragging) return;
      const pos = getPos(e);
      // Limit pull distance
      const dx = pos.x - slingshot.x;
      const dy = pos.y - slingshot.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxPull = 90;
      if (dist > maxPull) {
        const angle = Math.atan2(dy, dx);
        gameRef.current.dragPos = {
          x: slingshot.x + Math.cos(angle) * maxPull,
          y: slingshot.y + Math.sin(angle) * maxPull,
        };
      } else {
        gameRef.current.dragPos = pos;
      }
    };

    const handleMouseUp = () => {
      if (!gameRef.current.isDragging) return;
      gameRef.current.isDragging = false;

      // Launch physics
      const drag = gameRef.current.dragPos;
      const dx = slingshot.x - drag.x;
      const dy = slingshot.y - drag.y;

      if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
        const power = 0.18;
        gameRef.current.mascot = {
          x: slingshot.x,
          y: slingshot.y,
          vx: dx * power,
          vy: dy * power,
          radius: 18,
          active: true,
        };
        setShotsLeft((prev) => prev - 1);
        setGameState('flying');
      } else {
        resetMascot();
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Ground
      const groundY = 250;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(width, groundY);
      ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Slingshot Base & Post
      ctx.beginPath();
      ctx.moveTo(slingshot.x, groundY);
      ctx.lineTo(slingshot.x, slingshot.y);
      ctx.strokeStyle = isDark ? '#A6A3B3' : '#585650';
      ctx.lineWidth = 6;
      ctx.stroke();

      // Draw Slingshot Bands if dragging
      if (gameRef.current.isDragging) {
        const drag = gameRef.current.dragPos;
        ctx.beginPath();
        ctx.moveTo(slingshot.x - 10, slingshot.y - 10);
        ctx.lineTo(drag.x, drag.y);
        ctx.lineTo(slingshot.x + 10, slingshot.y - 10);
        ctx.strokeStyle = '#7C5CE1';
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      // Update & Draw Mascot Ball
      const m = gameRef.current.mascot;
      if (m.active) {
        // Physics update
        m.x += m.vx;
        m.y += m.vy;
        m.vy += 0.35; // Gravity

        // Check ground collision
        if (m.y + m.radius >= groundY) {
          m.y = groundY - m.radius;
          m.vx *= 0.6;
          m.vy = -m.vy * 0.4;
          if (Math.abs(m.vx) < 0.2 && Math.abs(m.vy) < 0.2) {
            m.active = false;
            setTimeout(() => resetMascot(), 500);
          }
        }

        // Check target collision
        gameRef.current.targets.forEach((t) => {
          if (!t.hit) {
            const tx = t.x;
            const ty = groundY - t.height;
            if (
              m.x + m.radius > tx &&
              m.x - m.radius < tx + t.width &&
              m.y + m.radius > ty &&
              m.y - m.radius < groundY
            ) {
              t.hit = true;
              setScore((prev) => prev + 100);
            }
          }
        });
      }

      // Draw Slingshot Mascot (dragged or flying)
      const curX = m.active ? m.x : gameRef.current.dragPos.x;
      const curY = m.active ? m.y : gameRef.current.dragPos.y;

      ctx.save();
      ctx.translate(curX, curY);
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.fillStyle = selectedMascot === 'Claude' ? '#7C5CE1' : selectedMascot === 'ChatGPT' ? '#10B981' : '#6366F1';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();

      // Mascot Face/Label
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedMascot[0], 0, 0);
      ctx.restore();

      // Draw Targets (Standees)
      let activeTargetsCount = 0;
      gameRef.current.targets.forEach((t) => {
        if (!t.hit) activeTargetsCount++;
        const ty = groundY - t.height;
        ctx.save();
        ctx.translate(t.x, ty);

        if (t.hit) {
          ctx.rotate(Math.PI / 2);
          ctx.globalAlpha = 0.4;
        }

        ctx.fillStyle = t.color;
        ctx.fillRect(0, 0, t.width, t.height);

        ctx.strokeStyle = isDark ? '#FFFFFF' : '#000000';
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, t.width, t.height);

        // Label
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(t.label, t.width / 2, t.height / 2);

        ctx.restore();
      });

      // Win / Loss Condition
      if (activeTargetsCount === 0 && gameState !== 'won') {
        setGameState('won');
      } else if (shotsLeft === 0 && !m.active && activeTargetsCount > 0 && gameState !== 'lost') {
        setGameState('lost');
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [selectedMascot, shotsLeft, gameState, isDark]);

  return (
    <div className="slingshot-game-card card-portfolio">
      <div className="game-header-row">
        <div>
          <div className="badge-pill mb-2">
            <Target size={14} className="text-accent" />
            <span>Interactive Mini-Game</span>
          </div>
          <h3 className="heading-section mb-1 font-serif">Pace the Frontier</h3>
          <p className="text-muted-custom mb-0 font-sans text-sm">
            Drag the mascot backward in the slingshot and release to knock down design friction!
          </p>
        </div>

        <div className="game-controls">
          <div className="score-badge font-mono">
            <Award size={16} />
            <span>Score: {score}</span>
          </div>

          <div className="shots-badge font-mono">
            <span>Shots: {shotsLeft}/3</span>
          </div>

          <button onClick={resetGame} className="btn-secondary-custom p-2" title="Reset Game">
            <RotateCcw size={16} />
          </button>

          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="btn-secondary-custom p-2"
            title="How to Play"
          >
            <HelpCircle size={16} />
          </button>
        </div>
      </div>

      {showInstructions && (
        <div className="game-instructions-box animate-fade-in my-3">
          <p className="mb-1 text-sm font-bold">How to score & play:</p>
          <p className="mb-0 text-xs text-muted-custom">
            1. Select a mascot below (Claude, ChatGPT, or Grokbot).<br />
            2. Click and drag the mascot backward from the slingshot post, then release to launch.<br />
            3. Topple all 3 standees (Problem, Friction, Bug) to win! You have 3 shots.
          </p>
        </div>
      )}

      {/* Mascot Selector */}
      <div className="mascot-selector-row my-2">
        <span className="text-xs text-muted-custom font-sans">Choose Mascot:</span>
        {['Claude', 'ChatGPT', 'Grokbot'].map((mascot) => (
          <button
            key={mascot}
            onClick={() => {
              setSelectedMascot(mascot);
              resetMascot();
            }}
            className={`mascot-btn ${selectedMascot === mascot ? 'active' : ''}`}
          >
            {mascot}
          </button>
        ))}
      </div>

      {/* Game Canvas */}
      <div className="canvas-wrapper">
        <canvas ref={canvasRef} className="game-canvas" />

        {gameState === 'won' && (
          <div className="game-overlay animate-fade-in">
            <h4 className="font-serif heading-section mb-2 text-accent">🎉 Victory! All Friction Cleared!</h4>
            <p className="text-sm mb-3">You cleared all 3 targets with a score of {score}.</p>
            <button onClick={resetGame} className="btn-primary-custom">
              Play Again
            </button>
          </div>
        )}

        {gameState === 'lost' && (
          <div className="game-overlay animate-fade-in">
            <h4 className="font-serif heading-section mb-2">Out of Shots!</h4>
            <p className="text-sm mb-3">Keep going! Try another trajectory.</p>
            <button onClick={resetGame} className="btn-primary-custom">
              Retry Game
            </button>
          </div>
        )}
      </div>

      <style>{`
        .slingshot-game-card {
          margin-top: 3rem;
          margin-bottom: 3rem;
        }

        .game-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .game-controls {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .score-badge, .shots-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.8rem;
          background-color: var(--bg-body);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-pill);
          font-size: 0.85rem;
          font-weight: 500;
        }

        .game-instructions-box {
          background-color: var(--bg-body);
          border: 1px dashed var(--border-strong);
          border-radius: var(--radius-md);
          padding: 0.85rem 1.1rem;
        }

        .mascot-selector-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .mascot-btn {
          padding: 0.3rem 0.75rem;
          font-size: 0.8rem;
          border-radius: var(--radius-pill);
          background-color: var(--bg-body);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .mascot-btn.active {
          background-color: var(--text-primary);
          color: var(--bg-body);
          border-color: var(--text-primary);
        }

        .canvas-wrapper {
          position: relative;
          width: 100%;
          height: 320px;
          background-color: var(--bg-body-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
          overflow: hidden;
        }

        .game-canvas {
          width: 100%;
          height: 100%;
          cursor: crosshair;
        }

        .game-overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(6px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          text-align: center;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
}
