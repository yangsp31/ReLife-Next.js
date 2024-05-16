import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // OrbitControls 임포트
import { Button } from "@/components/ui/button";

export default function Component() {
  const containerRef = useRef(null);
  const rotationSpeed = 0.005;

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      '/path/to/your/image.jpg', // 이미지 경로
      (texture) => {
        const geometry = new THREE.PlaneGeometry(10, 10);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);
      },
      undefined,
      (error) => {
        console.error('An error happened', error);
      }
    );

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);
      scene.rotation.y += rotationSpeed;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div className="flex justify-end items-center h-screen bg-gradient-to-br from-purple-200 to-blue-200">
      <div className="flex items-center w-full min-h-[700px] gap-4 px-4 md:px-8 xl:gap-8 mr-auto translate-x-[3cm]">
        <div className="relative">
          <div
            ref={containerRef}
            className="aspect-video overflow-hidden rounded-xl object-cover object-center border"
            style={{ width: '1280px', height: '720px' }}
          />
          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-md text-sm font-medium text-gray-900 dark:bg-gray-900 dark:text-gray-50">
            A
          </div>
        </div>
        <div className="flex flex-col gap-2 h-full justify-center">
          <Button className="w-24 h-24" variant="outline">
            Download
          </Button>
          <Button className="w-24 h-24" variant="outline">
            Regenerate
          </Button>
        </div>
      </div>
    </div>
  );
}