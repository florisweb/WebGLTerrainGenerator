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
	this.mouseDown = false;
	this.draging = false;

	this.settings = new function() {
		this.dragSpeed = 1;
		this.scrollSpeed = .005
	}
	// assignMouseDrager();
	// assignMouseMoveHandler();




	window.onkeydown = function(_e) {
		console.log(_e.key);
		const moveSpeed = 20;

		if (_e.key == 'w')
		{
			Camera.velocity.value[2] = moveSpeed;
		} else if (_e.key == 's')
		{
			Camera.velocity.value[2] = -moveSpeed;
		}
		if (_e.key == 'a')
		{
			Camera.velocity.value[0] = moveSpeed;
		} else if (_e.key == 'd')
		{
			Camera.velocity.value[0] = -moveSpeed;
		}

		if (_e.key == ' ')
		{
			Camera.velocity.value[1] = -moveSpeed;
		} else if (_e.key == 'Shift')
		{
			Camera.velocity.value[1] = moveSpeed;
		}
	}
	window.onkeyup = function(_e) {
		if (_e.key == 'w' || _e.key == 's')
		{
			Camera.velocity.value[2] = 0;
		}
		if (_e.key == 'a' || _e.key == 'd')
		{
			Camera.velocity.value[0] = 0;
		}

		if (_e.key == ' ' || _e.key == 'Shift')
		{
			Camera.velocity.value[1] = 0;
		}
	}




	// HTML.canvas.addEventListener('wheel', function(event) {
	// 	let mousePosition = new Vector([
	// 		event.offsetX / HTML.canvas.offsetWidth * HTML.canvas.width, 
	// 		event.offsetY / HTML.canvas.offsetHeight * HTML.canvas.height
	// 	]);

	// 	// let startWorldPosition = RenderEngine.camera.canvasPosToWorldPos(mousePosition);

	//     // RenderEngine.camera.zoom += event.deltaY * InputHandler.settings.scrollSpeed;
	//     // if (RenderEngine.camera.zoom < .1) RenderEngine.camera.zoom = .1;
	    

	//     let endWorldPosition = RenderEngine.camera.canvasPosToWorldPos(mousePosition);
	//     RenderEngine.camera.position.add(endWorldPosition.difference(startWorldPosition));
	    
	//     return false; 
	// }, false);





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
