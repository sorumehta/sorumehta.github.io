import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg") as HTMLCanvasElement });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const saurabhTexture = new THREE.TextureLoader().load("saurabh.png");
const saurabh = new THREE.Mesh(new THREE.BoxGeometry(9, 9, 9), new THREE.MeshBasicMaterial({ map: saurabhTexture }));
scene.add(saurabh);

const ambientLight = new THREE.AmbientLight(0xffffff);
// move it away from the center
ambientLight.position.set(20, 20, 20);
scene.add(ambientLight);

// game loop
function animate() {
  requestAnimationFrame(animate);
  saurabh.rotation.x += 0.005;
  saurabh.rotation.y += 0.005;
  saurabh.rotation.z += 0.0002;
  renderer.render(scene, camera);
}
animate();
