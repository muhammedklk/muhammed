import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function HeroCanvas3D() {
  const mountRef = useRef(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    let scene, camera, renderer, mainMesh, innerMesh, ringMesh;
    let animationFrameId;
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    try {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 4.6;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      container.appendChild(renderer.domElement);

      // Ambient & Directional Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambientLight);

      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
      directionalLight1.position.set(5, 6, 4);
      scene.add(directionalLight1);

      const directionalLight2 = new THREE.DirectionalLight(0x7C5CE1, 3.2); // Brand violet accent light
      directionalLight2.position.set(-5, -4, 3);
      scene.add(directionalLight2);

      const pointLight = new THREE.PointLight(0x7C5CE1, 4, 10);
      pointLight.position.set(0, 0, 0);
      scene.add(pointLight);

      // Outer Translucent Geometric Prism / Dodecahedron
      const outerGeometry = new THREE.IcosahedronGeometry(1.4, 0);
      const outerMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.15,
        roughness: 0.1,
        transmission: 0.7,
        thickness: 0.8,
        ior: 1.5,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.85,
        reflectivity: 0.8
      });
      mainMesh = new THREE.Mesh(outerGeometry, outerMaterial);
      scene.add(mainMesh);

      // Wireframe overlay for technical precision aesthetic
      const wireGeometry = new THREE.WireframeGeometry(outerGeometry);
      const wireMaterial = new THREE.LineBasicMaterial({
        color: 0x7C5CE1,
        transparent: true,
        opacity: 0.45,
        linewidth: 1
      });
      const wireframe = new THREE.LineSegments(wireGeometry, wireMaterial);
      mainMesh.add(wireframe);

      // Core Glowing Sphere (Brand Violet)
      const innerGeometry = new THREE.SphereGeometry(0.55, 32, 32);
      const innerMaterial = new THREE.MeshStandardMaterial({
        color: 0x7C5CE1,
        emissive: 0x7C5CE1,
        emissiveIntensity: 0.6,
        roughness: 0.3,
        metalness: 0.8
      });
      innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
      scene.add(innerMesh);

      // Orbital Orbit Ring
      const ringGeometry = new THREE.TorusGeometry(1.85, 0.015, 16, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x121316,
        transparent: true,
        opacity: 0.25
      });
      ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      ringMesh.rotation.x = Math.PI / 3;
      scene.add(ringMesh);

      // Mouse Parallax listener
      const handleMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetX = x * 0.8;
        targetY = y * 0.8;
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Resize listener
      const handleResize = () => {
        if (!container || !renderer || !camera) return;
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };

      window.addEventListener('resize', handleResize);

      // Render Loop
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        // Smooth mouse damping
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;

        if (!prefersReducedMotion) {
          mainMesh.rotation.y += 0.006;
          mainMesh.rotation.x += 0.003;

          innerMesh.rotation.y -= 0.008;

          ringMesh.rotation.z += 0.004;
        }

        // Apply mouse tilt
        mainMesh.rotation.x = THREE.MathUtils.lerp(mainMesh.rotation.x, mouseY + 0.3, 0.05);
        mainMesh.rotation.y = THREE.MathUtils.lerp(mainMesh.rotation.y, mouseX + 0.3, 0.05);

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        if (container && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    } catch (err) {
      console.warn("WebGL initialization failed, falling back to static visual:", err);
      setWebGLSupported(false);
    }
  }, []);

  return (
    <div
      ref={mountRef}
      className="hero-canvas-wrapper"
      style={{
        width: '100%',
        height: '460px',
        maxWidth: '480px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      aria-label="Interactive 3D Geometric Brand Composition"
    >
      {!webGLSupported && (
        <div className="hero-3d-fallback" style={{ textAlign: 'center', padding: '24px' }}>
          <div
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #7C5CE1 0%, #121316 70%)',
              margin: '0 auto',
              boxShadow: '0 20px 50px rgba(124, 92, 225, 0.3)'
            }}
          />
        </div>
      )}
    </div>
  );
}
