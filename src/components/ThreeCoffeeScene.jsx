import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCoffeeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Ambient & Directional Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(10, 15, 12);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4d4d8, 1.8);
    rimLight.position.set(-12, -8, -10);
    scene.add(rimLight);

    // 1. Create Realistic 3D Coffee Bean Geometry
    function createCoffeeBeanGeometry() {
      const geom = new THREE.SphereGeometry(1, 32, 24);
      const pos = geom.attributes.position;
      // Sculpt bean shape: elongate along Y, compress Z, indent center crease
      for (let i = 0; i < pos.count; i++) {
        let x = pos.getX(i);
        let y = pos.getY(i);
        let z = pos.getZ(i);

        // Elongate
        y *= 1.45;
        // Flatten
        z *= 0.68;

        // Front Crease indentation
        if (z > 0 && Math.abs(x) < 0.45) {
          const indent = (1.0 - Math.abs(x) / 0.45) * 0.35;
          z -= indent;
        }

        pos.setXYZ(i, x, y, z);
      }
      geom.computeVertexNormals();
      return geom;
    }

    const beanGeometry = createCoffeeBeanGeometry();
    const beanMaterial = new THREE.MeshStandardMaterial({
      color: 0x482618, // Rich natural roasted coffee bean tone matching landing page
      roughness: 0.36,
      metalness: 0.12,
      bumpScale: 0.05,
    });

    // Spawn 16 floating interactive coffee beans
    const beans = [];
    const BEAN_COUNT = 16;

    for (let i = 0; i < BEAN_COUNT; i++) {
      const bean = new THREE.Mesh(beanGeometry, beanMaterial.clone());
      const scale = 0.45 + Math.random() * 0.55;
      bean.scale.set(scale, scale, scale);

      bean.position.set(
        (Math.random() - 0.5) * 26,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10 - 2
      );

      bean.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      bean.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.018,
        floatSpeed: 0.4 + Math.random() * 0.6,
        baseY: bean.position.y,
        seed: Math.random() * 100,
      };

      scene.add(bean);
      beans.push(bean);
    }

    // 2. Custom WebGL Shader Golden Roasting Embers / Steam Particle Cloud
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 32;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
      scales[i] = Math.random() * 12.0 + 4.0;
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeometry.setAttribute(
      'scale',
      new THREE.BufferAttribute(scales, 1)
    );

    // Custom Particle Vertex & Fragment Shader
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0xffffff) },
      },
      vertexShader: `
        uniform float uTime;
        attribute float scale;
        varying float vAlpha;
        void main() {
          vec3 p = position;
          p.y += sin(uTime * 0.8 + position.x * 0.5) * 0.4;
          p.x += cos(uTime * 0.6 + position.y * 0.5) * 0.3;
          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = scale * (16.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = smoothstep(20.0, 5.0, -mvPosition.z);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          // Circular particle with soft glowing falloff
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float strength = pow(1.0 - d * 2.0, 2.0);
          gl_FragColor = vec4(uColor, strength * 0.75 * vAlpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse Tracking for Interactive Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera parallax
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      camera.position.x = currentMouseX * 1.8;
      camera.position.y = -currentMouseY * 1.2;
      camera.lookAt(0, 0, 0);

      // Animate floating beans
      beans.forEach((b) => {
        b.rotation.x += b.userData.rotSpeedX;
        b.rotation.y += b.userData.rotSpeedY;
        b.position.y =
          b.userData.baseY +
          Math.sin(elapsed * b.userData.floatSpeed + b.userData.seed) * 0.6;
      });

      // Animate particle shader
      particleMaterial.uniforms.uTime.value = elapsed;

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      beanGeometry.dispose();
      beanMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-85"
    />
  );
}
