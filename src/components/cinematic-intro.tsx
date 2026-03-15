"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, useTexture, Trail, Sparkles } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// 🌍 Earth with atmosphere glow and clouds
function Earth({ onClick, onReady }: { onClick: () => void, onReady: () => void }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const cloudsRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const [textures, setTextures] = useState<any>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    Promise.all([
      loader.loadAsync('/textures/earth.jpg'),
      loader.loadAsync('/textures/earth-clouds.png'),
      loader.loadAsync('/textures/earth-night.png'),
    ]).then(([earthMap, cloudsMap, nightMap]) => {
      setTextures({ earthMap, cloudsMap, nightMap });
      onReady();
    }).catch((error) => {
      console.error("Error loading textures:", error);
      // Still call onReady even if textures fail to load
      onReady();
    });
  }, [onReady]);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.0008;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0012;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y += 0.0004;
    }
  });

  if (!textures) {
    // Fallback material if textures haven't loaded
    return (
      <group position={[0, -1, -4]}>
        <mesh ref={mesh} onClick={onClick}>
          <sphereGeometry args={[2.5, 64, 64]} />
          <meshStandardMaterial color="#2a5f8a" emissive="#1a3f5a" />
        </mesh>
      </group>
    );
  }

  return (
    <group position={[0, -1, -4]}>
      {/* Atmosphere glow layer */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.58, 64, 64]} />
        <meshPhongMaterial 
          color="#4a7db5" 
          transparent 
          opacity={0.15} 
          emissive="#1a4a7a"
          side={THREE.BackSide}
        />
      </mesh>

      {/* Earth core */}
      <mesh ref={mesh} onClick={onClick}>
        <sphereGeometry args={[2.5, 128, 128]} />
        <meshStandardMaterial 
          map={textures.earthMap}
          emissiveMap={textures.nightMap}
          emissiveIntensity={0.3}
          emissive="#334466"
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.52, 128, 128]} />
        <meshPhongMaterial 
          map={textures.cloudsMap}
          transparent 
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer atmospheric glow */}
      <mesh>
        <sphereGeometry args={[2.7, 64, 64]} />
        <meshBasicMaterial 
          color="#88aaff" 
          transparent 
          opacity={0.05} 
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// 🧑‍🚀 Astronaut HTML component
function AstronautCharacter() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setHasEntered(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll(
    mounted
      ? {
          target: containerRef,
          offset: ["start start", "end end"]
        }
      : {}
  );

  const rawX = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    ["5vw", "30vw", "40vw", "50vw", "70vw", "120vw", "70vw", "30vw", "5vw", "-10vw", "-10vw"]
  );

  const rawRotateZ = useTransform(
    scrollYProgress,
    [0, 0.1, 0.35, 0.6, 0.85, 1],
    [0, 0, 20, -15, 25, 0]
  );

  const rawFaceRight = useTransform(
    scrollYProgress,
    [0, 0.1, 0.15, 0.2, 0.25, 0.4, 0.45, 0.5, 0.55, 0.8, 0.85, 1],
    [1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1]
  );

  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.35, 0.6, 0.85, 1],
    [1, 1, 1.05, 0.95, 1.02, 1]
  );

  const x = useSpring(rawX, { stiffness: 30, damping: 20, restDelta: 0.001 });
  const rotateZ = useSpring(rawRotateZ, { stiffness: 35, damping: 20, restDelta: 0.001 });
  const faceRight = useSpring(rawFaceRight, { stiffness: 30, damping: 20, restDelta: 0.001 });
  const scale = useSpring(rawScale, { stiffness: 30, damping: 20, restDelta: 0.001 });

  const [floatOffset, setFloatOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frameId: number;
    const animate = (time: number) => {
      setFloatOffset({
        x: Math.cos(time / 1800) * 8,
        y: Math.sin(time / 1200) * 15
      });
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const combinedX = useTransform(() => x.get() + floatOffset.x);
  const combinedY = useTransform(() => floatOffset.y);

  const animatedX = useSpring(combinedX, { stiffness: 30, damping: 20, restDelta: 0.001 });
  const animatedY = useSpring(combinedY, { stiffness: 30, damping: 20, restDelta: 0.001 });

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 5 }}>
      <motion.div
        initial={{ x: "150vw", opacity: 1 }}
        animate={hasEntered ? { 
          x: [ 
            "-10vw", 
            "10vw", 
            "15vw", 
            "20vw", 
            "25vw", 
            "30vw", 
            "25vw", 
            "20vw", 
            "15vw", 
            "10vw", 
            "10vw",
            "5vw"
          ],
          opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          rotateZ: [5, 10, 15, 20, 25, 30, 25, 20, 15, 10, 5, 0],
        } : { x: "150vw", opacity: 1 }}
        transition={{ 
          duration: 30, 
          times: [0, 0.1, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 0.95, 1],
          ease: "linear"
        }}
        style={{
          position: "absolute",
          top: "15%",
          left: 0,
          rotateZ,
          scale,
          width: "45%",
          maxWidth: "380px",
          minWidth: "130px",
        }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/15 blur-[60px] rounded-full scale-150" />
          <div className="relative w-full">
            <motion.img
              src="/2_png.png"
              alt="Astronaut"
              className="w-full h-auto drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              animate={{ opacity: faceRight.get() > 0.5 ? 1 : 0 }}
              transition={{ duration: 0.15 }}
            />
            <motion.img
              src="/1_png.png"
              alt="Astronaut"
              className="w-full h-auto drop-shadow-[0_0_40px_rgba(255,255,255,0.2)] absolute inset-0 top-0 left-0"
              style={{ transform: "scaleX(-1)" }}
              animate={{ opacity: faceRight.get() > 0.5 ? 0 : 1 }}
              transition={{ duration: 0.15 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ☄️ Meteor shower effect
function MeteorShower() {
  const meteors = useRef<THREE.Group>(null!);
  const count = 15;
  const positions = useRef<Float32Array>(new Float32Array(count * 3));
  const [initialized, setInitialized] = useState(false);
  const speeds = useRef<number[]>([]);

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 30;
      positions.current[i * 3 + 1] = (Math.random() - 0.5) * 20 + 10;
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 30 - 10;
      speeds.current.push(Math.random() * 0.005 + 0.002);
    }
    setInitialized(true);
  }, []);

  useFrame(() => {
    if (!meteors.current) return;
    
    meteors.current.children.forEach((meteor, i) => {
      const speed = speeds.current[i];
      meteor.position.y -= speed * 0.8;
      meteor.position.x += speed * 0.4;
      
      if (meteor.position.y < -10) {
        meteor.position.set(
          (Math.random() - 0.5) * 30,
          15,
          (Math.random() - 0.5) * 30 - 10
        );
        speeds.current[i] *= 1.2;
        if (speeds.current[i] > 0.03) speeds.current[i] = 0.03;
      }
    });
  });

  return (
    <group ref={meteors}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} position={[positions.current[i * 3], positions.current[i * 3 + 1], positions.current[i * 3 + 2]]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#ffaa66" transparent opacity={0.9} blending={THREE.AdditiveBlending} />
          {initialized && (
            <Trail
              width={0.5}
              length={8}
              color={new THREE.Color("#ffaa66")}
              attenuation={(t) => t * t}
            >
              <mesh>
                <sphereGeometry args={[0.1, 8, 8]} />
              </mesh>
            </Trail>
          )}
        </mesh>
      ))}
    </group>
  );
}



// 🎥 Cinematic camera controller for zoom effect
function CameraController({ isZooming, onZoomComplete }: { isZooming: boolean, onZoomComplete: () => void }) {
  const { camera } = useThree();
  
  useFrame(() => {
    if (isZooming) {
      camera.position.lerp(new THREE.Vector3(0, 0, 2), 0.03);
      
      if (camera.position.z < 2.1) {
        onZoomComplete();
      }
    }
  });

  return null;
}

// Main component
export default function CinematicIntro({ onEnter }: { onEnter: () => void }) {
  const [isReady, setIsReady] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleEarthClick = () => {
    if (isReady && !isZooming) {
      setIsZooming(true);
    }
  };

  const handleZoomComplete = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  const handleEarthReady = () => {
    setIsReady(true);
  };

  return (
    <div className={`fixed inset-0 z-[9999] bg-black transition-opacity duration-800 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      {/* Loading overlay */}
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center text-white text-2xl z-10 bg-black bg-opacity-80">
          <div className="text-center">
            <div className="mb-4">Loading Space Experience...</div>
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      )}

      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        {/* Lighting */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2.5} />
        <pointLight position={[-3, 2, 2]} intensity={0.8} color="#4466aa" />
        
        {/* Stars with parallax effect */}
        <Stars
          radius={400}
          depth={100}
          count={12000}
          factor={8}
          saturation={0.5}
          fade
          speed={0.5}
        />
        
        {/* Additional sparkles for depth */}
        <Sparkles
          count={200}
          scale={20}
          size={2}
          speed={0.3}
          opacity={0.3}
          color="#88aaff"
        />
        
        {/* Main elements */}
        <Earth onClick={handleEarthClick} onReady={handleEarthReady} />
        <MeteorShower />        
        
        {/* Camera controller for zoom */}
        <CameraController isZooming={isZooming} onZoomComplete={handleZoomComplete} />
      </Canvas>

      {/* HTML Astronaut Character */}
      <AstronautCharacter />
    </div>
  );
}