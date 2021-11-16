import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  ConeBufferGeometry,
  MeshStandardMaterial,
  Mesh,
  PointLight,
  Points,
  AmbientLight,
  BufferGeometry,
  PointsMaterial,
  Float32BufferAttribute,
  SphereBufferGeometry,
  TangentSpaceNormalMap
} from 'three';
import { gsap } from 'gsap';
import './main.css';

const scene: Scene = new Scene();
const camera: PerspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer: WebGLRenderer = new WebGLRenderer();

const pointLight001: PointLight = new PointLight(0xffff54, 5, 100);
const pointLight002: PointLight = new PointLight(0xff54ff, 5, 100);
const ambientLight001: AmbientLight = new AmbientLight(0xffffff, .15);

// const coneGeometry: ConeBufferGeometry = new ConeBufferGeometry(1.5, 1.5, 3);
// const coneMaterial: MeshStandardMaterial = new MeshStandardMaterial();
// const cone = new Mesh(coneGeometry, coneMaterial);
// const conePosition = coneGeometry.getAttribute('position');

const sphereGeometry: SphereBufferGeometry = new SphereBufferGeometry(1);
const sphereMaterial: MeshStandardMaterial = new MeshStandardMaterial();
const sphere = new Mesh(sphereGeometry, sphereMaterial);

const vertices: ArrayLike<number> = sphere.geometry.getAttribute('position').array;
const particles: BufferGeometry = new BufferGeometry();
particles.setAttribute('position', new Float32BufferAttribute(vertices, 3))
const particlesMaterial: PointsMaterial = new PointsMaterial({ color: 0xee9944, size: 0.01 });
const points: Points = new Points(particles, particlesMaterial);


scene.add(pointLight001);
scene.add(pointLight002);
scene.add(ambientLight001);
pointLight001.position.set(-50, -25, 50);
pointLight002.position.set(50, -50, 50);

scene.add(points);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let toggle = false;
document.addEventListener('click', () => {
  const tl = gsap.timeline();
  if (!toggle) {
    let newVertices: Array<number> = []
    for (let i = 0; i < vertices.length; i++) {
      newVertices.push((Math.random() - 0.5) * 30);
    }
      tl.to(points.geometry.getAttribute('position').array, {
      endArray: newVertices,
      duration: 10,
      // Make sure to tell it to update
      onUpdate: () => points.geometry.attributes.position.needsUpdate = true
    })
  } else {
    tl.reverse();
  }
  toggle = !toggle;
})
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  points.rotation.y += Math.tan(.015);
  points.rotation.z += Math.tan(.001);
}
animate();
