


// optimized = 39112;
// unoptimized = 77350

const Camera = new _Camera();
const World = new _World({worldSize: 100, tileCount: 64});




let light = new THREE.PointLight(0xffffff, 2, 700);
light.position.set(20, 80, 0);
World.scene.add(light);



World.setup();











