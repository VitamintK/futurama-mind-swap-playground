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
	average = 0;//ath.random()*255;
	green = Math.floor(Math.random()*100);
	blue = Math.floor(Math.random()*100);
	num = 6;
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
	for(k = num/-2; k < 1 + (num/2); k++){
		//bgs.push("rgb("+Math.floor(Math.min(Math.random()*100)+average,255)+","+50+","+50+")");
		if(colorful=="true"){
			spread = Math.floor(Math.random()*10) + 20;
			bgs.push("rgb("+(k*spread+100)+","+green+","+blue+")");
		} else {
			bgs.push("rgb("+(50+k*17)+","+50+","+50+")");
		}
	}
	shuffle(bgs);
	//fill the brains array with brain objects
	for(j = 0; j < 6; j++){
		br = document.createElement("x-brain");
		brains.push(new Brain(j, br, bgs[j]));
	}
	shuffle(brains);
	//fill the bodies array with flesh objects.
	for(i = 0; i < 6; i++){
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
	average = 0;//ath.random()*255;
	green = Math.floor(Math.random()*100);
	blue = Math.floor(Math.random()*100);
	num = 6;
doEverything();
oneTimeSetup();
