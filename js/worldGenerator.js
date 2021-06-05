
function _perlin(_frequency) {
	this.f = 1 / _frequency;
	this.get = function(x, y) {
		return (1 + perlin.get((2 * x - 1) / this.f, (2 * y - 1) / this.f)) / 2;
	}
}
let Perlin1 = new _perlin(2);
let Perlin2 = new _perlin(5);
let Perlin3 = new _perlin(10);


function _WorldGenerator() {

	this.createWorld = function({tileCount, worldSize}) {
		let material1 = new THREE.MeshLambertMaterial({color: 0x00FF77});
		let material2 = new THREE.MeshLambertMaterial({color: 0x999999});
		let material3 = new THREE.MeshLambertMaterial({color: 0x0000ff});

		let geometry1 = new THREE.Geometry();
		let geometry2 = new THREE.Geometry();
		let geometry3 = new THREE.Geometry();

		const waterHeight = 25;
		const blockSize = worldSize / tileCount;


		for (let x = 0; x < tileCount; x++)
		{
			for (let z = 0; z < tileCount; z++)
			{
				let height = (Perlin1.get(x / tileCount, z / tileCount) * 10 + Perlin2.get(x / tileCount, z / tileCount) * 2 + Perlin3.get(x / tileCount, z / tileCount)) * 5; 
				if (height < waterHeight) height = waterHeight;

				let geometry = new THREE.BoxGeometry(blockSize, height, blockSize);
				// let geometry = new THREE.PlaneGeometry(blockSize, blockSize);

				let Mesh = new THREE.Mesh(geometry);
				Mesh.position.x = x * blockSize;
				Mesh.position.z = z * blockSize;
				Mesh.position.y = height / 2;
				if (height <= waterHeight) 
				{
					geometry3.mergeMesh(Mesh);
					continue;
				} else if (height * (1.05 - .1 * Math.random()) > 40)
				{
					geometry2.mergeMesh(Mesh);
					continue;
				}  
				geometry1.mergeMesh(Mesh);
			}
		}

		geometry1.mergeVertices();
		geometry2.mergeVertices();
		geometry3.mergeVertices();

		let mesh1 = new THREE.Mesh(geometry1, material1);
		mesh1.position.x = -worldSize / 2;
		mesh1.position.z = -worldSize / 2;
		World.scene.add(mesh1);

		let mesh2 = new THREE.Mesh(geometry2, material2);
		mesh2.position.x = -worldSize / 2;
		mesh2.position.z = -worldSize / 2;
		World.scene.add(mesh2);

		let mesh3 = new THREE.Mesh(geometry3, material3);
		mesh3.position.x = -worldSize / 2;
		mesh3.position.z = -worldSize / 2;
		World.scene.add(mesh3);

	}

}



