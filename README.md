# 2021-11-15

### <a href="https://daltonjmcgee.github.io/2021-11-15/" target="_blank">Live Demo</a>

### Technologies
* [Typescript](https://www.typescriptlang.org/)
* [ThreeJS](https://threejs.org/)
* [gsap](https://greensock.com/)
* [Webpack](https://webpack.js.org/)

### Resources and details

The only external resources I used in this project was the "disc.png" which came from the [ThreeJS examples library](https://github.com/mrdoob/three.js/tree/dev/examples/textures/sprites). This was used to render dots for the particles as opposed to the squares that is the default mapping with the THREE.PointsMaterial class.

The project itself wasn't terribly hard. The basics is that you have to instantiate a shape buffer Geometry object (in my case, two shapes), then get their vertices' positions using the `this.geometry.getAttribute()` function. This is returned as an `ArrayLike` type. Then you instantiate a `BufferGeometry` object and set its position equal to the array of vertices provided by the aforementioned function. Then you setup your gsap timeline to trigger on various divs as they scroll by where you give the `Points` object new cooridinates.

In the case of the Sphere and the Torus, the Torus includes fewer vertices on purpose. This leaves some particles out in the "ether" rotating around it. I thought it looked nice.
