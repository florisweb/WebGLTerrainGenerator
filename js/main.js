


// optimized = 39112;
// unoptimized = 77350

const Camera = new _Camera();
const World = new _World({worldSize: 100, tileCount: 128});




let light = new THREE.PointLight(0xffffff, 1, 700);
light.position.set(0, 100, 0);
World.scene.add(light);



World.setup();











