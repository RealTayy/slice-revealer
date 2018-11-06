// Initialize and Returns SliceRevealer Instance
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
	catch (e) { throw e; }
}

// SliceReavealer constructor function
function SliceRevealer(target, options) {
	// Initialize Instance of SliceRevealer
	var defaultOptions = {
		direction: 'horizontal',
		numOfSlices: 6,
		sliceDuration: .5,
		totalDuration: 3,
		startPosition: 'left',
		endPosition: 'left',
		startingOpacity: 1,
		endOpacity: 1,
		fadeIn: false,
		fadeOut: false,
	};

	this.options = { ...defaultOptions, ...options };
	this.target = target;
	this.isAnimating = false;
	this.container = initializeSRContainer(this.target, options);
	this.slices = initializeSRSlices(this.container, this.options);

	// Function used to create and return sr__container based on options
	function initializeSRContainer(target, options) {
		// OPTIONS
		var direction = options.direction;

		var sr__container = document.createElement('div');
		sr__container.className = 'sr__container';

		// Set sr__container height and width to be same as target	
		sr__container.style.height = '100%';
		sr__container.style.width = '100%';

		// Set direction of slices
		if (direction === 'vertical') addClass(sr__container, 'sr__vertical');
		else addClass(sr__container, 'sr__horizontal');

		// Append sr__container to target Element
		target.appendChild(sr__container);

		return sr__container;
	}

	// Function used to create and return sr__slices based on options
	function initializeSRSlices(container, options) {
		// OPTIONS
		var numOfSlices = options.numOfSlices;
		var sliceDuration = options.sliceDuration;
		var startPosition = options.startPosition;
		var startOpacity = options.startOpacity;
		var slices = [];

		// Create slice elements
		for (var i = 0; i < numOfSlices; i++) {
			var sr__slice = document.createElement('div');
			sr__slice.className = 'sr__slice';

			// Set Duration
			sr__slice.style.transitionDuration = sliceDuration + 's';

			// Set Starting Opacity
			sr__slice.style.opacity = startOpacity;

			// Set Starting Position
			switch (startPosition) {
				case 'top': alass(sr__slice, 'sr__top'); break;
				case 'bottom': addClass(sr__slice, 'sr__bottom'); break;
				case 'left': addClass(sr__slice, 'sr__left'); break;
				case 'right': addClass(sr__slice, 'sr__right'); break;
				case 'middle': addClass(sr__slice, 'sr__middle'); break;
				default: addClass(sr__slice, 'sr__left');
			}
			// Append slices to container then push to slices array
			container.appendChild(sr__slice);
			slices.push(sr__slice);
		}
		// Return array of slice elements
		return slices;
	}

	// HELPER FUNCTIONS //
	// Simple helper function to add Class to Elements because IE doesn't support classList
	function addClass(element, classes) {
		element.className = element.className + ' ' + classes;
	}
}

SliceRevealer.prototype.animateIt = function (options) {
	// OPTIONS
	var options = { ...this.options, ...options };
	var startOpacity = options.startOpacity;
	var endOpacity = options.endOpacity;

	var slices = this.slices;
	// var addClass = this.addClass	

	// Do the transition HERE!
	for (var i = 0; i < slices.length; i++) {
		console.log(slice);
		var slice = slices[i];
		slice.style.opacity = endOpacity;
		this.removeClass(slice, 'sr__left');
		this.addClass(slice, 'sr__middle')
	}
}

// HELPER FUNCTIONS //
// Simple helper function to add Class to Elements because IE doesn't support classList
SliceRevealer.prototype.addClass = function (element, classes) {
	element.className = element.className + ' ' + classes;
}

// Simple helper function to remove Class to Elements because IE doesn't support classList
SliceRevealer.prototype.removeClass = function (element, classes) {
	const regex = new RegExp(classes, 'g')
	element.className = element.className.replace(regex, "").trim();
}