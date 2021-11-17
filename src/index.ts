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

// Create new scene
const scene: Scene = new Scene();
const camera: PerspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create renderer.
const renderer: WebGLRenderer = new WebGLRenderer();

// Create and position lights to illuminate the scene.
const pointLight001: PointLight = new PointLight(0xffff54, 5, 100);
const pointLight002: PointLight = new PointLight(0xff54ff, 5, 100);
const ambientLight001: AmbientLight = new AmbientLight(0xffffff, .15);
pointLight001.position.set(-50, -25, 50);
pointLight002.position.set(50, -50, 50);

// Create sphere geometry so we can gather it's vertices.
const sphereGeometry: SphereBufferGeometry = new SphereBufferGeometry(1);

// Create torus geometry so we can gather it's vertices too!
const torusGeometry: TorusBufferGeometry = new TorusBufferGeometry(1, .4, 8, 50);

// Get array of vertices of geometric shapes.
const sphereVertices: ArrayLike<number> = sphereGeometry.getAttribute('position').array;
const torusVertices: ArrayLike<number> = torusGeometry.getAttribute('position').array;

// Create our non-shaped geometric object.
const particles: BufferGeometry = new BufferGeometry();

// Set the initial vertices of the object to that of the sphere.
particles.setAttribute('position', new Float32BufferAttribute(sphereVertices, 3))

// Load disc.png from image assets
const disc = new TextureLoader().load('/images/disc.png');

// Create a material for the particles and set config.
const particlesMaterial: PointsMaterial = new PointsMaterial({
  color: 0xee9944,
  size: .05,
  map: disc,
  transparent: true,
  opacity: .75,
});

// Create Points mesh.
const points: Points = new Points(particles, particlesMaterial);

// Add items to scene.
scene.add(pointLight001);
scene.add(pointLight002);
scene.add(ambientLight001);
scene.add(points);

// create rendered and add window to top of DOM.
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.prepend(renderer.domElement);

gsap.registerPlugin(ScrollTrigger);

// Create various timelines to run.
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#globe",
    start: "center bottom",
    end: "center top",
    scrub: 2.5,
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
    scrub: 2.5,
  }
});
const tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: "#torus",
    start: "center bottom",
    end: "65% center",
    scrub: 2.5,
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


// This watches for window resizing to make this responsive.
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
