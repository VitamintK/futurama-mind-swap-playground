function validate(){
	//if 2 checkboxes are already selected, reset this to unchecked.
	checked = 0;
	for(i = 0; i < bodies.length; i++){
		if(bodies[i].cb.checked){
			checked++;
		}
	}
	if(checked >= 3){
		this.checked = false;
	}
	//just in case more than 2 are selected somehow
	if(checked > 3){
		for(i = 0; i<bodies.length; i++){
			bodies[i].cb.checked = false;
		}
	}
}
function checkDone(){
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
	}
}
function swap(){
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
//Brain.prototype.moveBody(new_body){
//
//}
var Flesh = function(body_name, brain, element, bg){
	this.body_name = body_name;
	this.brain = brain;
	this.element = element;
	this.element.style.background = bg;
	//this.selected = false;
	//element.addEventListener('click', function(event){this;})
		cb = document.createElement("input");
		cb.type = "checkbox";
		cb.id = 'cb' + body_name;
		cb.addEventListener('click', validate);
	this.cb = cb;
		element.htmlFor = 'cb' + body_name;
		//console.log(brain);
		element.appendChild(brain.element);
	fc.appendChild(cb);
	fc.appendChild(flesh);
}
Flesh.prototype.moveBrain = function(new_flesh){
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
	document.getElementById("swap").className = "";
	fc = document.getElementById("flesh-container");
	while (fc.firstChild) {
    	fc.removeChild(fc.firstChild);
	}

	
	for(k = num/-2; k < 1 + (num/2); k++){
		//bgs.push("rgb("+Math.floor(Math.min(Math.random()*100)+average,255)+","+50+","+50+")");
		if(colorful=="true"){
			bgs.push("rgb("+Math.floor(Math.min(Math.random()*100)+average,255)+","+green+","+blue+")");
		} else {
			bgs.push("rgb("+(50+k*17)+","+50+","+50+")");
		}
	}
	shuffle(bgs);
	for(j = 0; j < 6; j++){
		br = document.createElement("x-brain");
		brains.push(new Brain(j, br, bgs[j]));
	}
	shuffle(brains);
	
	for(i = 0; i < 6; i++){
		
		flesh = document.createElement("label");
		//flesh.htmlFor = 'cb' + i;
		//flesh.appendChild(document.createTextNode("yolo"));
		//flesh.style.background = bgs[i];

		f = new Flesh(i,brains[i],flesh, bgs[i]);
		bodies.push(f);
	}
	//one-time under here
	sb = document.getElementById("swap");
	sb.addEventListener('click', swap);
	
}
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
