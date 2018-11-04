// DELETEME
console.log('sliceRevealer.js Loaded');

// Returns Slicer Object
function sliceRevealer(target, options) {
	// Check if target is jQuery object and return SliceRevealer Instance
	try {
		if (target instanceof jQuery) return new SliceRevealer(target[0], options);
	} catch (e) {
		// Don't exit out of function yet if not jQuery Object
	}

	// Check if target if Native DOM element and return SliceRevealer Instance
	try {
		if (target instanceof HTMLCollection) return new SliceRevealer(target[0], options);
		else if (target instanceof Element) return new SliceRevealer(target, options);
		else throw TypeError();
	}
	catch (e) {
		if (e instanceof TypeError) {
			throw new TypeError(`Expected an DOM Element but instead got a ${typeof target}`);
		} else {
			throw new Error(e);
		}
	}
}

function SliceRevealer(target, options) {
	// Initialize Instance of SliceRevealer
	var defaultOptions = {
		kappa: 123,
		kappakappa: 456
	};
	
	this.options = { ...defaultOptions, ...options };
	this.target = target;	
	this.container = initializeSRContainer(target);
	this.slices = initializeSRSlices(this.options, this.container);
	this.doSomething = function () {
		console.log(this);
	}
}

function initializeSRContainer(target) {
	var sr__container = document.createElement('div');
	sr__container.className = 'sr__container';

	// Set sr__container height and width to be same as target	
	sr__container.style.height = '100%';
	sr__container.style.width = '100%';

	// Append sr__container to target Element
	target.appendChild(sr__container);	
	
	return sr__container;
}

function initializeSRSlices(options, container) {
	const slices = 5;
	const style = 'vertical';
	const transitionDuration = '.5s';
	const startingPosition = 'right'
	for (var i = 0; i < slices; i ++) {
		var sr__slice = document.createElement('div');
		sr__slice.className = 'sr__slice';
		
		// Set Duration
		sr__slice.style.transitionDuration = transitionDuration;
		
		// Set Starting Position
		switch(startingPosition) {
			case 'top'		: this.addClass(sr__slice, 'sr__top'); break;
			case 'bottom'	: this.addClass(sr__slice, 'sr__bottom'); break;
			case 'left'		: this.addClass(sr__slice, 'sr__left'); break;
			case 'right'	: this.addClass(sr__slice, 'sr__right'); break;
			case 'middle'	: this.addClass(sr__slice, 'sr__middle'); break;
			default: this.addClass(sr__slice, 'sr__left');
		}
		
		// Create slice 
		if (style === 'vertical') {		
			// Create Vertical slice
			sr__slice.style.height = '100%';
			sr__slice.style.width = (100/slices) + '%';
		} 	
		else {
			// Create Horizontal slice
			sr__slice.style.height = (100/slices) + '%';
			sr__slice.style.width = '100%';			
		}
		container.appendChild(sr__slice);		
		console.log(sr__slice);		
	}
}

// Made simple function to add Class because IE doesn't support 
function addClass(element, classes) {	
	element.className = element.className + ' ' + classes;
}
