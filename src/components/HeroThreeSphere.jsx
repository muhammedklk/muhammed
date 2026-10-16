import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * HeroThreeSphere Component
 * 
 * Exact 3D recreation of the floating orb from the reference design.
 * Features:
 * - Soft, semi-transparent, milky-white translucent outer shell
 * - Granular crystalline frosted surface texture with physical transmission & subsurface attenuation
 * - Glowing violet-purple (#B99AFF) and pale lavender (#E6D9FF) internal core
 * - Thousands of densely distributed glistening crystal sparkle particles
 * - Realistic studio lighting, soft floor contact shadow, and gentle floating bob
 * - Interactive pointer drag/swipe with smooth inertia
 */
export default function HeroThreeSphere() {
  const mountRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Accessibility motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene & Perspective Camera
    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    // High-performance WebGL Renderer with ACES Filmic tone mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // ============================================================
    // LIGHTING SETUP (Studio Diffused Lighting)
    // ============================================================
    // 1. Soft neutral ambient fill
    const ambientLight = new THREE.AmbientLight(0xfcf8ff, 1.5);
    scene.add(ambientLight);

    // 2. Main Key Light (Soft top-right rim and highlights)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(3.8, 4.4, 4.2);
    scene.add(keyLight);

    // 3. Diffuse studio fill light from front-left
    const fillLight = new THREE.DirectionalLight(0xf2eaff, 1.1);
    fillLight.position.set(-4.2, -1.8, 2.8);
    scene.add(fillLight);

    // 4. Inner Violet-Purple Point Light (#B99AFF core illumination)
    const purpleCoreLight = new THREE.PointLight(0xb99aff, 4.8, 8, 1.4);
    purpleCoreLight.position.set(0, 0.1, -0.1);
    scene.add(purpleCoreLight);

    // 5. Pale Lavender Accent Light (#E6D9FF)
    const lavenderAccentLight = new THREE.PointLight(0xe6d9ff, 2.5, 6, 1.5);
    lavenderAccentLight.position.set(0.15, -0.2, 0.15);
    scene.add(lavenderAccentLight);

    // Assembly Group for floating & interactive rotation
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // ============================================================
    // PROCEDURAL TEXTURES (Granular crystalline micro-noise)
    // ============================================================
    const noiseCanvas = document.createElement('canvas');
    noiseCanvas.width = 512;
    noiseCanvas.height = 512;
    const nCtx = noiseCanvas.getContext('2d');
    const imgData = nCtx.createImageData(512, 512);
    
    // High-frequency crystalline grain noise
    for (let i = 0; i < imgData.data.length; i += 4) {
      const grain = Math.floor(Math.random() * 180 + 75);
      imgData.data[i] = grain;
      imgData.data[i + 1] = grain;
      imgData.data[i + 2] = grain;
      imgData.data[i + 3] = 255;
    }
    nCtx.putImageData(imgData, 0, 0);
    const granularTexture = new THREE.CanvasTexture(noiseCanvas);
    granularTexture.wrapS = THREE.RepeatWrapping;
    granularTexture.wrapT = THREE.RepeatWrapping;
    granularTexture.repeat.set(8, 8);

    // ============================================================
    // 1. INNER GLOWING NUCLEUS (Violet-Purple #B99AFF -> Lavender #E6D9FF)
    // ============================================================
    const coreGeo = new THREE.SphereGeometry(0.78, 64, 64);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xb99aff,             // Soft violet-purple
      emissive: 0x9f75ff,          // Deep radiant violet-purple
      emissiveIntensity: 0.72,
      roughness: 0.6,
      metalness: 0.02
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sphereGroup.add(coreMesh);

    // ============================================================
    // 2. TRANSLUCENT MILKY-WHITE FROSTED OUTER SHELL
    // ============================================================
    const shellGeo = new THREE.SphereGeometry(0.94, 128, 128);

    // Organic micro-perturbation: reproduce the subtle organic handcrafted silhouette from reference
    const posAttr = shellGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = posAttr.getZ(i);

      let factor = 1.0;
      // Gentle natural macro variance
      factor += Math.sin(x * 3.2 + y * 2.4) * 0.012;
      factor += Math.cos(z * 2.8 - y * 1.6) * 0.009;
      // Soft bottom fullness / organic droop
      if (y < -0.2) {
        factor += (Math.abs(y) - 0.2) * 0.02 * Math.sin(x * 3.5);
      }
      posAttr.setXYZ(i, x * factor, y * factor, z * factor);
    }
    shellGeo.computeVertexNormals();

    const shellMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,                       // Milky white
      transmission: 0.86,                    // Semi-transparent
      opacity: 0.96,
      transparent: true,
      roughness: 0.35,                       // Frosted finish
      roughnessMap: granularTexture,
      bumpMap: granularTexture,
      bumpScale: 0.014,                      // Fine crystalline granular bump
      metalness: 0.01,
      ior: 1.34,                             // Natural ice / glass refraction
      thickness: 1.45,
      attenuationColor: new THREE.Color('#E6D9FF'), // Pale lavender internal volume attenuation
      attenuationDistance: 1.15,
      clearcoat: 0.52,                       // Soft surface glaze highlight
      clearcoatRoughness: 0.24,
      reflectivity: 0.45
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    sphereGroup.add(shellMesh);

    // ============================================================
    // 3. THOUSANDS OF DENSELY DISTRIBUTED GLISTENING PARTICLES
    // ============================================================
    const particleCount = 3600;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleTwinkles = new Float32Array(particleCount);

    const colorWhite = new THREE.Color(0xffffff);
    const colorLavender = new THREE.Color(0xe6d9ff);
    const colorViolet = new THREE.Color(0xb99aff);

    for (let i = 0; i < particleCount; i++) {
      // Cling closely around the outer frosted shell
      const r = 0.915 + Math.random() * 0.055;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePos[i * 3 + 2] = r * Math.cos(phi);

      // Color distribution: Luminous white, pale lavender, and soft violet glints
      const rand = Math.random();
      let pColor = colorWhite;
      if (rand < 0.45) {
        pColor = colorWhite;
      } else if (rand < 0.8) {
        pColor = colorLavender;
      } else {
        pColor = colorViolet;
      }

      particleColors[i * 3] = pColor.r;
      particleColors[i * 3 + 1] = pColor.g;
      particleColors[i * 3 + 2] = pColor.b;

      particleTwinkles[i] = Math.random() * Math.PI * 2;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Particle Texture Sprite (Crystalline starburst sparkle)
    const sparkCanvas = document.createElement('canvas');
    sparkCanvas.width = 64;
    sparkCanvas.height = 64;
    const sCtx = sparkCanvas.getContext('2d');
    const grad = sCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.2, 'rgba(245, 235, 255, 0.9)');
    grad.addColorStop(0.5, 'rgba(215, 190, 255, 0.4)');
    grad.addColorStop(1, 'rgba(185, 154, 255, 0)');
    sCtx.fillStyle = grad;
    sCtx.beginPath();
    sCtx.arc(32, 32, 32, 0, Math.PI * 2);
    sCtx.fill();
    const particleTexture = new THREE.CanvasTexture(sparkCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.034,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false,
      opacity: 0.88
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    sphereGroup.add(particles);

    // ============================================================
    // 4. REALISTIC STUDIO FLOOR CONTACT SHADOW
    // ============================================================
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shCtx = shadowCanvas.getContext('2d');
    const shGrad = shCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
    shGrad.addColorStop(0, 'rgba(32, 26, 36, 0.46)');
    shGrad.addColorStop(0.22, 'rgba(68, 56, 78, 0.2)');
    shGrad.addColorStop(0.52, 'rgba(115, 102, 128, 0.07)');
    shGrad.addColorStop(0.82, 'rgba(175, 168, 185, 0.015)');
    shGrad.addColorStop(1, 'rgba(240, 240, 245, 0)');
    shCtx.fillStyle = shGrad;
    shCtx.fillRect(0, 0, 256, 256);
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);

    const shadowGeo = new THREE.PlaneGeometry(2.5, 2.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.45;
    scene.add(shadowMesh);

    // ============================================================
    // 5. INTERACTIVE POINTER SWIPE / DRAG CONTROLS WITH INERTIA
    // ============================================================
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const domElement = renderer.domElement;
    domElement.style.touchAction = 'none';

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

      // Responsive flick / swipe sensitivity
      velocityX = deltaX * 0.012;
      velocityY = deltaY * 0.012;

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

    domElement.addEventListener('pointerdown', onPointerDown);
    domElement.addEventListener('pointermove', onPointerMove);
    domElement.addEventListener('pointerup', onPointerUp);
    domElement.addEventListener('pointercancel', onPointerUp);

    // Responsive Canvas Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;

      if (w < 480) {
        camera.position.z = 5.8;
      } else if (w < 768) {
        camera.position.z = 5.4;
      } else {
        camera.position.z = 5.2;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // ============================================================
    // ANIMATION LOOP (Gentle Float, Shimmer, & Momentum Physics)
    // ============================================================
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Inertia decay on release
      if (!isDragging) {
        velocityX *= 0.95;
        velocityY *= 0.95;

        targetRotationY += velocityX;
        targetRotationX += velocityY;

        // Subtle idle rotation when resting
        if (!prefersReducedMotion) {
          targetRotationY += 0.0022;
        }
      }

      // Smooth damped rotation interpolation
      sphereGroup.rotation.y += (targetRotationY - sphereGroup.rotation.y) * 0.12;
      sphereGroup.rotation.x += (targetRotationX - sphereGroup.rotation.x) * 0.12;

      // Gentle vertical floating motion
      if (!prefersReducedMotion) {
        const floatY = Math.sin(elapsedTime * 1.5) * 0.065;
        sphereGroup.position.y = floatY;

        // Realistic floor shadow scaling and opacity modulation
        const shadowScale = 1 - floatY * 0.38;
        shadowMesh.scale.set(shadowScale, shadowScale, shadowScale);
        shadowMat.opacity = 0.82 - floatY * 0.28;

        // Delicate sparkling crystal rotation & internal shimmer
        particles.rotation.y = elapsedTime * 0.055;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup resources on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('pointerdown', onPointerDown);
      domElement.removeEventListener('pointermove', onPointerMove);
      domElement.removeEventListener('pointerup', onPointerUp);
      domElement.removeEventListener('pointercancel', onPointerUp);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      granularTexture.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();
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
        aria-label="Interactive 3D glowing frosted orb with soft violet-purple glow. Drag or swipe to rotate."
      />
    </div>
  );
}
