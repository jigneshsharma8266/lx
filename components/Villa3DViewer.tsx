"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  Sparkles,
  RotateCw,
  Compass,
  Layers,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Check,
  Box,
  Sun,
  Moon,
  Upload,
  FileCode,
  Info,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { villaData } from "@/data/villaData";

export default function Villa3DViewer() {
  const [viewMode, setViewMode] = useState<"360-photos" | "3d" | "2.5d">("360-photos");

  // --- 360° All-Sides Photo Orbit State ---
  const [currentAngleIndex, setCurrentAngleIndex] = useState(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const isDraggingPhoto = useRef(false);
  const dragStartX = useRef(0);
  const angles = villaData.angles;
  const currentAngle = angles[currentAngleIndex];

  useEffect(() => {
    if (!isAutoSpinning || viewMode !== "360-photos") return;
    const interval = setInterval(() => {
      setCurrentAngleIndex((prev) => (prev + 1) % angles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isAutoSpinning, viewMode, angles.length]);

  const handlePhotoMouseDown = (e: React.MouseEvent) => {
    isDraggingPhoto.current = true;
    dragStartX.current = e.clientX;
  };

  const handlePhotoMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingPhoto.current) return;
    const deltaX = e.clientX - dragStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        setCurrentAngleIndex((prev) => (prev - 1 + angles.length) % angles.length);
      } else {
        setCurrentAngleIndex((prev) => (prev + 1) % angles.length);
      }
      dragStartX.current = e.clientX;
    }
  };

  const handlePhotoMouseUp = () => {
    isDraggingPhoto.current = false;
  };

  const handlePhotoTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingPhoto.current = true;
      dragStartX.current = e.touches[0].clientX;
    }
  };

  const handlePhotoTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingPhoto.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStartX.current;
    if (Math.abs(deltaX) > 35) {
      if (deltaX > 0) {
        setCurrentAngleIndex((prev) => (prev - 1 + angles.length) % angles.length);
      } else {
        setCurrentAngleIndex((prev) => (prev + 1) % angles.length);
      }
      dragStartX.current = e.touches[0].clientX;
    }
  };

  const handlePhotoTouchEnd = () => {
    isDraggingPhoto.current = false;
  };

  // --- Three.js 3D WebGL Canvas State ---
  const mountRef = useRef<HTMLDivElement>(null);
  const [lightingMode, setLightingMode] = useState<"sunset" | "night" | "day">("sunset");
  const [loadedModelName, setLoadedModelName] = useState<string | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [showModelGuide, setShowModelGuide] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const targetCameraPos = useRef(new THREE.Vector3(14, 10, 18));
  const cameraPresets = {
    overview: { x: 14, y: 10, z: 18, name: "Aerial Overview" },
    pool: { x: 8, y: 4, z: 12, name: "Pool & Deck" },
    penthouse: { x: 6, y: 11, z: 9, name: "Penthouse" },
    garden: { x: -10, y: 6, z: 14, name: "Garden Lounge" },
  };

  // Scene references to allow dynamic model swap
  const sceneRef = useRef<THREE.Scene | null>(null);
  const customModelGroupRef = useRef<THREE.Group | null>(null);
  const proceduralGroupRef = useRef<THREE.Group | null>(null);

  // Helper to generate procedural wood/stone textures
  const createWoodTexture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.Texture();
    ctx.fillStyle = "#4a3525";
    ctx.fillRect(0, 0, 512, 512);
    // Draw wood grain planks
    ctx.strokeStyle = "#38271b";
    ctx.lineWidth = 4;
    for (let i = 0; i < 512; i += 32) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    return texture;
  };

  const createStoneTexture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.Texture();
    ctx.fillStyle = "#252b33";
    ctx.fillRect(0, 0, 512, 512);
    // Draw subtle concrete/stucco noise
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    for (let i = 0; i < 2000; i++) {
      ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  };

  const createGlassFacadeTexture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.Texture();
    // Warm interior glow gradient behind glass
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, "#ffb86c");
    grad.addColorStop(1, "#3d2817");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Architectural mullions/frames
    ctx.strokeStyle = "#161b22";
    ctx.lineWidth = 8;
    ctx.strokeRect(0, 0, 512, 512);
    // Vertical mullions
    for (let x = 128; x < 512; x += 128) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
    // Horizontal transom
    ctx.beginPath();
    ctx.moveTo(0, 256);
    ctx.lineTo(512, 256);
    ctx.stroke();

    return new THREE.CanvasTexture(canvas);
  };

  useEffect(() => {
    if (viewMode !== "3d" || !mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x080b0e, 0.02);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(14, 10, 18);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffeedd, 1.5);
    dirLight.position.set(20, 25, 15);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Warm Interior Glow
    const interiorLight1 = new THREE.PointLight(0xffaa44, 3, 20);
    interiorLight1.position.set(0, 2.5, 0);
    scene.add(interiorLight1);

    const interiorLight2 = new THREE.PointLight(0xffc56e, 2, 15);
    interiorLight2.position.set(0, 5.5, -0.5);
    scene.add(interiorLight2);

    // Pool Underglow
    const poolLight = new THREE.PointLight(0x00d2ff, 2.5, 12);
    poolLight.position.set(2, 0.3, 5);
    scene.add(poolLight);

    // Custom model container
    const customGroup = new THREE.Group();
    customModelGroupRef.current = customGroup;
    scene.add(customGroup);

    // Procedural Textured Architectural Group
    const proceduralGroup = new THREE.Group();
    proceduralGroupRef.current = proceduralGroup;
    scene.add(proceduralGroup);

    const woodTex = createWoodTexture();
    const stoneTex = createStoneTexture();
    const glassTex = createGlassFacadeTexture();

    // 1. Estate Podium / Ground Slab (Dark Stucco & Stone)
    const podiumGeo = new THREE.BoxGeometry(24, 0.6, 20);
    const podiumMat = new THREE.MeshStandardMaterial({
      map: stoneTex,
      roughness: 0.8,
      metalness: 0.1,
    });
    const podium = new THREE.Mesh(podiumGeo, podiumMat);
    podium.position.y = -0.3;
    podium.receiveShadow = true;
    proceduralGroup.add(podium);

    // 2. Teak Wood Pool Deck
    const deckGeo = new THREE.BoxGeometry(11, 0.12, 9);
    const deckMat = new THREE.MeshStandardMaterial({
      map: woodTex,
      roughness: 0.5,
      metalness: 0.1,
    });
    const deck = new THREE.Mesh(deckGeo, deckMat);
    deck.position.set(2.5, 0.06, 5.5);
    deck.receiveShadow = true;
    proceduralGroup.add(deck);

    // 3. Azure Infinity Pool with Real Water Shader / Transparency
    const poolGeo = new THREE.BoxGeometry(8.5, 0.35, 5.5);
    const poolMat = new THREE.MeshPhysicalMaterial({
      color: 0x0088cc,
      transmission: 0.85,
      opacity: 0.9,
      transparent: true,
      roughness: 0.08,
      metalness: 0.1,
      ior: 1.33,
    });
    const pool = new THREE.Mesh(poolGeo, poolMat);
    pool.position.set(2.5, 0.12, 6);
    proceduralGroup.add(pool);

    // Pool waterline tile border
    const tileBorderGeo = new THREE.BoxGeometry(8.8, 0.05, 5.8);
    const tileBorderMat = new THREE.MeshStandardMaterial({ color: 0x1a2630, roughness: 0.3 });
    const tileBorder = new THREE.Mesh(tileBorderGeo, tileBorderMat);
    tileBorder.position.set(2.5, 0.02, 6);
    proceduralGroup.add(tileBorder);

    // 4. Ground Floor Main Pavilion (Textured architectural volume)
    const gfGeo = new THREE.BoxGeometry(13, 3.8, 9.5);
    const gfMat = new THREE.MeshStandardMaterial({
      map: stoneTex,
      roughness: 0.6,
      metalness: 0.2,
    });
    const groundFloor = new THREE.Mesh(gfGeo, gfMat);
    groundFloor.position.set(-2, 1.9, -1.2);
    groundFloor.castShadow = true;
    groundFloor.receiveShadow = true;
    proceduralGroup.add(groundFloor);

    // Glass Facade Facing the Pool Deck (with warm interior illumination)
    const glassFacadeGeo = new THREE.PlaneGeometry(10.5, 3.2);
    const glassFacadeMat = new THREE.MeshBasicMaterial({
      map: glassTex,
      transparent: true,
      opacity: 0.92,
    });
    const glassFacade = new THREE.Mesh(glassFacadeGeo, glassFacadeMat);
    glassFacade.position.set(-2, 1.8, 3.56);
    proceduralGroup.add(glassFacade);

    // 5. Upper Horizon Master Penthouse Suite (Cantilevered Architecture)
    const ufGeo = new THREE.BoxGeometry(10, 3.4, 8.5);
    const ufMat = new THREE.MeshStandardMaterial({
      color: 0x1c222b,
      roughness: 0.4,
      metalness: 0.3,
    });
    const upperFloor = new THREE.Mesh(ufGeo, ufMat);
    upperFloor.position.set(0.5, 5.5, -0.8);
    upperFloor.castShadow = true;
    upperFloor.receiveShadow = true;
    proceduralGroup.add(upperFloor);

    // Upper Floor Glass Window
    const upperGlass = new THREE.Mesh(new THREE.PlaneGeometry(8, 2.6), glassFacadeMat);
    upperGlass.position.set(0.5, 5.4, 3.46);
    proceduralGroup.add(upperGlass);

    // 6. Cantilever Roof Overhang (Teak Underbelly & Champagne Trim)
    const roofGeo = new THREE.BoxGeometry(12.5, 0.4, 10.5);
    const roofMat = new THREE.MeshStandardMaterial({
      color: 0xc5a880,
      metalness: 0.6,
      roughness: 0.3,
    });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(0.5, 7.4, -0.8);
    roof.castShadow = true;
    proceduralGroup.add(roof);

    // Balcony Glass Railing
    const rail = new THREE.Mesh(
      new THREE.BoxGeometry(9.5, 0.9, 0.08),
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.9,
        transparent: true,
        roughness: 0.1,
      })
    );
    rail.position.set(0.5, 4.3, 3.6);
    proceduralGroup.add(rail);

    // 7. Outdoor Poolside Loungers (2 loungers with teak frames & cushions)
    for (let i = 0; i < 2; i++) {
      const loungerFrame = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 0.15, 2.2),
        new THREE.MeshStandardMaterial({ color: 0x3d2817 })
      );
      const cushion = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.1, 2.1),
        new THREE.MeshStandardMaterial({ color: 0xeae0d0 })
      );
      cushion.position.y = 0.12;
      loungerFrame.add(cushion);
      loungerFrame.position.set(-1.2 - i * 1.5, 0.15, 6);
      proceduralGroup.add(loungerFrame);
    }

    // 8. Minimalist Palm Trees / Planters
    for (let i = 0; i < 4; i++) {
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.18, 5, 8),
        new THREE.MeshStandardMaterial({ color: 0x422f21 })
      );
      const palmLeaves = new THREE.Mesh(
        new THREE.ConeGeometry(1.6, 2.2, 7),
        new THREE.MeshStandardMaterial({ color: 0x223826, roughness: 0.9 })
      );
      trunk.position.set(-8.5 + i * 1.8, 2.5, -5.5 + (i % 2) * 2);
      palmLeaves.position.set(-8.5 + i * 1.8, 5.2, -5.5 + (i % 2) * 2);
      trunk.castShadow = true;
      palmLeaves.castShadow = true;
      proceduralGroup.add(trunk);
      proceduralGroup.add(palmLeaves);
    }

    // 9. Ambient Golden Dust Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 40;
      positions[i + 1] = Math.random() * 20;
      positions[i + 2] = (Math.random() - 0.5) * 40;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({ size: 0.18, color: 0xc5a880, transparent: true, opacity: 0.7 })
    );
    scene.add(particles);

    // Orbit Drag Interaction
    let isDragging = false;
    let prevMouseX = 0;
    let rotationAngle = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      prevMouseX = e.clientX;
      rotationAngle += deltaX * 0.005;
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Check if a villa.glb model exists in /models/
    const loader = new GLTFLoader();
    loader.load(
      "/models/villa.glb",
      (gltf) => {
        // If official villa model exists, hide procedural blocks and show real model!
        proceduralGroup.visible = false;
        customGroup.add(gltf.scene);
        setLoadedModelName("villa.glb (Loaded from /models)");
      },
      undefined,
      () => {
        // Default to procedural textured villa
        proceduralGroup.visible = true;
      }
    );

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!isDragging) rotationAngle += 0.001;
      camera.position.lerp(targetCameraPos.current, 0.04);
      camera.lookAt(0, 2, 0);

      // Rotate active model
      if (customGroup.children.length > 0) {
        customGroup.rotation.y = rotationAngle;
      } else {
        proceduralGroup.rotation.y = rotationAngle;
      }

      // Gentle water ripple
      pool.position.y = 0.12 + Math.sin(elapsedTime * 2.5) * 0.015;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      renderer.dispose();
      if (container && dom.parentNode === container) {
        container.removeChild(dom);
      }
    };
  }, [viewMode]);

  // Handle Loading User-Uploaded .GLB / .GLTF Model file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsModelLoading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const contents = event.target?.result;
      if (!contents) return;

      const loader = new GLTFLoader();
      loader.parse(
        contents,
        "",
        (gltf) => {
          if (customModelGroupRef.current && proceduralGroupRef.current) {
            // Remove previous custom models
            while (customModelGroupRef.current.children.length > 0) {
              customModelGroupRef.current.remove(customModelGroupRef.current.children[0]);
            }
            // Center & normalize scale of custom model
            const box = new THREE.Box3().setFromObject(gltf.scene);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 14 / maxDim;

            gltf.scene.scale.set(scale, scale, scale);
            gltf.scene.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);

            customModelGroupRef.current.add(gltf.scene);
            proceduralGroupRef.current.visible = false;
            setLoadedModelName(file.name);
            setIsModelLoading(false);
          }
        },
        (error) => {
          console.error("GLTF load error:", error);
          alert("Could not parse 3D file. Please ensure it is a valid .glb or .gltf model.");
          setIsModelLoading(false);
        }
      );
    };

    reader.readAsArrayBuffer(file);
  };

  // --- 2.5D Depth Parallax State ---
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handle25DMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section id="3d-view" className="relative py-24 sm:py-32 bg-[#080B0E] text-[#F3EFE6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C5A880]/30 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#C5A880] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Spatial Visual Experience</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-[#F8F5EE]">
              Explore the <span className="italic font-serif gold-text-gradient">3D Villa.</span>
            </h2>
          </div>

          {/* 3 View Mode Tabs */}
          <div className="flex items-center gap-1.5 bg-[#0F1318] p-1.5 rounded-full border border-[#C5A880]/30 max-w-full overflow-x-auto">
            <button
              onClick={() => setViewMode("360-photos")}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                viewMode === "360-photos"
                  ? "bg-[#C5A880] text-[#080B0E] font-semibold shadow-md shadow-[#C5A880]/20"
                  : "text-[#A69E92] hover:text-[#F3EFE6]"
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>360° All-Sides View</span>
            </button>
            <button
              onClick={() => setViewMode("3d")}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                viewMode === "3d"
                  ? "bg-[#C5A880] text-[#080B0E] font-semibold shadow-md shadow-[#C5A880]/20"
                  : "text-[#A69E92] hover:text-[#F3EFE6]"
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D Model (.GLB)</span>
            </button>
            <button
              onClick={() => setViewMode("2.5d")}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                viewMode === "2.5d"
                  ? "bg-[#C5A880] text-[#080B0E] font-semibold shadow-md shadow-[#C5A880]/20"
                  : "text-[#A69E92] hover:text-[#F3EFE6]"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>2.5D Depth</span>
            </button>
          </div>
        </div>

        {/* Main Interactive Stage Container */}
        <div className="relative w-full h-[560px] sm:h-[640px] rounded-3xl glass-panel border border-[#C5A880]/25 shadow-2xl overflow-hidden select-none">
          {viewMode === "360-photos" ? (
            /* ========================================================================= */
            /* MODE 1: 360° ALL-SIDES PHOTO ORBIT (Drag around all angles of the villa)  */
            /* ========================================================================= */
            <div
              className="relative w-full h-full cursor-ew-resize overflow-hidden"
              onMouseDown={handlePhotoMouseDown}
              onMouseMove={handlePhotoMouseMove}
              onMouseUp={handlePhotoMouseUp}
              onTouchStart={handlePhotoTouchStart}
              onTouchMove={handlePhotoTouchMove}
              onTouchEnd={handlePhotoTouchEnd}
            >
              <div className="absolute inset-0 transition-all duration-300">
                <Image
                  src={currentAngle.image}
                  alt={currentAngle.title}
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/40" />
              </div>

              {/* Top Controls Bar */}
              <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-20 pointer-events-none">
                <div className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#C5A880]/40 text-xs text-[#E5D5C0]">
                  <Compass className="w-3.5 h-3.5 text-[#C5A880] animate-spin-slow" />
                  <span className="font-semibold text-[#C5A880]">{currentAngle.cardinal}</span>
                  <span className="text-white/40">•</span>
                  <span>{currentAngle.label}</span>
                </div>

                <div className="pointer-events-auto flex items-center gap-2">
                  <button
                    onClick={() => setIsAutoSpinning(!isAutoSpinning)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-white hover:border-[#C5A880] transition-colors"
                  >
                    {isAutoSpinning ? <Pause className="w-3.5 h-3.5 text-[#C5A880]" /> : <Play className="w-3.5 h-3.5 text-[#C5A880]" />}
                    <span>{isAutoSpinning ? "Pause Auto-Orbit" : "Auto-Orbit 360°"}</span>
                  </button>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentAngleIndex((prev) => (prev - 1 + angles.length) % angles.length);
                }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-[#C5A880] text-white hover:text-black border border-white/20 transition-all cursor-pointer"
                title="Rotate Left (45°)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentAngleIndex((prev) => (prev + 1) % angles.length);
                }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-[#C5A880] text-white hover:text-black border border-white/20 transition-all cursor-pointer"
                title="Rotate Right (45°)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Bottom Angle Information & Quick Selectors */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 flex flex-col gap-3">
                <div className="max-w-xl p-4 sm:p-5 rounded-2xl glass-panel border border-[#C5A880]/30 shadow-2xl backdrop-blur-md bg-black/70">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
                      Angle {currentAngleIndex + 1} of 8 • {currentAngle.degrees}° Panorama
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white mb-1.5 leading-tight">
                    {currentAngle.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D2CBC1] font-light leading-relaxed mb-3">
                    {currentAngle.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                    {currentAngle.features.map((f, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] text-[#E5D5C0]"
                      >
                        <Check className="w-2.5 h-2.5 text-[#C5A880]" />
                        <span>{f}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* 8-Point Compass Scrub Indicator */}
                <div className="flex items-center justify-between gap-1 overflow-x-auto p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 no-scrollbar">
                  {angles.map((a, idx) => (
                    <button
                      key={a.id}
                      onClick={() => setCurrentAngleIndex(idx)}
                      className={`px-3 py-1.5 rounded-full text-[11px] tracking-wider uppercase transition-all whitespace-nowrap ${
                        currentAngleIndex === idx
                          ? "bg-[#C5A880] text-[#080B0E] font-semibold shadow-md"
                          : "text-[#A69E92] hover:text-white"
                      }`}
                    >
                      {a.label} ({a.degrees}°)
                    </button>
                  ))}
                </div>

                <div className="text-center text-[10px] tracking-widest uppercase text-[#C5A880]/80 pointer-events-none">
                  ↔ Click & Drag horizontally or tap any angle above to orbit the villa in 360°
                </div>
              </div>
            </div>
          ) : viewMode === "3d" ? (
            /* ========================================================================= */
            /* MODE 2: REAL 3D MODEL (.GLB / .GLTF) & TEXTURED ARCHITECTURAL SCENE        */
            /* ========================================================================= */
            <div className="relative w-full h-full cursor-grab active:cursor-grabbing">
              <div ref={mountRef} className="w-full h-full" />

              {/* Hidden file input for uploading .glb file */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".glb,.gltf"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* Top Action Bar (Upload Real Model + Model Guide) */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex flex-wrap items-center gap-2">
                {/* Upload Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isModelLoading}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#C5A880] text-[#080B0E] font-semibold text-xs tracking-wider uppercase hover:bg-white shadow-lg shadow-[#C5A880]/20 transition-all cursor-pointer"
                  title="Upload .glb or .gltf 3D model of your villa"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isModelLoading ? "Loading Model..." : "Load Actual Villa 3D Model (.GLB)"}</span>
                </button>

                {/* Instructions Pill */}
                <button
                  onClick={() => setShowModelGuide(!showModelGuide)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-[#E5D5C0] hover:border-[#C5A880] transition-colors"
                >
                  <Info className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>How to Add Actual Model</span>
                </button>

                {loadedModelName && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Loaded: {loadedModelName}</span>
                  </span>
                )}
              </div>

              {/* Viewpoint Camera Presets (Top Right) */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex flex-wrap justify-end gap-2 z-20">
                {(Object.keys(cameraPresets) as (keyof typeof cameraPresets)[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      const p = cameraPresets[key];
                      targetCameraPos.current.set(p.x, p.y, p.z);
                    }}
                    className="px-3 py-1.5 rounded-full text-[11px] tracking-wider uppercase backdrop-blur-md border bg-black/60 text-[#D2CBC1] border-white/10 hover:border-[#C5A880]/50"
                  >
                    {cameraPresets[key].name}
                  </button>
                ))}
              </div>

              {/* Day / Sunset / Night Lighting Controller (Bottom Left) */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10">
                <button
                  onClick={() => {
                    setLightingMode("day");
                    targetCameraPos.current.set(16, 12, 16);
                  }}
                  className={`p-2 rounded-full transition-all ${
                    lightingMode === "day" ? "bg-[#C5A880] text-[#080B0E]" : "text-[#A69E92] hover:text-white"
                  }`}
                  title="Daylight"
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setLightingMode("sunset");
                    targetCameraPos.current.set(14, 10, 18);
                  }}
                  className={`p-2 rounded-full transition-all ${
                    lightingMode === "sunset" ? "bg-[#C5A880] text-[#080B0E]" : "text-[#A69E92] hover:text-white"
                  }`}
                  title="Golden Sunset"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setLightingMode("night");
                    targetCameraPos.current.set(10, 6, 14);
                  }}
                  className={`p-2 rounded-full transition-all ${
                    lightingMode === "night" ? "bg-[#C5A880] text-[#080B0E]" : "text-[#A69E92] hover:text-white"
                  }`}
                  title="Midnight Glow"
                >
                  <Moon className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Drag Instruction */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] tracking-widest uppercase text-[#C5A880]">
                <RotateCw className="w-3 h-3 animate-spin" />
                <span>Click & Drag to Orbit 3D Architecture</span>
              </div>

              {/* 3D Model Guide Popover Modal */}
              {showModelGuide && (
                <div className="absolute inset-0 z-30 bg-black/90 backdrop-blur-md p-6 sm:p-10 flex items-center justify-center">
                  <div className="max-w-lg w-full glass-panel p-6 sm:p-8 rounded-2xl border border-[#C5A880]/40 shadow-2xl relative">
                    <button
                      onClick={() => setShowModelGuide(false)}
                      className="absolute top-4 right-4 text-white/60 hover:text-white text-sm"
                    >
                      ✕ Close
                    </button>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C5A880] mb-2 font-semibold">
                      <FileCode className="w-4 h-4" />
                      <span>3D Model Architecture Guide</span>
                    </div>
                    <h3 className="font-serif text-2xl text-white mb-3">
                      How to Show Your Actual Villa in 3D
                    </h3>
                    <div className="space-y-3 text-xs text-[#D2CBC1] font-light leading-relaxed">
                      <p>
                        A 3D model allows guests to rotate, inspect, and experience your villa from every angle:
                      </p>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                        <p className="font-medium text-white">Step 1: Get or export your villa model</p>
                        <p className="text-[11px] text-[#A69E92]">
                          • Export from <strong>SketchUp, Blender, Revit, 3ds Max, or Rhino</strong> as a <code className="text-[#C5A880]">.glb</code> or <code className="text-[#C5A880]">.gltf</code> file.<br />
                          • Or generate one from your smartphone photos using free AI 3D capture apps like <strong>Polycam, Luma AI, or Scaniverse</strong>.
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                        <p className="font-medium text-white">Step 2: Add it to the website</p>
                        <p className="text-[11px] text-[#A69E92]">
                          • <strong>Quick Test:</strong> Click the gold &ldquo;Load Actual Villa 3D Model (.GLB)&rdquo; button above and choose your file.<br />
                          • <strong>Permanent:</strong> Place your file at <code className="text-[#C5A880]">public/models/villa.glb</code>. The website will load it automatically for every visitor!
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowModelGuide(false)}
                      className="mt-5 w-full py-2.5 rounded-full bg-[#C5A880] text-[#080B0E] font-semibold text-xs uppercase tracking-wider"
                    >
                      Understood
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ========================================================================= */
            /* MODE 3: 2.5D INTERACTIVE DEPTH PARALLAX                                   */
            /* ========================================================================= */
            <div
              onMouseMove={handle25DMouseMove}
              onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
              className="relative w-full h-full flex items-center justify-center p-8 overflow-hidden bg-[#0A0D11] cursor-crosshair"
            >
              <div
                className="absolute inset-0 transition-transform duration-300 ease-out"
                style={{
                  transform: `scale(1.1) translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
                }}
              >
                <Image
                  src="/images/villa/hero-villa-exterior-day.webp"
                  alt="Luxora Villa Udaipur 2.5D Depth View"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
              </div>

              <div
                className="relative z-10 max-w-lg p-6 sm:p-8 rounded-2xl glass-panel border border-[#C5A880]/30 shadow-2xl transition-transform duration-200 ease-out"
                style={{
                  transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px) rotateX(${
                    mousePos.y * -10
                  }deg) rotateY(${mousePos.x * 10}deg)`,
                }}
              >
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-medium block mb-2">
                  Spatial Perspective • 2.5D
                </span>
                <h3 className="font-serif text-3xl text-white mb-2">
                  Luxora Villa Layered Silhouette
                </h3>
                <p className="text-xs sm:text-sm text-[#D2CBC1] font-light leading-relaxed mb-4">
                  Multi-layered depth projection simulating spatial parallax across cantilevered pavilions and private water decks.
                </p>
                <a
                  href="#booking"
                  className="inline-flex px-5 py-2 rounded-full bg-[#C5A880] text-[#080B0E] text-xs font-semibold tracking-wider uppercase hover:bg-white transition-colors"
                >
                  Reserve Now
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
