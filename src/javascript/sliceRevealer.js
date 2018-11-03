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
			throw new Error('Error when creating SliceRevealer Instance');
		}
	}
}

function SliceRevealer(target, options) {
	// Initialize Instance of SliceRevealer

	var defaultOptions = {
		kappa: 123,
		kappakappa: 456
	};

	this.target = target;
	this.options = { ...defaultOptions, ...options };
	this.container = initializeSRContainer(target);
	this.doSomething = function () {
		console.log(this);
	}
}

function initializeSRContainer(target) {
	var sr__container = document.createElement("div");
	sr__container.className = "sr__container";

	// Set sr__container height and width to be same as target	
	sr__container.style.height = target.getBoundingClientRect().height + 1 + "px";
	sr__container.style.width = target.getBoundingClientRect().width + 1 + "px";

	// set sr__container to position over target
	sr__container.style.top = target.offsetTop + "px";
	sr__container.style.left = target.offsetLeft + "px";

	document.body.appendChild(sr__container);
}