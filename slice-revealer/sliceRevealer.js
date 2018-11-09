// Initialize and Returns SliceRevealer Instance
function sliceRevealer(target, options) {
	// Check if target is jQuery object and return SliceRevealer Instance
	try {
		if (target instanceof jQuery) return new SliceRevealer(target[0], options);
	} catch (e) {
		// Don't eorror and exit out of function yet if not jQuery Object
	}

	// Check if target if Native DOM element and return SliceRevealer Instance
	try {
		if (target instanceof HTMLCollection) return new SliceRevealer(target[0], options);
		else if (target instanceof Element) return new SliceRevealer(target, options);
		else throw TypeError('Target must be a HTMLCollection or Element');
	}
	catch (e) { throw e; }
}

// SliceRevealer constructor function
function SliceRevealer(target, options) {
	// Initialize Instance of SliceRevealer
	const curPosition = options.startPosition || 'left';
	const defaultOptions = {
		direction: 'horizontal',
		numOfSlices: 8,
		sliceDuration: 1,
		totalDuration: 1.6,
		curPosition: curPosition,
		startPosition: 'left',
		halfwayPosition: 'middle',
		endPosition: 'right',
		startOpacity: 1,
		halfwayOpacity: 1,
		endOpacity: 1,
		startColor: '#ffffff',
		halfwayColor: '#ffffff',
		endColor: '#ffffff',
	};

	// Hoisted Methods
	this.initializeSRContainer = initializeSRContainer;
	this.initializeSRSlices = initializeSRSlices;
	this.resetPosition = resetPosition;
	this.getTransform = getTransform;

	// SliceRevealer's properties
	this.options = { ...defaultOptions, ...options };
	this.target = target;
	// this.isAnimating = ()=>{curAnimation});
	this.curAnimation;
	this.container = this.initializeSRContainer(this.target, options);
	this.slices = this.initializeSRSlices(this.container, this.options);

	// Method used to create and return sr__container based on options
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
		const curPosition = options.curPosition
		const startPosition = options.curPosition;
		const endPosition = options.endPosition;
		const startOpacity = options.startOpacity;
		const startColor = options.startColor;
		const slices = [];

		// Create slice elements
		for (let i = 0; i < numOfSlices; i++) {
			const sr__slice = document.createElement('div');
			sr__slice.className = 'sr__slice';

			// Set starting CSS
			sr__slice.style.transitionDuration = sliceDuration + 's';
			sr__slice.style.opacity = startOpacity;
			sr__slice.style.color = startColor;

			// Append slices to container then push to slices array
			container.appendChild(sr__slice);
			slices.push(sr__slice);
		}

		// Set Starting Position of slices				
		this.resetPosition(curPosition, options, slices);

		// Return array of slice elements
		return slices;
	}

	// TODO: MAKE POSITION OF SLICES GO TO NEW POSITION WITHOUT TRANSITION!
	// Helper method to position slices without transition
	function resetPosition(position, options, slices) {
		// OPTIONS				
		options = { ...this.options, ...options };
		const direction = options.direction;
		const numOfSlices = options.numOfSlices;
		const startColor = options.startColor;
		position = position || options.startPosition;

		slices = slices || this.slices

		for (let i = 0; i < slices.length; i++) {
			const slice = slices[i];

			const transitionDuration = slice.style.transitionDuration;			
			slice.classList.add('resetting');

			// Set slice's css back to startCss			
			slice.style.color = startColor;

			// Set slice's position
			// Find each individual silces's position if passed an position array			
			let newPosition;
			if (Array.isArray(position)) newPosition = position[i];
			else newPosition = position;
			const transform = this.getTransform(newPosition, direction, numOfSlices)
			slice.style.webkitTransform = transform;
			slice.style.MozTransform = transform;
			slice.style.msTransform = transform;
			slice.style.OTransform = transform;
			slice.style.transform = transform;
			// TODO: Find a way to achieve this without setTimeout
			setTimeout(() => slice.classList.remove('resetting'), 25);
		}
	}

	// Helper function to get transform value for relevant position
	function getTransform(position, direction, numOfSlices) {
		// If position passed was start/halfway/end then set position to relavent position
		if (position === 'start') position = this.options.startPosition;
		else if (position === 'halfway') position = this.options.halfwayPosition;
		else if (position === 'end') position = this.options.endPosition;

		// If position is same orientation as direction then don't offset else offset translate
		let offset = 1;
		if (direction === 'vertical') {
			if (position === 'top' || position === 'bottom') {
				// No offset
			} else {
				offset = numOfSlices;
			}
		} else {
			if (position === 'top' || position === 'bottom') {
				offset = numOfSlices;
			} else {
				// No offset
			}
		}

		// Return relavent translate property
		switch (position) {
			case 'top': return `translate(0%, -${(offset) * 100 + 1}%)`;
			case 'bottom': return `translate(0%, ${(offset) * 100 + 1}%)`;
			case 'left': return `translate(-${(offset) * 100 + 1}%, 0%)`;
			case 'right': return `translate(${(offset) * 100 + 1}%, 0%)`;
			case 'middle': return 'translate(0%, 0%)';
			default: return 'translate(0%, 0%)';
		}
	}
}

SliceRevealer.prototype.doIt = function (newPosition, options) {
	// OPTIONS
	options = { ...this.options, ...options };
	const sliceDuration = options.sliceDuration * 1000; // Convert seconds to milliseconds
	const totalDuration = options.totalDuration * 1000; // Convert seconds to milliseconds	
	const direction = options.direction;
	const numOfSlices = options.numOfSlices;

	// Options that can be passed in as arguement
	const position = options[`${newPosition}Position`];
	const color = options.color || options[`${newPosition}Color`];
	const startCB = options.startCB;
	const doneCB = options.doneCB;

	const slices = this.slices;
	const lastSliceTransition = totalDuration - sliceDuration;
	const sliceInterval = lastSliceTransition / (slices.length - 1 || lastSliceTransition);

	// Callback that runs as animation starts	
	if (startCB !== undefined) startCB(this);

	// Do the transition HERE!
	for (
		let i = 0;
		i < slices.length;
		i++
	) {
		let slice = slices[i];
		let delay = (i * sliceInterval);
		setTimeout(() => {
			// Set slice's new css
			slice.style.color = color;
			// Set slice's position
			// Find each individual silces's position if passed an position array			
			let newPosition;
			if (Array.isArray(position)) newPosition = position[i];
			else newPosition = position;
			const transform = this.getTransform(newPosition, direction, numOfSlices)
			slice.style.webkitTransform = transform;
			slice.style.MozTransform = transform;
			slice.style.msTransform = transform;
			slice.style.OTransform = transform;
			slice.style.transform = transform;
		}, delay);
	}

	// clears currentAnimation callback function and sets a new one.
	clearTimeout(this.curAnimation);
	// Callback that runs when animation is done
	this.curAnimation = setTimeout(() => {
		if (doneCB) doneCB(this);
	}, totalDuration + 25);
}

SliceRevealer.prototype.delete = function () {
	while (this.container.lastChild) {
		this.container.removeChild(this.container.lastChild);
	}
}