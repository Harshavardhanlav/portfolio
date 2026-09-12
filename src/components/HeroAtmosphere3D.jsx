import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const smokeVertexShader = `
  uniform float uTime;
  uniform float uSeed;
  varying vec2 vUv;

  void main() {
    vec3 transformed = position;
    float drift = sin(uTime * 0.09 + uSeed * 8.0) * 0.035;
    transformed.x += drift + sin(uTime * 0.13 + uSeed * 17.0 + position.y * 2.0) * 0.018;
    transformed.y += cos(uTime * 0.08 + uSeed * 13.0) * 0.025;

    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vUv = uv;
  }
`;

const smokeFragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uSeed;
  uniform float uOpacity;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int octave = 0; octave < 4; octave++) {
      value += amplitude * noise(p);
      p = p * 2.04 + 17.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 p = (vUv - 0.5) * 2.0;
    vec2 flow = vec2(uTime * 0.035, -uTime * 0.055);
    float broadNoise = fbm(p * 1.75 + flow + uSeed * 4.7);
    float turbulentNoise = fbm(p * 3.3 - flow * 1.7 + broadNoise * 0.85 + uSeed * 8.1);
    float wisps = fbm(p * 6.2 + flow * 2.4 - uSeed * 3.4);
    float edgeNoise = fbm(p * 2.1 - flow * 0.65 + uSeed * 6.0);

    // A noisy boundary makes each plane dissolve like vapor instead of reading as a circle.
    float irregularRadius = 0.86 + (edgeNoise - 0.5) * 0.58;
    float boundary = smoothstep(1.06, 0.2, length(p) - irregularRadius * 0.34);
    float density = smoothstep(0.38, 0.7, broadNoise * 0.55 + turbulentNoise * 0.45);
    density *= smoothstep(0.18, 0.8, wisps * 0.7 + broadNoise * 0.3);
    density *= boundary;

    float light = smoothstep(0.3, 0.82, turbulentNoise) * 0.72 + broadNoise * 0.28;
    float alpha = density * (0.045 + light * 0.18) * uOpacity;
    if (alpha < 0.008) discard;
    vec3 smokeColor = mix(uColor * 0.3, uColor * 1.42, light);
    gl_FragColor = vec4(smokeColor, alpha);
  }
`;

const emberVertexShader = `
  uniform float uTime;
  attribute float aSize;
  attribute float aSpeed;
  attribute float aDrift;
  varying float vGlow;

  void main() {
    vec3 transformed = position;
    float progress = fract(uTime * aSpeed + position.z);
    transformed.y += progress * 0.9;
    transformed.x += sin(progress * 4.0 + position.z * 12.0) * aDrift;
    transformed.y = mod(transformed.y + 1.0, 2.0) - 1.0;

    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * (220.0 / -mvPosition.z);
    vGlow = sin(progress * 3.14159);
  }
`;

const emberFragmentShader = `
  varying float vGlow;

  void main() {
    float distanceFromCenter = length(gl_PointCoord - 0.5);
    float soft = smoothstep(0.5, 0.04, distanceFromCenter);
    float alpha = soft * (0.1 + vGlow * 0.34);
    if (alpha < 0.02) discard;
    gl_FragColor = vec4(1.0, 0.19, 0.12, alpha);
  }
`;

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function createSmokeMasses(material) {
  const masses = [
    [-0.68, 0.38, 0.48, 0.62],
    [-0.83, 0.08, 0.42, 0.72],
    [-0.56, -0.22, 0.58, 0.46],
    [-0.34, -0.64, 0.78, 0.5],
    [0.02, -0.72, 0.62, 0.42],
    [0.29, -0.46, 0.34, 0.3],
    [-0.94, 0.48, 0.3, 0.38],
    [-0.48, 0.68, 0.38, 0.34],
  ];
  const geometry = new THREE.PlaneGeometry(2, 2);
  const smoke = new THREE.Group();

  masses.forEach(([x, y, width, height], index) => {
    const mass = new THREE.Mesh(geometry, material.clone());
    mass.position.set(x, y, -0.4 + index * 0.02);
    mass.scale.set(width, height, 1);
    mass.material.uniforms.uSeed.value = 0.7 + index * 1.37;
    mass.material.uniforms.uOpacity.value = index === 4 ? 0.82 : 1;
    smoke.add(mass);
  });

  return smoke;
}

function createEmberGeometry(count) {
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const speeds = new Float32Array(count);
  const drifts = new Float32Array(count);

  for (let index = 0; index < count; index += 1) {
    const left = index < count / 2;
    positions[index * 3] = left ? randomBetween(-1.02, -0.82) : randomBetween(0.82, 1.02);
    positions[index * 3 + 1] = randomBetween(-0.98, -0.42);
    positions[index * 3 + 2] = Math.random();
    sizes[index] = randomBetween(0.012, 0.027);
    speeds[index] = randomBetween(0.08, 0.2);
    drifts[index] = randomBetween(0.025, 0.09) * (Math.random() > 0.5 ? 1 : -1);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
  geometry.setAttribute('aDrift', new THREE.BufferAttribute(drifts, 1));
  return geometry;
}

export default function HeroAtmosphere3D() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.className = 'hero-atmosphere-canvas';
    host.appendChild(renderer.domElement);

    const smokeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#9f1f2c') },
        uSeed: { value: 1 },
        uOpacity: { value: 1 },
      },
      vertexShader: smokeVertexShader,
      fragmentShader: smokeFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const smoke = createSmokeMasses(smokeMaterial);
    scene.add(smoke);

    const emberMaterial = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: emberVertexShader,
      fragmentShader: emberFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const embers = new THREE.Points(createEmberGeometry(150), emberMaterial);
    scene.add(embers);

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(Math.max(1, width), Math.max(1, height), false);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    const clock = new THREE.Clock();
    let frameId;
    const render = () => {
      const elapsed = clock.getElapsedTime();
      const time = reducedMotion ? 0 : elapsed;
      smoke.traverse((mass) => {
        if (mass.isMesh) {
          mass.material.uniforms.uTime.value = time;
        }
      });
      emberMaterial.uniforms.uTime.value = time;
      renderer.render(scene, camera);
      if (!reducedMotion) {
        frameId = requestAnimationFrame(render);
      }
    };
    render();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      smokeMaterial.dispose();
      smoke.traverse((mass) => {
        if (mass.isMesh) {
          mass.material.dispose();
        }
      });
      smoke.children[0]?.geometry.dispose();
      embers.geometry.dispose();
      emberMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="hero-atmosphere-3d" aria-hidden="true" />;
}
