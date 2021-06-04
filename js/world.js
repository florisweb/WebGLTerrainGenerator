



function _World({tileCount, worldSize}) {
	this.size = worldSize;
	this.tileCount = tileCount;

	this.scene = new THREE.Scene();
	this.renderer = new THREE.WebGLRenderer({antialias: true});


	this.setup = function() {
		this.renderer.setClearColor('#e5e5e5');
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		document.body.appendChild(this.renderer.domElement);
		window.addEventListener('resize', function() {
			World.renderer.setSize(window.innerWidth, window.innerHeight);
			Camera.resize();
		});





		let material1 = new THREE.MeshLambertMaterial({color: 0x00FF77});
		let material2 = new THREE.MeshLambertMaterial({color: 0x999999});
		let material3 = new THREE.MeshLambertMaterial({color: 0x0000ff});

		let geometry1 = new THREE.Geometry();
		let geometry2 = new THREE.Geometry();
		let geometry3 = new THREE.Geometry();

		const waterHeight = 25;

		const blockSize = this.size / this.tileCount;
		console.log(blockSize)

		for (let x = 0; x < this.tileCount; x++)
		{
			for (let z = 0; z < this.tileCount; z++)
			{
				let height = (Perlin1.get(x / this.tileCount, z / this.tileCount) * 10 + Perlin2.get(x / this.tileCount, z / this.tileCount) * 2 + Perlin3.get(x / this.tileCount, z / this.tileCount)) * 5; 
				if (height < waterHeight) height = waterHeight;

				let geometry = new THREE.BoxGeometry(blockSize, height, blockSize);
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
		mesh1.position.x = -this.size / 2;
		mesh1.position.z = -this.size / 2;
		this.scene.add(mesh1);

		let mesh2 = new THREE.Mesh(geometry2, material2);
		mesh2.position.x = -this.size / 2;
		mesh2.position.z = -this.size / 2;
		this.scene.add(mesh2);

		let mesh3 = new THREE.Mesh(geometry3, material3);
		mesh3.position.x = -this.size / 2;
		mesh3.position.z = -this.size / 2;
		this.scene.add(mesh3);

		this.update();
	}

	let prevFrameTime = new Date();

	this.update = function() {
		let dt = (new Date() - prevFrameTime) / 1000;
		Camera.update(dt);
		this.renderer.render(this.scene, Camera.camera);
		// camera.position.x += .1;
		// camera.lookAt(0, 0, 0);


		requestAnimationFrame(function () {World.update()});
		prevFrameTime = new Date();
	}

}