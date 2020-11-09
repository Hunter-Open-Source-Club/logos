let TOP_Z_INDEX = 1;

function main() {
	let windoze = document.getElementsByClassName("window");
	[...windoze].forEach(win => {
		enableDrag(win);

		let maximize_btn = win.querySelector('[aria-label="Maximize"]');
		let close_btn = win.querySelector('[aria-label="Close"]');
		let start_btn = document.getElementById("start_btn");
		let shutdown_btn = document.getElementById("shutdown_btn");
		let form_btn = document.getElementById("google_forms");
		let netexplr_btn = document.getElementById("internet_explorer");

		enableMaximize(win, maximize_btn);
		enableClose(win, close_btn);
		enableStartMenu(win, start_btn);
		enableShutdown(win, shutdown_btn);
		enableForm(win, form_btn);
		enableInternetExplorer(win, netexplr_btn);
	});
}

/*______ _   _          ____  _      ______   ____ _______ _   _     
 |  ____| \ | |   /\   |  _ \| |    |  ____| |  _ \__   __| \ | |    
 | |__  |  \| |  /  \  | |_) | |    | |__    | |_) | | |  |  \| |___ 
 |  __| | . ` | / /\ \ |  _ <| |    |  __|   |  _ <  | |  | . ` / __|
 | |____| |\  |/ ____ \| |_) | |____| |____  | |_) | | |  | |\  \__ \
 |______|_| \_/_/    \_\____/|______|______| |____/  |_|  |_| \_|___/*/

function enableMaximize(win, btn)
{
	btn.onclick = function() {
		let isMaximized = (win.title.substring(0,4) == "full");
		if(!isMaximized)
		{
			let s = window.getComputedStyle(win);
			let maxw = s.getPropertyValue('max-width');
			let maxh = s.getPropertyValue('max-height');

			var rect = win.getClientRects()[0];
			/* store current information (i.e. size and position) in 'title' attribute */
			win.title = "full" + maxw + "_" + maxh + "_" + rect.left + "_" + rect.top;
			/* then maximize */
			win.style.maxWidth = "100%";
			win.style.maxHeight = "96%";
			win.style.width = "100%";
			win.style.height = "96%";
			win.style.left = 0;
			win.style.top = 0;
		}
		else
		{
			/* restore original size and position from 'title' attribute */
			let dims = win.title.substring(4).split("_");
			win.style.maxWidth = dims[0];
			win.style.maxHeight = dims[1];
			win.style.left = dims[2] + "px";
			win.style.top = dims[3] - 5 + "px"; /* -5 because otherwise window slowly moves up */

			win.title = "";
		}
	}
}

function enableClose(win, btn)
{
	btn.onclick = function() {
		win.style.display = "none";
	}
}

function enableStartMenu(win, btn)
{
	btn.onclick = function() {
		let menu = document.getElementById("start_menu");
		menu.style.display != "block" ? 
			menu.style.display = "block" : menu.style.display = "none";
	}
}

function enableShutdown(win, btn)
{
	btn.onclick = function() {
		let audio = new Audio("assets/shutdown_sound.mp3");
		document.body.innerHTML = "";
		document.body.style.backgroundImage = "url('assets/shutdown_screen.jpg')";

		if(window.innerWidth < 700) /* background not visible on mobile */
		{
			document.body.style.backgroundPosition = "center, center";
			document.body.style.width = "100vw";
			document.body.parentElement.style.height = "100%";
		}

		audio.play();

	}
}

function enableForm(win, btn)
{
	btn.onclick = function() {
		win.style.display = "block";
		win.style.zIndex = ++TOP_Z_INDEX;
		document.getElementById("start_menu").style.display = "none";
	}
}

/*
	SOURCE FOR MATRIX EFFECT: https://codepen.io/riazxrazor/pen/Gjomdp
	with modifications by Josh's cat
*/
function enableInternetExplorer(win, btn)
{
	btn.onclick = function() {
		document.getElementById("start_menu").style.display = "none";

		let canvas = document.createElement("CANVAS");
		let canvas2 = document.createElement("CANVAS");

		let ctx = canvas.getContext( '2d' ),
		ctx2 = canvas2.getContext( '2d' ),

		// full screen dimensions
		cw = window.innerWidth + 20,
		ch = window.innerHeight + 20,
		charArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
		maxCharCount = 100,
		fallingCharArr = [],
		fontSize = 10,
		maxColums = cw/(fontSize);
		canvas.width = canvas2.width = cw;
		canvas.height = canvas2.height = ch;


		function randomInt( min, max ) {
			return Math.floor(Math.random() * ( max - min ) + min);
		}

		function randomFloat( min, max ) {
			return Math.random() * ( max - min ) + min;
		}

		function Point(x,y)
		{
			this.x = x;
			this.y = y;
		}

		Point.prototype.draw = function(ctx) {

			this.value = charArr[randomInt(0,charArr.length-1)].toUpperCase();
			this.speed = randomFloat(1,5);


			ctx2.fillStyle = "rgba(255,255,255,0.8)";
			ctx2.font = fontSize+"px san-serif";
			ctx2.fillText(this.value,this.x,this.y);

			ctx.fillStyle = "#0F0";
			ctx.font = fontSize+"px san-serif";
			ctx.fillText(this.value,this.x,this.y);

			this.y += this.speed;
			if(this.y > ch)
			{
				this.y = randomFloat(-100,0);
				this.speed = randomFloat(2,5);
			}
		}

		for(var i = 0; i < maxColums ; i++) {
			fallingCharArr.push(new Point(i*fontSize,randomFloat(-500,0)));
		}

	    var update = function()
	    {
			ctx.fillStyle = "rgba(0,0,0,0.05)";
			ctx.fillRect(0,0,cw,ch);

			ctx2.clearRect(0,0,cw,ch);

			var i = fallingCharArr.length;

			while (i--) {
				fallingCharArr[i].draw(ctx);
				var v = fallingCharArr[i];
			}

			requestAnimationFrame(update);
		}

		document.body.appendChild(canvas);
		document.body.appendChild(canvas2);

		update();
	}
}

/*_____  _____            _____  ____  _   _ _____  _____   ____  _____  
 |  __ \|  __ \     /\   / ____|/ __ \| \ | |  __ \|  __ \ / __ \|  __ \ 
 | |  | | |__) |   /  \ | |  __| |  | |  \| | |  | | |__) | |  | | |__) |
 | |  | |  _  /   / /\ \| | |_ | |  | | . ` | |  | |  _  /| |  | |  ___/ 
 | |__| | | \ \  / ____ \ |__| | |__| | |\  | |__| | | \ \| |__| | |     
 |_____/|_|  \_\/_/    \_\_____|\____/|_| \_|_____/|_|  \_\\____/|_|*/   

/*
	SOURCE: https://www.w3schools.com/howto/howto_js_draggable.asp
	with modifications by Josh's cat
*/
function enableDrag(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	elmnt.onmousedown = dragMouseDown;

	function dragMouseDown(e) {
		if(e.which == 3) /* dont drag on right click */
			return;

		document.getElementById("start_menu").style.display = "none";
		elmnt.style.zIndex = ++TOP_Z_INDEX;

		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

main();