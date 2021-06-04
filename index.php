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
			camera.position.z = 70;
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







			let tiles = [];
			let material1 = new THREE.MeshLambertMaterial({color: 0x00FF77});
			let material2 = new THREE.MeshLambertMaterial({color: 0x999999});
			for (let x = 0; x < 50; x++)
			{
				tiles[x] = [];
				for (let z = 0; z < 50; z++)
				{
					let height = Math.random() * 1 + 1;
					let geometry = new THREE.BoxGeometry(1.0, height, 1.0);
					let material = Math.random() > .5 ? material1 : material2;
					let mesh = new THREE.Mesh(geometry, material);
					mesh.position.x = x;
					mesh.position.z = z;
					mesh.position.y = height / 2;
					scene.add(mesh);
					tiles[x][z] = mesh;
				}
			}



			let light = new THREE.PointLight(0xffffff, 1, 500);
			light.position.set(40, 40, 8);
			scene.add(light);




			function render() {
				renderer.render(scene, camera);
				camera.position.x += .1;
				camera.lookAt(25, 0, 25);

				requestAnimationFrame(render);
			}
			render();




		</script>
	</body>
</html>
