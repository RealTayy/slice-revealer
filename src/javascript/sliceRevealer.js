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
		numOfSlices: 8,
		sliceDuration: 1,
		totalDuration: 1.6,
		startPosition: 'left',
		endPosition: 'middle',
		startOpacity: 1,
		endOpacity: 1,
		startColor: '#ffffff',
		endColor: '#ffffff',

	};

	this.options = { ...defaultOptions, ...options };
	this.target = target;
	this.isAnimating = false;
	this.container = initializeSRContainer(this.target, options);
	this.slices = initializeSRSlices(this.container, this.options);

	// Function used to create and return sr__container based on options
	function initializeSRContainer(target, options) {
		// OPTIONS
		const direction = options.direction;

		const sr__container = document.createElement('div');
		sr__container.className = 'sr__container';

		// Set sr__container height and width to be same as target	
		sr__container.style.height = '100%';
		sr__container.style.width = '100%';

		// Set direction of slices
		if (direction === 'vertical') sr__container.classList.add('sr__vertical');
		else sr__container.classList.add('sr__horizontal');

		// Append sr__container to target Element
		target.appendChild(sr__container);

		return sr__container;
	}

	// Function used to create and return sr__slices based on options
	function initializeSRSlices(container, options) {
		// OPTIONS
		const numOfSlices = options.numOfSlices;
		const sliceDuration = options.sliceDuration;
		const startPosition = options.startPosition;
		const startOpacity = options.startOpacity;
		const startColor = options.startColor;
		const slices = [];

		// Create slice elements
		for (let i = 0; i < numOfSlices; i++) {
			const sr__slice = document.createElement('div');
			sr__slice.className = 'sr__slice';

			// Set Duration
			sr__slice.style.transitionDuration = sliceDuration + 's';

			// Set Starting Opacity
			sr__slice.style.opacity = startOpacity;

			// Set Starting Position
			switch (startPosition) {
				case 'top': sr__slice.classList.add('sr__top'); break;
				case 'bottom': sr__slice.classList.add('sr__bottom'); break;
				case 'left': sr__slice.classList.add('sr__left'); break;
				case 'right': sr__slice.classList.add('sr__right'); break;
				case 'middle': sr__slice.classList.add('sr__middle'); break;
				default: sr__slice.classList.add('sr__left');
			}
			// Append slices to container then push to slices array
			container.appendChild(sr__slice);
			slices.push(sr__slice);
		}
		// Return array of slice elements
		return slices;
	}
}

SliceRevealer.prototype.doIt = function (options) {
	// OPTIONS
	var options = { ...this.options, ...options };
	var endOpacity = options.endOpacity;
	var endPosition = options.endPosition;
	var sliceDuration = options.sliceDuration * 1000; // Convert seconds to milliseconds
	var totalDuration = options.totalDuration * 1000; // Convert seconds to milliseconds	

	var slices = this.slices;
	var lastSliceTransition = totalDuration - sliceDuration;
	var sliceInterval = lastSliceTransition / (slices.length - 1 || lastSliceTransition);

	// Do the transition HERE!
	for (let i = 0; i < slices.length; i++) {
		let slice = slices[i];
		const delay = (i * sliceInterval);
		setTimeout(() => {
			slice.style.opacity = endOpacity;
			slice.classList.remove('sr__top', 'sr__bottom', 'sr__left', 'sr__right', 'sr__middle');
			switch (endPosition) {
				case 'top': slice.classList.add('sr__top'); break;
				case 'bottom': slice.classList.add('sr__bottom'); break;
				case 'left': slice.classList.add('sr__left'); break;
				case 'right': slice.classList.add('sr__right'); break;
				case 'middle': slice.classList.add('sr__middle'); break;
				default: slice.classList.add('sr__left');
			}
		}, delay);
	}
}

SliceRevealer.prototype.undoIt = function (options) {
	// OPTIONS
	var options = { ...this.options, ...options };
	var startOpacity = options.startOpacity;
	var startPosition = options.startPosition;
	var sliceDuration = options.sliceDuration * 1000; // Convert seconds to milliseconds
	var totalDuration = options.totalDuration * 1000; // Convert seconds to milliseconds	

	var slices = this.slices;
	var lastSliceTransition = totalDuration - sliceDuration;
	var sliceInterval = lastSliceTransition / (slices.length - 1 || lastSliceTransition);

	// Do the transition HERE!
	for (let i = 0; i < slices.length; i++) {
		let slice = slices[i];
		const delay = (i * sliceInterval);
		setTimeout(() => {
			slice.style.opacity = startOpacity;
			slice.classList.remove('sr__top', 'sr__bottom', 'sr__left', 'sr__right', 'sr__middle');
			switch (startPosition) {
				case 'top': slice.classList.add('sr__top'); break;
				case 'bottom': slice.classList.add('sr__bottom'); break;
				case 'left': slice.classList.add('sr__left'); break;
				case 'right': slice.classList.add('sr__right'); break;
				case 'middle': slice.classList.add('sr__middle'); break;
				default: slice.classList.add('sr__left');
			}
		}, delay);
	}
}

SliceRevealer.prototype.delete = function () {
	while (this.container.lastChild) {
		this.container.removeChild(this.container.lastChild);
	}
}