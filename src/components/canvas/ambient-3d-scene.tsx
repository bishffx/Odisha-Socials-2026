"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface SceneElements {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  objectsGroup: THREE.Group;
  elements: {
    phone: THREE.Group;
    browser: THREE.Group;
    cameraLens: THREE.Group;
    socialCard1: THREE.Mesh;
    socialCard2: THREE.Mesh;
    torus: THREE.Mesh;
    octahedron: THREE.Mesh;
    rings: THREE.Mesh[];
  };
}

export function Ambient3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // 1. Accessibility & Performance Guards
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;

    // On mobile or reduced motion, skip WebGL to preserve battery & performance
    if (prefersReducedMotion || isMobile) {
      setIsSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let animFrameId: number;
    let isDisposed = false;

    // 2. Initialize Three.js Scene, Camera, and Clamped WebGLRenderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 18);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      setIsSupported(false);
      return;
    }

    // Clamp DPR to max 1.5 to prevent 4K fillrate bottlenecks
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 3. Studio Lighting Rig (Brand Palette: Violet, Indigo, Gold, Daylight)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    const purpleLight = new THREE.PointLight(0x7c3aed, 2.5, 30);
    purpleLight.position.set(-6, 2, 8);
    scene.add(purpleLight);

    const goldLight = new THREE.PointLight(0xf59e0b, 1.8, 25);
    goldLight.position.set(8, -4, 6);
    scene.add(goldLight);

    // 4. Procedural Low-Poly Mesh Construction (Zero heavy assets / Zero network latency)
    const objectsGroup = new THREE.Group();
    scene.add(objectsGroup);

    // --- Object A: Stylized Smartphone Slate ---
    const phone = new THREE.Group();
    const phoneBodyGeo = new THREE.BoxGeometry(2.4, 4.8, 0.22);
    const phoneBodyMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      metalness: 0.8,
      roughness: 0.2,
    });
    const phoneBody = new THREE.Mesh(phoneBodyGeo, phoneBodyMat);
    phone.add(phoneBody);

    // Screen with brand gradient glow
    const screenGeo = new THREE.PlaneGeometry(2.1, 4.4);
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      emissive: 0x6d28d9,
      emissiveIntensity: 0.35,
      roughness: 0.3,
    });
    const phoneScreen = new THREE.Mesh(screenGeo, screenMat);
    phoneScreen.position.z = 0.12;
    phone.add(phoneScreen);

    // Screen reel bar indicators
    const barGeo = new THREE.PlaneGeometry(1.6, 0.12);
    const barMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });
    const bar1 = new THREE.Mesh(barGeo, barMat);
    bar1.position.set(0, -1.5, 0.13);
    phone.add(bar1);

    phone.position.set(6.5, 1.5, -2);
    phone.rotation.set(0.15, -0.4, 0.08);
    objectsGroup.add(phone);

    // --- Object B: Stylized Browser Window Slab ---
    const browser = new THREE.Group();
    const browserBodyGeo = new THREE.BoxGeometry(4.2, 2.8, 0.16);
    const browserBodyMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.1,
      transparent: true,
      opacity: 0.9,
    });
    const browserBody = new THREE.Mesh(browserBodyGeo, browserBodyMat);
    browser.add(browserBody);

    // Top window bar
    const winBarGeo = new THREE.PlaneGeometry(4.0, 0.4);
    const winBarMat = new THREE.MeshStandardMaterial({ color: 0xede9fe });
    const winBar = new THREE.Mesh(winBarGeo, winBarMat);
    winBar.position.set(0, 1.1, 0.09);
    browser.add(winBar);

    // Three traffic dots
    [-1.6, -1.3, -1.0].forEach((dotX, i) => {
      const dotGeo = new THREE.CircleGeometry(0.08, 16);
      const dotMat = new THREE.MeshBasicMaterial({
        color: i === 0 ? 0xef4444 : i === 1 ? 0xf59e0b : 0x10b981,
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(dotX, 1.1, 0.1);
      browser.add(dot);
    });

    browser.position.set(-6.2, -1.8, -4);
    browser.rotation.set(0.2, 0.35, -0.06);
    objectsGroup.add(browser);

    // --- Object C: Stylized Media Camera Lens Cylinder ---
    const cameraLens = new THREE.Group();
    const lensBarrelGeo = new THREE.CylinderGeometry(1.0, 1.1, 1.2, 24);
    const lensBarrelMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.85,
      roughness: 0.25,
    });
    const lensBarrel = new THREE.Mesh(lensBarrelGeo, lensBarrelMat);
    lensBarrel.rotation.x = Math.PI / 2;
    cameraLens.add(lensBarrel);

    const lensGlassGeo = new THREE.CircleGeometry(0.85, 24);
    const lensGlassMat = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.4,
      metalness: 0.95,
      roughness: 0.05,
    });
    const lensGlass = new THREE.Mesh(lensGlassGeo, lensGlassMat);
    lensGlass.position.z = 0.61;
    cameraLens.add(lensGlass);

    cameraLens.position.set(5.5, -9, -3);
    cameraLens.rotation.set(0.25, -0.3, 0.1);
    objectsGroup.add(cameraLens);

    // --- Object D: Floating 3D Social Cards ---
    const cardGeo = new THREE.BoxGeometry(2.2, 1.4, 0.08);
    const cardMat1 = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.2,
      transparent: true,
      opacity: 0.88,
    });
    const socialCard1 = new THREE.Mesh(cardGeo, cardMat1);
    socialCard1.position.set(-5.5, -8.5, -1);
    socialCard1.rotation.set(0.1, 0.25, 0.05);
    objectsGroup.add(socialCard1);

    const cardMat2 = new THREE.MeshStandardMaterial({
      color: 0x6d28d9,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.2,
      metalness: 0.3,
      roughness: 0.3,
      transparent: true,
      opacity: 0.85,
    });
    const socialCard2 = new THREE.Mesh(cardGeo, cardMat2);
    socialCard2.position.set(-4.2, -10.2, 1);
    socialCard2.rotation.set(-0.15, 0.3, -0.1);
    objectsGroup.add(socialCard2);

    // --- Object E: Abstract Geometric Brand Shapes ---
    const torusGeo = new THREE.TorusGeometry(1.2, 0.35, 16, 48);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      metalness: 0.6,
      roughness: 0.25,
      emissive: 0xbe185d,
      emissiveIntensity: 0.15,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(6.8, -16, -2);
    torus.rotation.set(0.6, 0.4, 0);
    objectsGroup.add(torus);

    const octaGeo = new THREE.OctahedronGeometry(1.1, 0);
    const octaMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0xd97706,
      emissiveIntensity: 0.2,
    });
    const octahedron = new THREE.Mesh(octaGeo, octaMat);
    octahedron.position.set(-5.0, -17.5, 0);
    objectsGroup.add(octahedron);

    // Ambient floating rings at varying depths
    const rings: THREE.Mesh[] = [];
    [-4, 2, 7].forEach((zPos, idx) => {
      const ringGeo = new THREE.TorusGeometry(0.7 + idx * 0.3, 0.04, 12, 36);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx % 2 === 0 ? 0x8b5cf6 : 0x06b6d4,
        transparent: true,
        opacity: 0.35,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set((idx - 1) * 4.5, -5 - idx * 5, zPos);
      rings.push(ring);
      objectsGroup.add(ring);
    });

    // 5. Camera Interpolation Coordinates (Lerp targets based on scroll & mouse)
    const targetCameraPos = new THREE.Vector3(0, 0, 18);
    const targetLookAt = new THREE.Vector3(0, 0, 0);
    const currentLookAt = new THREE.Vector3(0, 0, 0);

    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let cachedDocHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    // 6. Responsive Resize Handling
    const handleResize = () => {
      if (!container || isDisposed) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      cachedDocHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // 7. Visibility Change: Pause rendering when user switches tabs
    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 8. Main Render & Spatial Camera Interpolation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed) return;

      animFrameId = requestAnimationFrame(animate);
      if (!isTabVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse spring lerp
      mouse.x += (targetMouse.x - mouse.x) * 0.06;
      mouse.y += (targetMouse.y - mouse.y) * 0.06;

      // Calculate total page scroll progress (0.0 to 1.0) without layout recalculation
      const scrollY = window.scrollY || 0;
      const scrollProgress = Math.min(Math.max(scrollY / cachedDocHeight, 0), 1);

      // =====================================================================
      // SCROLL CAMERA KEYFRAME PROGRESSION (Smooth spatial transitions)
      // Scene 01 (Hero): (0, 0, 18) looking at (0, 0, 0)
      // Scene 02 (Brand/Services): (2.5, -6, 17) looking at (0.5, -6, 0)
      // Scene 03 (Process/Work): (-2.0, -12, 16) looking at (-0.5, -12, 0)
      // Scene 04 (Packages/Contact): (0, -18, 18) looking at (0, -18, 0)
      // =====================================================================
      const totalYTravel = -20;
      const currentSectionY = scrollProgress * totalYTravel;

      // Subtle horizontal camera dolly path: oscillates smoothly as user moves through scenes
      const cameraPathX = Math.sin(scrollProgress * Math.PI * 2.5) * 2.2;
      const cameraPathZ = 18 - Math.sin(scrollProgress * Math.PI) * 2.5;

      targetCameraPos.set(
        cameraPathX + mouse.x * 1.2,
        currentSectionY + mouse.y * 0.8,
        cameraPathZ
      );

      targetLookAt.set(
        cameraPathX * 0.25 + mouse.x * 0.4,
        currentSectionY + mouse.y * 0.2,
        0
      );

      // Smooth damped lerp interpolation (spring-like easing, never snaps)
      camera.position.x += (targetCameraPos.x - camera.position.x) * 0.045;
      camera.position.y += (targetCameraPos.y - camera.position.y) * 0.045;
      camera.position.z += (targetCameraPos.z - camera.position.z) * 0.045;

      currentLookAt.x += (targetLookAt.x - currentLookAt.x) * 0.045;
      currentLookAt.y += (targetLookAt.y - currentLookAt.y) * 0.045;
      currentLookAt.z += (targetLookAt.z - currentLookAt.z) * 0.045;
      camera.lookAt(currentLookAt);

      // Ambient object floating kinematics (different frequencies, non-synchronized)
      phone.rotation.y = -0.4 + Math.sin(elapsedTime * 0.7) * 0.12;
      phone.position.y = 1.5 + Math.sin(elapsedTime * 0.9) * 0.25;

      browser.rotation.y = 0.35 + Math.cos(elapsedTime * 0.6) * 0.08;
      browser.position.y = -1.8 + Math.cos(elapsedTime * 0.8) * 0.2;

      cameraLens.rotation.z = Math.sin(elapsedTime * 0.5) * 0.15;
      cameraLens.position.y = -9 + Math.sin(elapsedTime * 0.75 + 1) * 0.22;

      socialCard1.rotation.y = 0.25 + Math.sin(elapsedTime * 0.8) * 0.1;
      socialCard1.position.y = -8.5 + Math.cos(elapsedTime * 0.85) * 0.18;

      socialCard2.rotation.x = -0.15 + Math.cos(elapsedTime * 0.65) * 0.08;
      socialCard2.position.y = -10.2 + Math.sin(elapsedTime * 0.7) * 0.2;

      torus.rotation.x += 0.008;
      torus.rotation.y += 0.012;
      torus.position.y = -16 + Math.sin(elapsedTime * 0.8) * 0.28;

      octahedron.rotation.y += 0.01;
      octahedron.rotation.z += 0.007;
      octahedron.position.y = -17.5 + Math.cos(elapsedTime * 0.9) * 0.25;

      rings.forEach((ring, i) => {
        ring.rotation.x += 0.005 * (i + 1);
        ring.rotation.y += 0.008 * (i + 1);
      });

      renderer.render(scene, camera);
    };

    animate();

    // 9. Thorough Memory & Resource Disposal
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries, materials, and renderer context
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  if (!isSupported) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-5 overflow-hidden transition-opacity duration-1000 opacity-60"
    />
  );
}
