
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

	this.createWorldShape = function({tileCount, worldSize}) {
		let world = [];
		const blockSize = worldSize / tileCount;
		const waterHeight = blockSize * 2;
		for (let x = 0; x < tileCount; x++)
		{
			world[x] = [];
			for (let z = 0; z < tileCount; z++)
			{
				let height = (Perlin1.get(x / tileCount, z / tileCount) * 10 + Perlin2.get(x / tileCount, z / tileCount) * 2 + Perlin3.get(x / tileCount, z / tileCount)) * 5; 
				height = Math.ceil(height / blockSize) * blockSize;
				if (height < waterHeight) height = waterHeight;
				let type = 0;
				if (height <= waterHeight) 
				{
					type = 2;
				} else if (height * (1.05 - .1 * Math.random()) > 40)
				{
					type = 1;
				}  

				world[x][z] = {
					y: height,
					type: type
				}
			}
		}
		return world;
	}

	this.createWorld = function({tileCount, worldSize, worldShape}) {
		let material1 = new THREE.MeshLambertMaterial({color: 0x00FF77, side: THREE.DoubleSide});
		let material2 = new THREE.MeshLambertMaterial({color: 0x999999, side: THREE.DoubleSide});
		let material3 = new THREE.MeshLambertMaterial({color: 0x0000ff, side: THREE.DoubleSide});
		let geometry1 = new THREE.Geometry();
		let geometry2 = new THREE.Geometry();
		let geometry3 = new THREE.Geometry();

		const blockSize = worldSize / tileCount;

		for (let x = 0; x < tileCount; x++)
		{
			for (let z = 0; z < tileCount; z++)
			{
				let self = worldShape[x][z];				
				let mergedGeometry = new THREE.Geometry();
				let geometryTop = new THREE.PlaneGeometry(blockSize, blockSize);

				let subMeshTop = new THREE.Mesh(geometryTop);
				subMeshTop.rotation.x = .5 * Math.PI;
				mergedGeometry.mergeMesh(subMeshTop);


				if (z + 1 != tileCount)
				{
					let neighbour = worldShape[x][z + 1];
					let dy = self.y - neighbour.y;
					if (dy > 0) 
					{
						let geometryFront = new THREE.PlaneGeometry(blockSize, dy);
						let subMeshFront = new THREE.Mesh(geometryFront);
						subMeshFront.position.z = .5 * blockSize;
						subMeshFront.position.y = -.5 * dy;
						mergedGeometry.mergeMesh(subMeshFront);
					}
				}

				if (z - 1 >= 0)
				{
					let neighbour = worldShape[x][z - 1];
					let dy = self.y - neighbour.y;
					if (dy > 0) 
					{
						let geometryBack = new THREE.PlaneGeometry(blockSize, dy);
						let subMeshBack = new THREE.Mesh(geometryBack);
						subMeshBack.position.z = -.5 * blockSize;
						subMeshBack.position.y = -.5 * dy;
						mergedGeometry.mergeMesh(subMeshBack);
					}
				}

				if (x + 1 != tileCount)
				{
					let neighbour = worldShape[x + 1][z];
					let dy = self.y - neighbour.y;
					if (dy > 0) 
					{	
						let geometryRight = new THREE.PlaneGeometry(blockSize, dy);
						let subMeshRight = new THREE.Mesh(geometryRight);
						subMeshRight.rotation.y = .5 * Math.PI;
						subMeshRight.position.x = .5 * blockSize;
						subMeshRight.position.y = -.5 * dy;
						mergedGeometry.mergeMesh(subMeshRight);
					}
				}

				if (x - 1 >= 0)
				{
					let neighbour = worldShape[x - 1][z];
					let dy = self.y - neighbour.y;
					if (dy > 0) 
					{					
						let geometryLeft = new THREE.PlaneGeometry(blockSize, dy);
						let subMeshLeft = new THREE.Mesh(geometryLeft);
						subMeshLeft.rotation.y = .5 * Math.PI;
						subMeshLeft.position.x = -.5 * blockSize;
						subMeshLeft.position.y = -.5 * dy;
						mergedGeometry.mergeMesh(subMeshLeft);
					}
				}


				


				mergedGeometry.mergeVertices();


				let Mesh = new THREE.Mesh(mergedGeometry);
				Mesh.position.x = x * blockSize;
				Mesh.position.z = z * blockSize;
				Mesh.position.y = self.y;

				if (self.type == 2) 
				{
					geometry3.mergeMesh(Mesh);
					continue;
				} else if (self.type == 1)
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



