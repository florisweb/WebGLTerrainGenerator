
function _perlin(_frequency) {
	this.f = 1 / _frequency;
	this.get = function(x, y) {
		return (1 + perlin.get((2 * x - 1) / this.f, (2 * y - 1) / this.f)) / 2;
	}
}
let Perlin1 = new _perlin(2);
let Perlin2 = new _perlin(5);
let Perlin3 = new _perlin(10);




const Camera = new _Camera();
const World = new _World({worldSize: 100, tileCount: 300});




let light = new THREE.PointLight(0xffffff, 1, 700);
light.position.set(0, 100, 0);
World.scene.add(light);



World.setup();
const InputHandler = new _InputHandler(World.renderer.domElement);










