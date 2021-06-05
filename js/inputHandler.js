// document.onmousedown = function() { 
//   InputHandler.mouseDown = true;
// }
// document.onmouseup = function() {
//   InputHandler.mouseDown = false;
// }



function _InputHandler(_canvas) {
	let HTML = {
		canvas: _canvas,
	}
	const raycaster = new THREE.Raycaster();
	let mousePos = new THREE.Vector2();
	mousePos.x = -2;
	mousePos.y = -2;

	this.mouseDown = false;
	this.draging = false;



	this.settings = new function() {
		this.dragSpeed = 1;
		this.scrollSpeed = .005
	}
	// assignMouseDrager();
	// assignMouseMoveHandler();




	window.onkeydown = function(_e) {
		const moveSpeed = 20;
		const rotateSpeed = .5;
		let key = _e.key.toLowerCase();

		if (key == 'w')
		{
			Camera.velocity.value[2] = moveSpeed;
		} else if (key == 's')
		{
			Camera.velocity.value[2] = -moveSpeed;
		}
		if (key == 'a')
		{
			Camera.velocity.value[0] = moveSpeed;
		} else if (_e.key == 'd')
		{
			Camera.velocity.value[0] = -moveSpeed;
		}

		if (key == ' ')
		{
			Camera.velocity.value[1] = -moveSpeed;
		} else if (key == 'shift')
		{
			Camera.velocity.value[1] = moveSpeed;
		}


		if (key == 'q')
		{
			Camera.angularVelocity.value[1] = rotateSpeed;
		} else if (key == 'e')
		{
			Camera.angularVelocity.value[1] = -rotateSpeed;
		}
	}
	window.onkeyup = function(_e) {
		let key = _e.key.toLowerCase();
		if (key == 'w' || key == 's') Camera.velocity.value[2] = 0;
		if (key == 'a' || key == 'd') Camera.velocity.value[0] = 0;
		if (key == ' ' || key == 'shift') Camera.velocity.value[1] = 0;
		if (key == 'q' || key == 'e') Camera.angularVelocity.value[1] = 0;
	}



	HTML.canvas.addEventListener('mousemove', function(_e) {
		// InputHanlder.raycaster
		mousePos.x = (_e.clientX / window.innerWidth) * 2 - 1;
		mousePos.y = -(_e.clientY / window.innerHeight) * 2 + 1;

	});

	let resetColorValue = false;
	let prevObject = false;
	this.update = function() {
		// raycaster.setFromCamera(mousePos, Camera.camera);
		// const intersects = raycaster.intersectObjects(World.scene.children);
		// window.intersects = intersects;
		// if (prevObject)
		// {
		// 	prevObject.material.color.set(resetColorValue);
		// }

		// if (intersects.length < 1) return;
		// let c = intersects[0].object.material.color;
		// resetColorValue = 'rgb(' + c.r * 255 + ', ' + c.g * 255 + ', ' + c.b * 255 + ')';
		// prevObject = intersects[0].object;
		// intersects[0].object.material.color.set('rgb(255, 0, 0)');
	}







	HTML.canvas.addEventListener('wheel', function(event) {
		// let mousePosition = new Vector([
		// 	event.offsetX / HTML.canvas.offsetWidth * HTML.canvas.width, 
		// 	event.offsetY / HTML.canvas.offsetHeight * HTML.canvas.height
		// ]);

		// let startWorldPosition = RenderEngine.camera.canvasPosToWorldPos(mousePosition);

	    Camera.zoom += event.deltaY * InputHandler.settings.scrollSpeed;
	    if (Camera.zoom < .1) Camera.zoom = .1;
	    

	    // let endWorldPosition = RenderEngine.camera.canvasPosToWorldPos(mousePosition);
	    // RenderEngine.camera.position.add(endWorldPosition.difference(startWorldPosition));
	    
	    return false; 
	}, false);





	// function assignMouseMoveHandler() {
	// 	HTML.canvas.addEventListener("mousemove", 
	// 	    function (_event) {
	// 	    	let mousePosition = new Vector([
	// 				_event.offsetX / HTML.canvas.offsetWidth * HTML.canvas.width, 
	// 				_event.offsetY / HTML.canvas.offsetHeight * HTML.canvas.height
	// 			]);
	//     		let worldPosition = RenderEngine.camera.canvasPosToWorldPos(mousePosition);

	//     		Builder.handleMouseMove(worldPosition);
	// 	    	Server.sendPacket(0, worldPosition.value);
	// 	    }
	// 	);
	// }








	// function assignMouseDrager() {
	// 	HTML.canvas.addEventListener("mousedown", 
	//     	function (_event) {
	//       		InputHandler.draging = true;
	//     	}
	//   	);

	//   	HTML.canvas.addEventListener("mouseup", stopDraging);

	//   	let prevDragVector = false;
	// 	HTML.canvas.addEventListener("mousemove", 
	// 	    function (_event) {
	// 	    	if (!InputHandler.draging) return;
	// 	    	if (!InputHandler.mouseDown) return stopDraging();
	// 	    	RenderEngine.camera.follow(false);

	// 	    	if (prevDragVector)
	// 	    	{
	// 	    		let deltaPos = new Vector([_event.screenX, _event.screenY]).difference(prevDragVector);
	// 	    		let moveVector = deltaPos.scale(InputHandler.settings.dragSpeed * RenderEngine.camera.zoom);
	// 	    		RenderEngine.camera.position.add(moveVector);
	// 	    	}

	// 	    	prevDragVector = new Vector([_event.screenX, _event.screenY]);
	// 	    }
	// 	);
		
	// 	function stopDraging() {
	// 		InputHandler.draging = false;
	//       	prevDragVector = false;
	// 	}
	// }

}




// document.body.addEventListener("keydown", function(_e) {
// 	KeyHandler.keys[_e.key] = true;
// 	KeyHandler.handleKeys(_e);
// });

// document.body.addEventListener("keyup", function(_e) {
// 	KeyHandler.keys[_e.key] = false;
// });
