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
function swap(){
	checked = [];
	for(i = 0; i<bodies.length; i++){
		if(bodies[i].cb.checked){
			checked.push(bodies[i]);
		}
	}
	if(checked.length == 2){
		checked[0].moveBrain(checked[1]);
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
var brains = [];
var bodies = [];
var bgs = [];
for(k = 0; k < 6; k++){
	bgs.push("rgb("+Math.floor(Math.random()*100)+",50,50)");
}
for(j = 0; j < 6; j++){
	br = document.createElement("x-brain");
	brains.push(new Brain(j, br, bgs[j]));
}
shuffle(brains);
fc = document.getElementById("flesh-container");
for(i = 0; i < 6; i++){
	
	flesh = document.createElement("label");
	//flesh.htmlFor = 'cb' + i;
	//flesh.appendChild(document.createTextNode("yolo"));
	//flesh.style.background = bgs[i];

	f = new Flesh(i,brains[i],flesh, bgs[i]);
	bodies.push(f);
}
sb = document.getElementById("swap");
sb.addEventListener('click', swap);
document.addEventListener("keypress", function(e){
	e = e || window.event;
	if(e.keyCode == 13){
		swap();
	}
});