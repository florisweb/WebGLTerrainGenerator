<!DOCTYPE html>
<html>
	<head>
		<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' name='viewport'/>
		<title>WebGLTerrainGenerator</title>
		<style>
			body {
				margin: none;
				padding: none;
				background: #000;
			}

			canvas {
				position: fixed;
				left:  0;
				top: 0;
			}
			
		</style>
	</head>
	<body>
	

		
		<script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/102/three.js'></script>
		<script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/TweenMax.min.js'></script>


		<script>
			let scene = new THREE.Scene();
			let camera = new THREE.PerspectiveCamera(
				75,
				window.innerWidth / window.innerHeight,
				0.1,
				1000
			);
			camera.position.z = 70; //70;
			camera.position.x = -20;
			camera.position.y = 20;
			// camera.rotation.set(0, -.7, 0);



			let renderer = new THREE.WebGLRenderer({antialias: true});
			renderer.setClearColor('#e5e5e5');
			renderer.setSize(window.innerWidth, window.innerHeight);

			document.body.appendChild(renderer.domElement);
			window.addEventListener('resize', function() {
				renderer.setSize(window.innerWidth, window.innerHeight);
				camera.aspect = window.innerWidth / window.innerHeight;

				camera.updateProjectionMatrix();

			});





			let worldSize = 100;
			let tileCount = 200;

			let material1 = new THREE.MeshLambertMaterial({color: 0x00FF77});
			let material2 = new THREE.MeshLambertMaterial({color: 0x999999});
			
			let geometry1 = new THREE.Geometry();
			let geometry2 = new THREE.Geometry();
			for (let x = 0; x < tileCount; x++)
			{
				for (let z = 0; z < tileCount; z++)
				{
					let height = Math.random() * 1 + 1;
					let geometry = new THREE.BoxGeometry(worldSize / tileCount, height, worldSize / tileCount);
					let Mesh = new THREE.Mesh(geometry);
					Mesh.position.x = x * worldSize / tileCount;
					Mesh.position.z = z * worldSize / tileCount;
					Mesh.position.y = height / 2;
					let type2 = Math.random() > .5;
					if (type2)
					{
						geometry2.mergeMesh(Mesh);
						continue;
					} 
					geometry1.mergeMesh(Mesh);
				}
			}

			geometry1.mergeVertices();
			geometry2.mergeVertices();
			
			let mesh1 = new THREE.Mesh(geometry1, material1);
			mesh1.position.x = -worldSize / 2;
			mesh1.position.z = -worldSize / 2;

			let mesh2 = new THREE.Mesh(geometry2, material2);
			mesh2.position.x = -worldSize / 2;
			mesh2.position.z = -worldSize / 2;

			scene.add(mesh1);
			scene.add(mesh2);


			let light = new THREE.PointLight(0xffffff, 1, 500);
			light.position.set(40, 40, 8);
			scene.add(light);




			function render() {
				renderer.render(scene, camera);
				camera.position.x += .1;
				camera.lookAt(0, 0, 0);

				requestAnimationFrame(render);
			}
			render();




		</script>
	</body>
</html>
