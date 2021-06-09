
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
	const chunkSize = 64;


	this.createWorldShape = function({tileCount, worldSize}) {
		let world = [];
		const blockSize = worldSize / tileCount;
		const waterHeight = blockSize * 1;
		for (let x = 0; x < tileCount; x++)
		{
			world[x] = [];
			for (let z = 0; z < tileCount; z++)
			{
				let height = (Perlin1.get(x / tileCount, z / tileCount) * 10 + Perlin2.get(x / tileCount, z / tileCount) * 2 + Perlin3.get(x / tileCount, z / tileCount)) * 5; 
				height = Math.ceil(height / blockSize) * blockSize;
				if (height < waterHeight) height = waterHeight;
				let type = 0;
				// if (height <= waterHeight) 
				// {
				// 	type = 2;
				// } else if (height * (1.05 - .1 * Math.random()) > 40)
				// {
				// 	type = 1;
				// }  

				world[x][z] = {
					y: height,
					type: type
				}
			}
		}
		return world;
	}





	let materialSide = new THREE.MeshLambertMaterial({
		color: 0xffffff, 
		side: THREE.DoubleSide,
		map: new THREE.TextureLoader().load('images/mc.png'),
	});	
	let materialTop = new THREE.MeshLambertMaterial({
		color: 0xffffff, 
		side: THREE.DoubleSide,
		map: new THREE.TextureLoader().load('images/crate.png'),
	});	

	let material2 = new THREE.MeshLambertMaterial({color: 0x777777, side: THREE.DoubleSide});
	let material3 = new THREE.MeshLambertMaterial({color: 0x00ffff, side: THREE.DoubleSide});

	
	let materials = [
		materialTop,
		materialSide,
		materialSide,
		materialSide,
		materialSide,
	];






	this.createChunkMeshes = function({chunkX, chunkZ, tileCount, worldSize, worldShape}) {
		const blockSize = worldSize / tileCount;

		let geometry1 = new THREE.Geometry();
		let geometry2 = new THREE.Geometry();
		let geometry3 = new THREE.Geometry();
		for (let dx = 0; dx < chunkSize; dx++)
		{
			let x = dx + chunkX * chunkSize;
			for (let dz = 0; dz < chunkSize; dz++)
			{
				let z = dz + chunkZ * chunkSize;

				let Mesh = createBlockMesh({
					x: x,
					z: z,
					worldShape: worldShape,
					blockSize: blockSize
				})
				let geometry = geometry1;
				// if (worldShape[x][z].type == 2) 
				// {
				// 	geometry = geometry3;
				// } else if (worldShape[x][z].type == 1) geometry = geometry2;

				geometry.mergeMesh(Mesh);
			}
		}

		geometry1.mergeVertices();
		geometry2.mergeVertices();
		geometry3.mergeVertices();

		for (let i = 0; i < geometry1.faces.length; i++) geometry1.faces[i].materialIndex--;
		let mesh1 = new THREE.Mesh(geometry1, materials);

		mesh1.geometry.groupsNeedUpdate = true


		mesh1.position.x = -worldSize / 2 + chunkX;
		mesh1.position.z = -worldSize / 2 + chunkZ;
		World.scene.add(mesh1);
		window.mesh1 = mesh1;

		// let mesh2 = new THREE.Mesh(geometry2, material2);
		// mesh2.position.x = -worldSize / 2;
		// mesh2.position.z = -worldSize / 2;
		// World.scene.add(mesh2);

		// let mesh3 = new THREE.Mesh(geometry3, material3);
		// mesh3.position.x = -worldSize / 2;l
		// mesh3.position.z = -worldSize / 2 + chunkZ * chunkSize * blockSize;
		// World.scene.add(mesh3);
	}


	function createBlockMesh({x, z, worldShape, blockSize}) {
		let self = worldShape[x][z];				
		let mergedGeometry = new THREE.Geometry();
		let geometryTop = new THREE.PlaneGeometry(blockSize, blockSize);

		let subMeshTop = new THREE.Mesh(geometryTop);
		subMeshTop.rotation.x = .5 * Math.PI;
		mergedGeometry.mergeMesh(subMeshTop);
		for (let i = 0; i < 2; i++) mergedGeometry.faces[i].materialIndex = 1;


		if (z + 1 != worldShape[0].length)
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
				
				for (let i = 0; i < mergedGeometry.faces.length; i++)
				{
					if (mergedGeometry.faces[i].materialIndex !== 0) continue;
					mergedGeometry.faces[i].materialIndex = 2 + 1;
				}
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
				for (let i = 0; i < mergedGeometry.faces.length; i++)

				{
					if (mergedGeometry.faces[i].materialIndex !== 0) continue;
					mergedGeometry.faces[i].materialIndex = 4 + 1;
				}
			}
		}


		if (x + 1 != worldShape[0].length)
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

				for (let i = 0; i < mergedGeometry.faces.length; i++)
				{
					if (mergedGeometry.faces[i].materialIndex !== 0) continue;
					mergedGeometry.faces[i].materialIndex = 1 + 1;
				}
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

				for (let i = 0; i < mergedGeometry.faces.length; i++)
				{
					if (mergedGeometry.faces[i].materialIndex !== 0) continue;
					mergedGeometry.faces[i].materialIndex = 3 + 1;
				}
			}
		}

		mergedGeometry.mergeVertices();

		let Mesh = new THREE.Mesh(mergedGeometry);
		Mesh.position.x = x * blockSize;
		Mesh.position.z = z * blockSize;
		Mesh.position.y = self.y;

		return Mesh;
	}





	this.createWorld = function({tileCount, worldSize, worldShape}) {

		// for (let x = 0; x < tileCount / chunkSize; x++)
		// {
		// 	for (let z = 0; z < tileCount / chunkSize; z++)
		// 	{
		// 		this.createChunkMeshes({
		// 			chunkX: x,
		// 			chunkZ: z,
		// 			tileCount: tileCount,
		// 			worldSize: worldSize,
		// 			worldShape: worldShape
		// 		});
				
		// 	}	
		// }


		// return;


		let geometry1 = new THREE.Geometry();
		// let geometry2 = new THREE.Geometry();
		// let geometry3 = new THREE.Geometry();

		const blockSize = worldSize / tileCount;
		for (let x = 0; x < tileCount; x++)
		{
			for (let z = 0; z < tileCount; z++)
			{
				let Mesh = createBlockMesh({
					x: x,
					z: z,
					worldShape: worldShape,
					blockSize: blockSize
				})
				let geometry = geometry1;
				// if (worldShape[x][z].type == 2) 
				// {
				// 	geometry = geometry3;
				// } else if (worldShape[x][z].type == 1) geometry = geometry2;

				geometry.mergeMesh(Mesh);
			}
		}

		geometry1.mergeVertices();
		// geometry2.mergeVertices();
		// geometry3.mergeVertices();

		for (let i = 0; i < geometry1.faces.length; i++) geometry1.faces[i].materialIndex--;
		let mesh1 = new THREE.Mesh(geometry1, materials);

		mesh1.geometry.groupsNeedUpdate = true

		mesh1.position.x = -worldSize / 2;
		mesh1.position.z = -worldSize / 2;
		World.scene.add(mesh1);
		window.mesh1 = mesh1;

		// let mesh2 = new THREE.Mesh(geometry2, material2);
		// mesh2.position.x = -worldSize / 2;
		// mesh2.position.z = -worldSize / 2;
		// World.scene.add(mesh2);

		// let mesh3 = new THREE.Mesh(geometry3, material3);
		// mesh3.position.x = -worldSize / 2;
		// mesh3.position.z = -worldSize / 2;
		// World.scene.add(mesh3);

	}

}



