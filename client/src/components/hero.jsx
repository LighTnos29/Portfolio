import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { OrbitControls } from 'three-stdlib';

const Hero = () => {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const noiseRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Three.js Setup
    let scene, camera, renderer, guitar, controls;
    let animationId;

    const initThreeJS = () => {
      // Scene setup
      scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x0a0a0a, 20, 100);
      
      // Camera setup
      camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 2, 6);

      // Renderer setup
      renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current,
        antialias: true,
        alpha: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x0a0a0a, 1);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      // Add orbit controls
      controls = new OrbitControls(camera, canvasRef.current);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 1.5;
      controls.maxDistance = 20;
      controls.maxPolarAngle = Math.PI * 0.9;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      
      // Enhanced zoom settings
      controls.enableZoom = true;
      controls.zoomSpeed = 1.2;
      controls.enableRotate = true;
      controls.rotateSpeed = 0.5;
      controls.enablePan = true;
      controls.panSpeed = 0.8;
      controls.screenSpacePanning = false;
      
      // Smooth zoom transition
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;

      // Create 3D guitar
      createGuitar();
      
      // Enhanced lighting setup
      setupLighting();

      // Start animation loop
      animate();
    };

    const createGuitar = () => {
      const guitarGroup = new THREE.Group();
      
      // Guitar Body (Jackson RR1 style - V-shaped)
      const bodyShape = new THREE.Shape();
      // Create V-shaped body
      bodyShape.moveTo(0, 2);
      bodyShape.lineTo(-1.5, -1);
      bodyShape.lineTo(-0.8, -1.5);
      bodyShape.lineTo(0, -0.5);
      bodyShape.lineTo(0.8, -1.5);
      bodyShape.lineTo(1.5, -1);
      bodyShape.lineTo(0, 2);

      const extrudeSettings = { depth: 0.3, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.05, bevelThickness: 0.05 };
      const bodyGeometry = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
      const bodyMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x1a1a1a,
        metalness: 0.8,
        roughness: 0.2,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        emissive: 0x330066,
        emissiveIntensity: 0.05
      });
      const guitarBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
      guitarBody.rotation.x = -Math.PI / 2;
      guitarBody.position.y = -0.5;
      guitarBody.castShadow = true;
      guitarBody.receiveShadow = true;
      guitarGroup.add(guitarBody);

      // Guitar Neck
      const neckGeometry = new THREE.BoxGeometry(0.2, 3, 0.15);
      const neckMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x2d1810,
        metalness: 0.1,
        roughness: 0.8
      });
      const neck = new THREE.Mesh(neckGeometry, neckMaterial);
      neck.position.set(0, 1.5, 0);
      neck.castShadow = true;
      guitarGroup.add(neck);

      // Headstock
      const headstockGeometry = new THREE.BoxGeometry(0.3, 0.6, 0.1);
      const headstock = new THREE.Mesh(headstockGeometry, neckMaterial);
      headstock.position.set(0, 3.2, 0);
      headstock.castShadow = true;
      guitarGroup.add(headstock);

      // Strings
      for (let i = 0; i < 6; i++) {
        const stringGeometry = new THREE.CylinderGeometry(0.005, 0.005, 3.5);
        const stringMaterial = new THREE.MeshBasicMaterial({
          color: 0xcccccc,
          emissive: 0x666666,
          emissiveIntensity: 0.1
        });
        const string = new THREE.Mesh(stringGeometry, stringMaterial);
        string.position.set((i - 2.5) * 0.03, 1.8, 0.08);
        guitarGroup.add(string);
      }

      // Pickups (humbucker style)
      for (let i = 0; i < 2; i++) {
        const pickupGeometry = new THREE.BoxGeometry(0.5, 0.15, 0.05);
        const pickupMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x000000,
          metalness: 0.9,
          roughness: 0.1
        });
        const pickup = new THREE.Mesh(pickupGeometry, pickupMaterial);
        pickup.position.set(0, 0.5 - i * 0.8, 0.1);
        pickup.castShadow = true;
        guitarGroup.add(pickup);
      }

      // Bridge
      const bridgeGeometry = new THREE.BoxGeometry(0.6, 0.1, 0.08);
      const bridgeMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x333333,
        metalness: 1,
        roughness: 0.1
      });
      const bridge = new THREE.Mesh(bridgeGeometry, bridgeMaterial);
      bridge.position.set(0, -1, 0.1);
      bridge.castShadow = true;
      guitarGroup.add(bridge);

      // Tuning pegs
      for (let i = 0; i < 6; i++) {
        const pegGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.1);
        const pegMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x666666,
          metalness: 1,
          roughness: 0.1
        });
        const peg = new THREE.Mesh(pegGeometry, pegMaterial);
        peg.rotation.z = Math.PI / 2;
        peg.position.set((i - 2.5) * 0.06, 3.2, 0);
        guitarGroup.add(peg);
      }

      // Glow effects around guitar
      const glowGeometry = new THREE.RingGeometry(2, 2.5, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x8800ff,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide
      });
      const guitarGlow = new THREE.Mesh(glowGeometry, glowMaterial);
      guitarGlow.rotation.x = -Math.PI / 2;
      guitarGlow.position.y = -0.3;
      guitarGroup.add(guitarGlow);

      // Energy particles around guitar
      for (let i = 0; i < 12; i++) {
        const particleGeometry = new THREE.SphereGeometry(0.02, 8, 8);
        const particleMaterial = new THREE.MeshBasicMaterial({
          color: 0x00ffff,
          transparent: true,
          opacity: 0.8
        });
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        const angle = (i / 12) * Math.PI * 2;
        particle.position.set(
          Math.cos(angle) * 2.5,
          Math.random() * 2 - 0.5,
          Math.sin(angle) * 2.5
        );
        particle.userData = {
          originalX: particle.position.x,
          originalY: particle.position.y,
          originalZ: particle.position.z,
          speed: 0.01 + Math.random() * 0.02
        };
        guitarGroup.add(particle);
      }

      guitarGroup.position.set(0, -0.5, 0);
      guitarGroup.rotation.y = 0.3;
      guitarGroup.rotation.z = 0.1;
      
      guitar = guitarGroup;
      scene.add(guitarGroup);
    };

    const setupLighting = () => {
      // Enhanced ambient light for better visibility
      const ambientLight = new THREE.AmbientLight(0x333366, 0.4);
      scene.add(ambientLight);
      
      // Main key light (bright white with blue tint)
      const keyLight = new THREE.DirectionalLight(0x4488ff, 2);
      keyLight.position.set(5, 5, 5);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 2048;
      keyLight.shadow.mapSize.height = 2048;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 50;
      scene.add(keyLight);
      
      // Fill light (cyan) - stronger
      const fillLight = new THREE.DirectionalLight(0x00ffaa, 1.2);
      fillLight.position.set(-3, 2, 4);
      scene.add(fillLight);
      
      // Rim light (purple) - stronger
      const rimLight = new THREE.DirectionalLight(0xaa44ff, 1.5);
      rimLight.position.set(-5, -2, -5);
      scene.add(rimLight);
      
      // Additional key light from front
      const frontLight = new THREE.DirectionalLight(0xffffff, 1);
      frontLight.position.set(0, 0, 10);
      scene.add(frontLight);
      
      // Point lights for guitar highlighting
      const spotLight1 = new THREE.PointLight(0x00ffff, 1.2, 8);
      spotLight1.position.set(2, 2, 3);
      scene.add(spotLight1);
      
      const spotLight2 = new THREE.PointLight(0xff0088, 1, 6);
      spotLight2.position.set(-2, 1, 2);
      scene.add(spotLight2);
      
      const spotLight3 = new THREE.PointLight(0x8800ff, 0.8, 5);
      spotLight3.position.set(0, -1, 4);
      scene.add(spotLight3);
    };

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
      
      // Update orbit controls
      controls.update();
      
      // Animate guitar (subtle breathing and rotation)
      if (guitar) {
        guitar.position.y = -0.5 + Math.sin(time * 0.5) * 0.05;
        
        // Animate particles around guitar
        guitar.children.forEach((child) => {
          if (child.userData && child.userData.speed !== undefined) {
            const particleTime = time * child.userData.speed * 10;
            child.position.x = child.userData.originalX + Math.cos(particleTime) * 0.5;
            child.position.z = child.userData.originalZ + Math.sin(particleTime) * 0.5;
            child.position.y = child.userData.originalY + Math.sin(particleTime * 2) * 0.3;
            
            // Pulsing effect
            const pulse = 1 + Math.sin(time * 4 + child.userData.speed * 50) * 0.3;
            child.scale.setScalar(pulse);
          }
        });
      }
      
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    // Initialize Three.js
    initThreeJS();

    // GSAP Animations - only noise overlay
    gsap.set(noiseRef.current, { opacity: 0 });
    gsap.to(noiseRef.current, {
      opacity: 0.08,
      duration: 3,
      ease: "power2.inOut"
    });

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      
      // Dispose Three.js resources
      scene.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  // Advanced noise texture
  const noiseStyle = {
    background: `
      radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 0, 136, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(0, 255, 170, 0.02) 0%, transparent 50%),
      radial-gradient(circle at 60% 70%, rgba(136, 0, 255, 0.02) 0%, transparent 50%)
    `,
    filter: 'blur(60px)',
    mixBlendMode: 'screen'
  };

  return (
    <div ref={heroRef} className="relative h-screen w-full overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
      
      {/* Animated noise overlay */}
      <div
        ref={noiseRef}
        className="absolute inset-0 z-10 opacity-0"
        style={noiseStyle}
      />
      
      {/* Film grain effect */}
      <div 
        className="absolute inset-0 z-15 opacity-40"
        style={{
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay'
        }}
      />
      
      {/* Vignette overlay */}
      <div className="absolute inset-0 z-20" style={{
        background: 'radial-gradient(circle at center, transparent 30%, rgba(10, 10, 10, 0.8) 100%)'
      }} />
      
    </div>
  );
};

export default Hero;
