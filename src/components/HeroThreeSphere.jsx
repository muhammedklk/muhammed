import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * HeroThreeSphere Component — Sleek Ultra-Thin Apple MacBook Pro
 * 
 * Features:
 * 1. User's authentic 3D image (/assets/muhammedk-3d-original-cutout.png) heroically centered.
 * 2. 100% Clean Screen: ZERO text, no bars, no titles. Only the user's 3D avatar with ambient violet halo (#7C5CE1).
 * 3. Normalized UV PlaneGeometry for razor-sharp, zero-fail texture rendering.
 * 4. Lowered position with comfortable clearance below top navbar and clear spacing from left headline.
 * 5. Ultra-thin Apple MacBook Pro unibody in Silver/Titanium aluminum with backlit keyboard and trackpad.
 * 6. Interactive 3D mouse parallax tilt & touch/drag momentum inertia.
 */
export default function HeroThreeSphere() {
  const mountRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Helper for rounded rectangle 2D shapes
    const createRoundedRectShape = (w, h, r) => {
      const shape = new THREE.Shape();
      const x = -w / 2;
      const y = -h / 2;
      shape.moveTo(x + r, y);
      shape.lineTo(x + w - r, y);
      shape.quadraticCurveTo(x + w, y, x + w, y + r);
      shape.lineTo(x + w, y + h - r);
      shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      shape.lineTo(x + r, y + h);
      shape.quadraticCurveTo(x, y + h, x, y + h - r);
      shape.lineTo(x, y + r);
      shape.quadraticCurveTo(x, y, x + r, y);
      return shape;
    };

    // Scene & Camera
    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    // Ergonomic camera height to view lowered laptop comfortably
    camera.position.set(0, 0.18, 5.7);

    // High performance WebGL renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // ============================================================
    // STUDIO LIGHTING SETUP
    // ============================================================
    const ambientLight = new THREE.AmbientLight(0xfcfbff, 1.4);
    scene.add(ambientLight);

    // Key Light (Pure White Top-Right)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(4.0, 5.5, 4.2);
    scene.add(keyLight);

    // Soft Lavender Fill Light (Front-Left)
    const fillLight = new THREE.DirectionalLight(0xeee8fa, 1.3);
    fillLight.position.set(-4.0, -1.8, 3.0);
    scene.add(fillLight);

    // Signature Brand Violet Rim Light (#7C5CE1)
    const rimLight = new THREE.DirectionalLight(0x7c5ce1, 3.6);
    rimLight.position.set(-2.8, 3.8, -3.8);
    scene.add(rimLight);

    // Ambient back-glow behind laptop screen
    const screenBackLight = new THREE.PointLight(0xb99aff, 2.2, 5, 1.6);
    screenBackLight.position.set(0, 0.8, -0.6);
    scene.add(screenBackLight);

    // ============================================================
    // MASTER LAPTOP ASSEMBLY GROUP (LOWERED POSITION)
    // ============================================================
    const laptopGroup = new THREE.Group();
    // Compact scale, right-aligned, and lowered down
    laptopGroup.scale.set(0.48, 0.48, 0.48);
    laptopGroup.position.set(0.54, -0.16, 0);
    // Perspective tilt showing keyboard deck and screen facing headline
    laptopGroup.rotation.x = 0.20;
    laptopGroup.rotation.y = -0.28;
    scene.add(laptopGroup);

    // Apple Silver / Titanium Aluminum Material
    const appleSilverMat = new THREE.MeshPhysicalMaterial({
      color: 0xe6e8ed,
      metalness: 0.88,
      roughness: 0.20,
      clearcoat: 0.35,
      clearcoatRoughness: 0.12,
      reflectivity: 0.85
    });

    const keyboardWellMat = new THREE.MeshStandardMaterial({
      color: 0x111317,
      metalness: 0.4,
      roughness: 0.65
    });

    const trackpadMat = new THREE.MeshPhysicalMaterial({
      color: 0xdde0e6,
      metalness: 0.72,
      roughness: 0.24,
      clearcoat: 0.25
    });

    // ============================================================
    // 1. SLEEK ROUNDED BASE CHASSIS (Ultra-Thin Unibody)
    // ============================================================
    const baseW = 2.82;
    const baseD = 1.92;
    const baseR = 0.08;
    const baseThickness = 0.055;

    const baseShape = createRoundedRectShape(baseW, baseD, baseR);
    const baseExtrudeSettings = {
      depth: baseThickness,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.016,
      bevelThickness: 0.016
    };

    const baseGeo = new THREE.ExtrudeGeometry(baseShape, baseExtrudeSettings);
    baseGeo.center();
    const baseMesh = new THREE.Mesh(baseGeo, appleSilverMat);
    // Rotate so top face (+Z in 2D) points upward (+Y in 3D)
    baseMesh.rotation.x = -Math.PI / 2;
    baseMesh.position.set(0, 0, 0);
    laptopGroup.add(baseMesh);

    // Recessed Black Keyboard Well (Rounded)
    const kbWellShape = createRoundedRectShape(2.36, 1.02, 0.04);
    const kbWellGeo = new THREE.ExtrudeGeometry(kbWellShape, {
      depth: 0.008,
      bevelEnabled: false
    });
    kbWellGeo.center();
    const kbWellMesh = new THREE.Mesh(kbWellGeo, keyboardWellMat);
    kbWellMesh.rotation.x = -Math.PI / 2;
    kbWellMesh.position.set(0, baseThickness / 2 + 0.002, -0.18);
    laptopGroup.add(kbWellMesh);

    // Keyboard Key Grid Texture
    const kbCanvas = document.createElement('canvas');
    kbCanvas.width = 512;
    kbCanvas.height = 256;
    const kbCtx = kbCanvas.getContext('2d');
    kbCtx.fillStyle = '#111317';
    kbCtx.fillRect(0, 0, 512, 256);

    const rows = 5;
    const cols = 14;
    const keyW = 32;
    const keyH = 38;
    const gap = 4;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = 12 + c * (keyW + gap);
        const y = 14 + r * (keyH + gap);
        kbCtx.fillStyle = '#1C1E24';
        kbCtx.beginPath();
        kbCtx.roundRect(x, y, keyW, keyH, 4);
        kbCtx.fill();
        kbCtx.strokeStyle = 'rgba(255,255,255,0.08)';
        kbCtx.stroke();
      }
    }
    // Spacebar
    kbCtx.fillStyle = '#1C1E24';
    kbCtx.beginPath();
    kbCtx.roundRect(140, 204, 210, 36, 4);
    kbCtx.fill();

    const kbTexture = new THREE.CanvasTexture(kbCanvas);
    const kbPlaneGeo = new THREE.PlaneGeometry(2.32, 0.98);
    const kbPlaneMat = new THREE.MeshBasicMaterial({ map: kbTexture });
    const kbPlaneMesh = new THREE.Mesh(kbPlaneGeo, kbPlaneMat);
    kbPlaneMesh.rotation.x = -Math.PI / 2;
    kbPlaneMesh.position.set(0, baseThickness / 2 + 0.006, -0.18);
    laptopGroup.add(kbPlaneMesh);

    // Force Touch Trackpad (Rounded & Flush)
    const trackpadShape = createRoundedRectShape(0.96, 0.62, 0.03);
    const trackpadGeo = new THREE.ExtrudeGeometry(trackpadShape, {
      depth: 0.004,
      bevelEnabled: false
    });
    trackpadGeo.center();
    const trackpadMesh = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpadMesh.rotation.x = -Math.PI / 2;
    trackpadMesh.position.set(0, baseThickness / 2 + 0.002, 0.52);
    laptopGroup.add(trackpadMesh);

    // Front Thumb Scoop Notch
    const notchGeo = new THREE.BoxGeometry(0.36, 0.02, 0.03);
    const notchMat = new THREE.MeshBasicMaterial({ color: 0x92949c });
    const notchMesh = new THREE.Mesh(notchGeo, notchMat);
    notchMesh.position.set(0, baseThickness / 2, baseD / 2);
    laptopGroup.add(notchMesh);

    // ============================================================
    // 2. ULTRA-SLIM DISPLAY LID (Apple Style)
    // ============================================================
    const lidGroup = new THREE.Group();
    // Hinge positioned at the back edge of the base chassis
    lidGroup.position.set(0, baseThickness / 2, -baseD / 2 + 0.02);
    // Open lid at ~106 degrees relative to base
    lidGroup.rotation.x = -0.28;
    laptopGroup.add(lidGroup);

    // Cylindrical Hinge
    const hingeGeo = new THREE.CylinderGeometry(0.025, 0.025, 2.3, 32);
    const hingeMat = new THREE.MeshPhysicalMaterial({
      color: 0x22242a,
      metalness: 0.82,
      roughness: 0.22
    });
    const hingeMesh = new THREE.Mesh(hingeGeo, hingeMat);
    hingeMesh.rotation.z = Math.PI / 2;
    hingeMesh.position.set(0, 0, 0);
    lidGroup.add(hingeMesh);

    const lidW = baseW;
    const lidH = 1.86;
    const lidR = 0.08;
    const lidThickness = 0.035;

    // Back metal lid shell
    const lidShape = createRoundedRectShape(lidW, lidH, lidR);
    const lidExtrudeSettings = {
      depth: lidThickness,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.014,
      bevelThickness: 0.014
    };

    const lidGeo = new THREE.ExtrudeGeometry(lidShape, lidExtrudeSettings);
    lidGeo.center();
    const lidMesh = new THREE.Mesh(lidGeo, appleSilverMat);
    lidMesh.position.set(0, lidH / 2, -lidThickness / 2);
    lidGroup.add(lidMesh);

    // Slim Black Glass Display Bezel
    const bezelGeo = new THREE.PlaneGeometry(lidW - 0.06, lidH - 0.06);
    const bezelMat = new THREE.MeshBasicMaterial({ color: 0x08090c });
    const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
    bezelMesh.position.set(0, lidH / 2, 0.002);
    lidGroup.add(bezelMesh);

    // Top Camera Notch
    const notchCamGeo = new THREE.BoxGeometry(0.18, 0.036, 0.005);
    const notchCamMat = new THREE.MeshBasicMaterial({ color: 0x040507 });
    const notchCamMesh = new THREE.Mesh(notchCamGeo, notchCamMat);
    notchCamMesh.position.set(0, lidH - 0.045, 0.006);
    lidGroup.add(notchCamMesh);

    // ============================================================
    // 3. RETINA SCREEN (USER'S EXACT 3D AVATAR — ZERO TEXT)
    // ============================================================
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 1200;
    screenCanvas.height = 780;
    const sCtx = screenCanvas.getContext('2d');
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.generateMipmaps = true;
    screenTexture.minFilter = THREE.LinearMipmapLinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;

    const drawCleanScreen = (imgToDraw) => {
      const w = 1200;
      const h = 780;

      // Dark luxury studio glass backdrop
      const bgGrad = sCtx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, '#090B12');
      bgGrad.addColorStop(0.5, '#121526');
      bgGrad.addColorStop(1, '#07080E');
      sCtx.fillStyle = bgGrad;
      sCtx.fillRect(0, 0, w, h);

      // Centered Radiant Brand Violet Halo (#7C5CE1) behind 3D Avatar
      const glowGrad = sCtx.createRadialGradient(w / 2, h / 2 - 20, 40, w / 2, h / 2 - 20, 480);
      glowGrad.addColorStop(0, 'rgba(124, 92, 225, 0.52)');
      glowGrad.addColorStop(0.38, 'rgba(175, 145, 255, 0.22)');
      glowGrad.addColorStop(0.72, 'rgba(124, 92, 225, 0.05)');
      glowGrad.addColorStop(1, 'transparent');
      sCtx.fillStyle = glowGrad;
      sCtx.fillRect(0, 0, w, h);

      // Subtle architectural studio horizon line
      sCtx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      sCtx.lineWidth = 1;
      sCtx.beginPath();
      sCtx.moveTo(0, h * 0.74);
      sCtx.lineTo(w, h * 0.74);
      sCtx.stroke();

      // Render User's 3D Avatar prominently centered with ZERO text
      if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
        sCtx.save();
        sCtx.shadowColor = 'rgba(0, 0, 0, 0.65)';
        sCtx.shadowBlur = 45;
        sCtx.shadowOffsetY = 20;

        // Scale and center the 3D character heroically
        const aspect = imgToDraw.naturalWidth / imgToDraw.naturalHeight;
        const targetH = 730;
        const targetW = targetH * aspect;
        const targetX = (w - targetW) / 2;
        const targetY = h - targetH + 15;

        sCtx.drawImage(imgToDraw, targetX, targetY, targetW, targetH);
        sCtx.restore();

        // Soft studio ground fade at bottom edge of screen
        const bottomFade = sCtx.createLinearGradient(0, h - 80, 0, h);
        bottomFade.addColorStop(0, 'rgba(9, 11, 18, 0)');
        bottomFade.addColorStop(1, 'rgba(7, 8, 14, 0.96)');
        sCtx.fillStyle = bottomFade;
        sCtx.fillRect(0, h - 80, w, 80);
      }

      // Delicate diagonal glass sheen across Retina display
      const sheenGrad = sCtx.createLinearGradient(0, 0, w, h);
      sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0.06)');
      sheenGrad.addColorStop(0.40, 'rgba(255, 255, 255, 0.015)');
      sheenGrad.addColorStop(0.45, 'rgba(255, 255, 255, 0)');
      sheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      sCtx.fillStyle = sheenGrad;
      sCtx.fillRect(0, 0, w, h);

      screenTexture.needsUpdate = true;
    };

    // Load the user's authentic 3D image (prefer clean cutout PNG, fallback to original JPG)
    const user3DImg = new Image();
    user3DImg.crossOrigin = 'anonymous';
    user3DImg.onload = () => {
      drawCleanScreen(user3DImg);
    };
    user3DImg.onerror = () => {
      const fallbackImg = new Image();
      fallbackImg.crossOrigin = 'anonymous';
      fallbackImg.onload = () => drawCleanScreen(fallbackImg);
      fallbackImg.src = '/assets/muhammedk-3d-original.jpg';
    };
    user3DImg.src = '/assets/muhammedk-3d-original-cutout.png';

    // Immediate initial draw of the brand halo
    drawCleanScreen(null);

    // Screen PlaneGeometry ensures normalized [0, 1] UVs
    const screenW = lidW - 0.16;
    const screenH = lidH - 0.16;
    const screenGeo = new THREE.PlaneGeometry(screenW, screenH);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false // Keeps colors ultra-rich and true to life
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, lidH / 2 - 0.01, 0.005);
    lidGroup.add(screenMesh);

    // ============================================================
    // 4. ANCHORED STUDIO FLOOR CONTACT SHADOW (LOWERED)
    // ============================================================
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shCtx = shadowCanvas.getContext('2d');
    const shGrad = shCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
    shGrad.addColorStop(0, 'rgba(25, 18, 38, 0.42)');
    shGrad.addColorStop(0.3, 'rgba(50, 40, 70, 0.16)');
    shGrad.addColorStop(0.65, 'rgba(124, 92, 225, 0.035)');
    shGrad.addColorStop(1, 'rgba(246, 246, 248, 0)');
    shCtx.fillStyle = shGrad;
    shCtx.fillRect(0, 0, 256, 256);
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);

    const shadowGeo = new THREE.PlaneGeometry(3.6, 2.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    // Lowered shadow directly under the lowered laptop base
    shadowMesh.position.set(0.54, -0.92, 0);
    scene.add(shadowMesh);

    // ============================================================
    // 5. INTERACTIVE CURSOR & TOUCH PHYSICS
    // ============================================================
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let targetRotationX = 0.20;
    let targetRotationY = -0.28;
    let mouseNormX = 0;
    let mouseNormY = 0;

    const domElement = renderer.domElement;
    domElement.style.touchAction = 'none';

    const onWindowMouseMove = (e) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      mouseNormX = (e.clientX / w - 0.5) * 2;
      mouseNormY = (e.clientY / h - 0.5) * 2;
    };

    const onPointerDown = (e) => {
      isDragging = true;
      setIsInteracting(true);
      try {
        domElement.setPointerCapture(e.pointerId);
      } catch (err) {}
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      velocityX = 0;
      velocityY = 0;
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevPointerX;
      const deltaY = e.clientY - prevPointerY;

      velocityX = deltaX * 0.009;
      velocityY = deltaY * 0.009;

      targetRotationY += velocityX;
      targetRotationX += velocityY;

      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const onPointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      setIsInteracting(false);
      try {
        domElement.releasePointerCapture(e.pointerId);
      } catch (err) {}
    };

    window.addEventListener('pointermove', onWindowMouseMove, { passive: true });
    domElement.addEventListener('pointerdown', onPointerDown);
    domElement.addEventListener('pointermove', onPointerMove);
    domElement.addEventListener('pointerup', onPointerUp);
    domElement.addEventListener('pointercancel', onPointerUp);

    // Responsive Canvas Resize & Auto Positioning
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;

      if (w < 480) {
        camera.position.set(0, 0.12, 6.4);
        laptopGroup.scale.set(0.38, 0.38, 0.38);
        laptopGroup.position.set(0, -0.10, 0);
        shadowMesh.position.set(0, -0.92, 0);
        shadowMesh.scale.set(0.7, 0.7, 0.7);
      } else if (w < 768) {
        camera.position.set(0, 0.14, 6.0);
        laptopGroup.scale.set(0.42, 0.42, 0.42);
        laptopGroup.position.set(0.18, -0.12, 0);
        shadowMesh.position.set(0.18, -0.92, 0);
        shadowMesh.scale.set(0.85, 0.85, 0.85);
      } else if (w < 1200) {
        camera.position.set(0, 0.16, 5.8);
        laptopGroup.scale.set(0.45, 0.45, 0.45);
        laptopGroup.position.set(0.46, -0.14, 0);
        shadowMesh.position.set(0.46, -0.92, 0);
        shadowMesh.scale.set(0.92, 0.92, 0.92);
      } else {
        camera.position.set(0, 0.18, 5.7);
        laptopGroup.scale.set(0.48, 0.48, 0.48);
        laptopGroup.position.set(0.54, -0.16, 0);
        shadowMesh.position.set(0.54, -0.92, 0);
        shadowMesh.scale.set(1.0, 1.0, 1.0);
      }

      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // ============================================================
    // 6. ANIMATION LOOP (Float & Parallax Physics)
    // ============================================================
    let animationFrameId = null;
    let isVisibleOnScreen = true;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisibleOnScreen) {
        animationFrameId = null;
        return;
      }
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Inertia decay
      if (!isDragging) {
        velocityX *= 0.94;
        velocityY *= 0.94;

        targetRotationY += velocityX;
        targetRotationX += velocityY;

        // Gentle resting bounce back towards base angle if rotated too far
        targetRotationX += (0.20 - targetRotationX) * 0.008;
        targetRotationY += (-0.28 - targetRotationY) * 0.008;
      }

      // Parallax mouse tilt
      const parallaxTiltX = mouseNormY * 0.12;
      const parallaxTiltY = mouseNormX * 0.15;

      laptopGroup.rotation.y += (targetRotationY + parallaxTiltY - laptopGroup.rotation.y) * 0.08;
      laptopGroup.rotation.x += (targetRotationX + parallaxTiltX - laptopGroup.rotation.x) * 0.08;

      // Gentle vertical floating motion (around lowered y: -0.16)
      if (!prefersReducedMotion) {
        const floatY = Math.sin(elapsedTime * 1.3) * 0.045;
        laptopGroup.position.y = -0.16 + floatY;

        // Shadow reacts to height
        const shadowScale = 1 - floatY * 0.25;
        shadowMesh.scale.set(shadowScale, shadowScale, shadowScale);
        shadowMat.opacity = 0.85 - floatY * 0.2;

        // Back-glow pulse
        screenBackLight.intensity = 2.0 + Math.sin(elapsedTime * 2.0) * 0.35;
      }

      renderer.render(scene, camera);
    };

    // Pause WebGL rendering when scrolled off-screen
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisibleOnScreen = entry.isIntersecting;
      if (isVisibleOnScreen && !animationFrameId) {
        animate();
      }
    }, { threshold: 0.05 });
    visibilityObserver.observe(container);

    animate();

    // Cleanup resources
    return () => {
      visibilityObserver.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('pointermove', onWindowMouseMove);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('pointerdown', onPointerDown);
      domElement.removeEventListener('pointermove', onPointerMove);
      domElement.removeEventListener('pointerup', onPointerUp);
      domElement.removeEventListener('pointercancel', onPointerUp);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      baseGeo.dispose();
      appleSilverMat.dispose();
      kbWellGeo.dispose();
      keyboardWellMat.dispose();
      kbTexture.dispose();
      kbPlaneGeo.dispose();
      kbPlaneMat.dispose();
      trackpadGeo.dispose();
      trackpadMat.dispose();
      lidGeo.dispose();
      bezelGeo.dispose();
      bezelMat.dispose();
      screenGeo.dispose();
      screenTexture.dispose();
      screenMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTexture.dispose();
    };
  }, []);

  return (
    <div 
      className="hero-three-wrapper" 
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isInteracting ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'none'
      }}
    >
      <div 
        ref={mountRef} 
        style={{ width: '100%', height: '100%', minHeight: '380px' }} 
        aria-label="Interactive 3D Apple MacBook Pro in Silver Titanium showcasing Muhammed K's authentic 3D avatar. Drag or swipe to interact."
      />
    </div>
  );
}
