import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Particle system
    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      velocities[i * 3] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom shader material for premium glow particles
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uColor: { value: new THREE.Color(0.35, 0.35, 0.4) },
      },
      vertexShader: `
        attribute float size;
        uniform float uTime;
        uniform vec2 uMouse;
        varying float vAlpha;

        void main() {
          vec3 pos = position;

          // Organic floating motion
          pos.x += sin(uTime * 0.3 + position.y * 0.5) * 0.15;
          pos.y += cos(uTime * 0.2 + position.x * 0.3) * 0.15;
          pos.z += sin(uTime * 0.25 + position.z * 0.4) * 0.1;

          // Mouse influence — subtle gravitational pull
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          float dist = length(mvPosition.xy - uMouse * 2.0);
          float mouseInfluence = smoothstep(5.0, 0.0, dist) * 0.3;
          mvPosition.xy += normalize(uMouse * 2.0 - mvPosition.xy) * mouseInfluence;

          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = size * (200.0 / -mvPosition.z);

          // Distance-based fade
          float depth = smoothstep(15.0, 2.0, -mvPosition.z);
          vAlpha = depth * 0.6;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;

        void main() {
          // Soft circular particle with glow
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;

          float glow = 1.0 - smoothstep(0.0, 0.5, dist);
          glow = pow(glow, 2.0);

          gl_FragColor = vec4(uColor, glow * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 8;

    // Mouse tracking
    const mouse = new THREE.Vector2(0.5, 0.5);
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      material.uniforms.uTime.value = elapsed;
      material.uniforms.uMouse.value.lerp(mouse, 0.05);

      // Slow orbital rotation
      particles.rotation.y = elapsed * 0.02;
      particles.rotation.x = Math.sin(elapsed * 0.01) * 0.1;

      // Update particle positions for drift
      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3] += velocities[i * 3];
        pos[i * 3 + 1] += velocities[i * 3 + 1];
        pos[i * 3 + 2] += velocities[i * 3 + 2];

        // Boundary wrapping
        for (let j = 0; j < 3; j++) {
          if (Math.abs(pos[i * 3 + j]) > 10) {
            pos[i * 3 + j] *= -0.95;
          }
        }
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}
