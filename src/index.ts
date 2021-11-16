import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  ConeGeometry,
  MeshStandardMaterial,
  Mesh,
  PointLight,
  AmbientLight
} from 'three';
import './main.css';

const scene: Scene = new Scene();
const camera: PerspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer: WebGLRenderer = new WebGLRenderer();

const pointLight001: PointLight = new PointLight(0xffff54, 5, 100);
const pointLight002: PointLight = new PointLight(0xff54ff, 5, 100);
const ambientLight001: AmbientLight = new AmbientLight(0xffffff, .15);

const coneGeometry: ConeGeometry = new ConeGeometry(1.5, 1.5, 3);
const coneMaterial: MeshStandardMaterial = new MeshStandardMaterial();
const cone = new Mesh(coneGeometry, coneMaterial);

scene.add(pointLight001);
scene.add(pointLight002);
scene.add(ambientLight001);
pointLight001.position.set( -50, -25, 50 );
pointLight002.position.set( 50, -50, 50 );

scene.add(cone);
cone.rotation.x = -.5;


renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
  cone.rotation.y += Math.cos(1)*.01;
  cone.rotation.x += Math.tan(1)*.01;
  cone.rotation.z += Math.sin(1)*.01;
}
animate();
