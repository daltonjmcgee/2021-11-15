import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  MeshStandardMaterial,
  Mesh,
  PointLight,
  Points,
  AmbientLight,
  BufferGeometry,
  PointsMaterial,
  Float32BufferAttribute,
  SphereBufferGeometry,
  TorusBufferGeometry,
  TextureLoader
} from 'three';
import { gsap, Power1 } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './main.css';
import './assets/images/disc.png';

const scene: Scene = new Scene();
const camera: PerspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer: WebGLRenderer = new WebGLRenderer();

const pointLight001: PointLight = new PointLight(0xffff54, 5, 100);
const pointLight002: PointLight = new PointLight(0xff54ff, 5, 100);
const ambientLight001: AmbientLight = new AmbientLight(0xffffff, .15);

const standardMaterial: MeshStandardMaterial = new MeshStandardMaterial();

const sphereGeometry: SphereBufferGeometry = new SphereBufferGeometry(1);
const sphere = new Mesh(sphereGeometry, standardMaterial);

const torusGeometry: TorusBufferGeometry = new TorusBufferGeometry(1, .4, 8, 50);
const torus = new Mesh(torusGeometry, standardMaterial);

// Get array of vertices of mesh.
const sphereVertices: ArrayLike<number> = sphere.geometry.getAttribute('position').array;
const torusVertices: ArrayLike<number> = torus.geometry.getAttribute('position').array;

const particles: BufferGeometry = new BufferGeometry();
particles.setAttribute('position', new Float32BufferAttribute(sphereVertices, 3))

const disc = new TextureLoader().load('/images/disc.png');
const particlesMaterial: PointsMaterial = new PointsMaterial({
  color: 0xee9944,
  size: .05,
  map: disc,
  transparent: true,
  opacity: .75,
});
const points: Points = new Points(particles, particlesMaterial);


scene.add(pointLight001);
scene.add(pointLight002);
scene.add(ambientLight001);
pointLight001.position.set(-50, -25, 50);
pointLight002.position.set(50, -50, 50);

scene.add(points);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.prepend(renderer.domElement);

let toggle = false;
gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#globe",
    start: "center bottom",
    end: "center top",
    scrub: 1.5,
  }
});
// const tl_left = gsap.timeline({scrollTrigger:{
//   trigger: "#globe_left",
//   start: "center bottom",
//   end: "top bottom",
//   toggleActions: "play none reverse none"
// }});
// const tl_right = gsap.timeline({scrollTrigger:{
//   trigger: "#explostion_right",
//   start: "center bottom",
//   end: "top bottom",
//   toggleActions: "play none reverse none"
// }});
const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: "#explosion",
    start: "center bottom",
    end: "top top",
    scrub: 1.5,
  }
});
const tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: "#torus",
    start: "center bottom",
    end: "center top",
    scrub: 1.5,
  }
});
let newVertices: Array<number> = []
for (let i = 0; i < sphereVertices.length; i++) {
  newVertices.push((Math.random() - 0.5) * 15);
}
tl.to(points.geometry.getAttribute('position').array, {
  endArray: <Array<number>>sphereVertices,
  onUpdate: () => points.geometry.attributes.position.needsUpdate = true,
})
// tl_left.to(points.position, {x: -5, duration: 2, ease: Power1.easeInOut});
tl2.to(points.geometry.getAttribute('position').array, {
  endArray: newVertices,
  onUpdate: () => points.geometry.attributes.position.needsUpdate = true,
})
// tl_right.to(points.position, {x:0, duration: 2, ease: Power1.easeInOut});
tl3.to(points.geometry.getAttribute('position').array, {
  endArray: <Array<number>>torusVertices,
  onUpdate: () => points.geometry.attributes.position.needsUpdate = true,
})

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  points.rotation.y += Math.tan(.005);
  points.rotation.z += Math.tan(.001);
}
animate();
