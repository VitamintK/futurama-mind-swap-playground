function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();  
    } else if (document.documentElement.mozRequestFullScreen) {  
      document.documentElement.mozRequestFullScreen();  
    } else if (document.documentElement.webkitRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
  } else {  
    if (document.cancelFullScreen) {  
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
  }  
}
function getParameter(p){
	var re = new RegExp(p + '=([0-9]+)')
	x = window.location.search.substring(1).match(re);
	return x ? x[1] : 6;
}
function validate(){
	//if 2 checkboxes are already selected, reset this checkbox to unchecked.
	checked = 0;
	for(i = 0; i < bodies.length; i++){
		if(bodies[i].cb.checked){
			checked++;
		}
	}
	if(checked >= 3){
		this.checked = false;
	}
	//just in case more than 2 are selected somehow, just uncheck them all.
	if(checked > 3){
		for(i = 0; i<bodies.length; i++){
			bodies[i].cb.checked = false;
		}
	}
}
function checkDone(){
	//if each brain is in the rightful body, return true.
	for(i = 0; i<bodies.length; i++){
		if(bodies[i].body_name != bodies[i].brain.name){
			return false;
		}
	}
	return true;
}
function checkDoneAndFin(){
	if(checkDone()){
		document.getElementById("swap").className = "disappear";
		document.getElementById("restart").className = "throb";
	}
}
function swap(){
	//swap the two brains that are in the two checked bodies.
	checked = [];
	for(i = 0; i<bodies.length; i++){
		if(bodies[i].cb.checked){
			checked.push(bodies[i]);
		}
	}
	if(checked.length == 2){
		checked[0].moveBrain(checked[1]);
		for(i = 0; i<bodies.length; i++){
			bodies[i].cb.checked = false;
		}
		checkDoneAndFin();
	}
}
function shuffle (array) {
  var i = 0
    , j = 0
    , temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
var Brain = function(name, element, bg){
	this.name = name;
	this.element = element;
	this.element.style.background = bg;
}
var Flesh = function(body_name, brain, element, bg){
	this.body_name = body_name;
	this.brain = brain;
	this.element = element;
	this.element.style.background = bg;
		cb = document.createElement("input");
		cb.type = "checkbox";
		cb.id = 'cb' + body_name;
		cb.addEventListener('click', validate);
	this.cb = cb;
		element.htmlFor = 'cb' + body_name;
		element.appendChild(brain.element);
	fc.appendChild(cb);
	fc.appendChild(flesh);
}
Flesh.prototype.moveBrain = function(new_flesh){
	//This should be called swapBrain, actually.
	//It swaps the brains of two bodies - both DOM elements, and object attributes.
	this_b = this.brain;
	that_b = new_flesh.brain;
	new_flesh.element.appendChild(this.brain.element);
	this.element.appendChild(new_flesh.brain.element);
	this.brain = that_b;
	new_flesh.brain = this_b;
}
setColorButton = function(){
	c = document.getElementById('colors')
	if(colorful=="true"){
		//the colorful class makes the button become colorful.
		c.className = "colorful";
		c.title = "click to go back to red and blue when you refresh";
	} else {
		c.className = "";
		c.title = "click to get random colors when you refresh";
	}
}
oneTimeSetup = function(){
	document.addEventListener("keypress", function(e){
		e = e || window.event;
		if(e.keyCode == 13){
			swap();
		}
	});
	document.getElementById('colors').addEventListener('click', function(){
		colorful = colorful=="true" ? "false" : "true";
		localStorage.setItem("colorful", colorful);
		setColorButton();
	});
	document.getElementById('restart').addEventListener('click', function(){
		doEverything();
	});
	document.getElementById('fullscreen').addEventListener('click', toggleFullScreen);
	setColorButton();
}
doEverything = function(){
	brains = [];
	bodies = [];
	bgs = [];
	red_init = Math.floor(Math.random()*180);//ath.random()*255;
	green_init = Math.floor(Math.random()*180);
	blue_init = Math.floor(Math.random()*180);
	num = getParameter('n');
	if(num > 6){
		colorful = "true";
	}
	num = Math.min(num, 2000);
	//
	//remove the "disappear" class from the swap button, to make it visible again.
	document.getElementById("swap").className = "";
	document.getElementById("restart").className = "";
	//remove all the old bodies from the DOM.
	fc = document.getElementById("flesh-container");
	while (fc.firstChild) {
    	fc.removeChild(fc.firstChild);
	}
	//
	//fill the bgs array with strings representing rgb() color values for css.
		spread = Math.floor(Math.random()*10) + 25;
		const spread_max = 10 + 25;
		var red_off = 0;
		var blue_off = 0;
		var green_off = 0;
		var b_plus_minus = 1;
		var g_plus_minus = 1;
		var r_plus_minus = 1;
		blue = blue_init;
		console.log("rgb inits: " + red_init + " " + green_init + " " + blue_init);
		for(k = 0; k< num; b_plus_minus = b_plus_minus*-1){
			if(b_plus_minus==1){blue_off++;}
			//bgs.push("rgb("+Math.floor(Math.min(Math.random()*100)+average,255)+","+50+","+50+")");
			if(colorful=="true"){
				blue = blue_init+(blue_off*Math.max(spread_max - spread,17)*b_plus_minus);
				if(blue < 0 || blue > 255){
					if(blue_init+(blue_off*Math.max(spread_max - spread,17)*b_plus_minus * -1) <=255 && blue_init+(blue_off*Math.max(spread_max-spread,17)*b_plus_minus * -1) >= 0){
						continue
					}
				}
				for((green = green_init), (green_off=0), (g_plus_minus = 1); k<num; (g_plus_minus==1?green_off++:null), (g_plus_minus=g_plus_minus*-1)){
					green = green_init+(green_off * spread * g_plus_minus);
					if(green < 0 || green > 255){
						if(green_init+(green_off * spread * g_plus_minus * -1) < 0 || green_init+(green_off * spread * g_plus_minus * -1) > 255){
							break;
						} else {
							continue;
						}
					}
					for((red = red_init), (red_off=0), (r_plus_minus = 1); (k<num); (r_plus_minus==1?red_off++:null),(r_plus_minus=r_plus_minus*-1)){
						red = red_init+(red_off * spread * r_plus_minus);
						if(red >= 0 && red <= 255){
							k++;
							bgs.push("rgb("+red+","+green+","+blue+")");
						} else if((red_init+(red_off * spread * r_plus_minus * -1) <0) || (red_init+(red_off * spread * r_plus_minus * -1) >255)){
							break;
						}
					}

				}
			} else {
				k++;
				bgs.push("rgb("+(red_init+k*17*b_plus_minus)+","+50+","+50+")");
			}
		}
		console.log(bgs);
		shuffle(bgs);
	//fill the brains array with brain objects
	for(j = 0; j < num; j++){
		br = document.createElement("x-brain");
		brains.push(new Brain(j, br, bgs[j]));
	}
	shuffle(brains);
	//fill the bodies array with flesh objects.
	for(i = 0; i < num; i++){
		flesh = document.createElement("label");
		f = new Flesh(i,brains[i],flesh, bgs[i]);
		bodies.push(f);
	}
	//one-time under here
	sb = document.getElementById("swap");
	sb.addEventListener('click', swap);
}
//main
var colorful = localStorage.getItem("colorful");
if(colorful == null){colorful = "true";}
	var brains = [];
	var bodies = [];
	var bgs = [];
	red_init = 0//Math.random()*255;
	green_init = Math.floor(Math.random()*100);
	blue_init = Math.floor(Math.random()*100);
	num = getParameter('n');
doEverything();
oneTimeSetup();
