// Initialize and Returns SliceRevealer Instance
function sliceRevealer(target, options) {
	// Check if target is jQuery object and return SliceRevealer Instance
	try {
		if (target instanceof jQuery) return new SliceRevealer(target[0], options);
	} catch (e) {
		// Don't error and exit out of function yet if not jQuery Object
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
	const instance = this;
	// Initialize Instance of SliceRevealer
	let startPosition = 'left';
	let transitionOrder = [];
	let sliceAnimations = [];
	if (options) startPosition = options.startPosition
	const defaultOptions = {
		direction: 'horizontal',
		numOfSlices: 8,
		sliceDuration: 1,
		totalDuration: 1.6,
		startPosition: 'left',
		halfwayPosition: 'middle',
		endPosition: 'middle',
		curPosition: startPosition || 'left',
		startOpacity: 1,
		halfwayOpacity: 1,
		endOpacity: 1,
		startColor: '#ffffff',
		halfwayColor: '#ffffff',
		endColor: '#ffffff',
		queueAnimation: false,
		startCB: () => { },
		doneCB: () => { },
	};

	// Hoisted Methods
	this.initializeSRContainer = initializeSRContainer;
	this.initializeSRSlices = initializeSRSlices;
	this.resetPosition = resetPosition;
	this.getTransform = getTransform;
	this.shuffle = shuffle;

	// SliceRevealer's properties
	this.options = { ...defaultOptions, ...options };
	this.target = target;
	this.container = this.initializeSRContainer(this.target, this.options);
	this.slices = this.initializeSRSlices(this.container, this.options);
	this.queuedDoneCallback;
	this.queuedParameters = undefined;
	this.currentAnimation;
	this.sliceAnimations = sliceAnimations;
	this.transitionOrder = transitionOrder;
	this.sliceFinished = new CustomEvent('slicefinished');

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

		// Listener to check whether to run callback functions and queued animations or not depending on whether all slices have finished animations 
		sr__container.addEventListener('slicefinished', () => {
			// Only run if instance is no longer animating any slices
			if (!this.isAnimating()) {
				// If there is a queued animation then run it				
				if (this.queuedParameters && this.queuedParameters.hasOwnProperty('newPosition')) {
					this.queuedParameters.newOptions.queueAnimation = false;
					this.doIt(this.queuedParameters.newPosition, this.queuedParameters.newOptions);
					this.queuedParameters = {};
				}

				if (this.queuedDoneCallback) {
					// Run callback and then unreference it
					this.queuedDoneCallback(this)
					this.queuedDoneCallback = undefined;
				};
			}
		});

		return sr__container;
	}

	// Function used to create and return sr__slices based on options
	function initializeSRSlices(container, options) {
		// OPTIONS
		const numOfSlices = options.numOfSlices;
		const curPosition = options.curPosition
		const startOpacity = options.startOpacity;
		const startColor = options.startColor;
		const slices = [];
		// Create slice elements
		for (let i = 0; i < numOfSlices; i++) {
			const sr__slice = document.createElement('div');
			sr__slice.className = 'sr__slice';

			// Set starting CSS			
			sr__slice.style.opacity = startOpacity;
			sr__slice.style.color = startColor;


			// Append slices to container then push to slices array
			container.appendChild(sr__slice);
			slices.push(sr__slice);

			// Push index to transition order array to track order
			transitionOrder.push(i);

			// Push empty string to sliceAnimations array to track animations
			sliceAnimations.push('');

			// TODO: Cross browser compatibility issue for this maybe?
			// Adds event listener to detect when slice is not animating anymore
			sr__slice.setAttribute('animating', false);
			sr__slice.setAttribute('index', i);
			sr__slice.addEventListener('transitionend', function (e) {
				// Get ref # of current animation and see if there is a another animation waiting to fire after a timeout
				const curTimeout = parseInt(e.target.getAttribute('timeout'));
				const queuedTimeout = instance.sliceAnimations[i];

				// If there is a animation waiting to fire then do nothing
				if (curTimeout !== queuedTimeout) { }
				// Else set animating to false, get rid of transition-duaction, clear 
				else {
					sr__slice.setAttribute('animating', false);
					sr__slice.style.transitionDuration = '';
					// instance.sliceAnimations[i] === false;
					container.dispatchEvent(instance.sliceFinished)
				}
			}
			);

		}

		// Set Starting Position of slices				
		this.resetPosition(curPosition, options, slices);

		// Set transition order of slices		
		if (options.transitionOrder === 'random') transitionOrder = shuffle(transitionOrder);
		else if (options.transitionOrder === 'random') transitionOrder = transitionOrder.reverse();

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

			// TODO:HERE
			slice.setAttribute('animating', false);

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
			case 'top': return `translate(0%, calc(-${(offset) * 100}% - 5px))`;
			case 'bottom': return `translate(0%, calc(${(offset) * 100}% + 5px))`;
			case 'left': return `translate(calc(-${(offset) * 100}% - 5px), 0%)`;
			case 'right': return `translate(calc(${(offset) * 100}% + 5px), 0%)`;
			case 'middle': return 'translate(0%, 0%)';
			default: return 'translate(0%, 0%)';
		}
	}

	// HelperFunction to shuffle an array
	function shuffle(array) {
		array = array.slice();
		let i = array.length, temp, randomIndex;
		while (0 !== i) {
			randomIndex = Math.floor(Math.random() * i);
			i -= 1;
			temp = array[i];
			array[i] = array[randomIndex];
			array[randomIndex] = temp;
		}
		return array;
	}

}

SliceRevealer.prototype.doIt = function (newPosition, newOptions) {
	let transitionOrder = newOptions.transitionOrder;
	// OPTIONS	
	let options = { ...this.options, ...newOptions };
	const sliceDuration = options.sliceDuration * 1000; // Convert seconds to milliseconds
	const totalDuration = options.totalDuration * 1000; // Convert seconds to milliseconds	
	const direction = options.direction;
	const numOfSlices = options.numOfSlices;

	// Options that can be passed in as arguement	
	const position = options[`${newPosition}Position`];
	const color = options.color || options[`${newPosition}Color`];
	const startCB = options.startCB;
	const doneCB = options.doneCB;
	const initialDelay = (options.initialDelay) ? options.initialDelay * 1000 : 0; // Convert seconds to milliseconds
	const queueAnimation = options.queueAnimation;

	// Calculate interval between slices
	const slices = this.slices;
	const lastSliceTransition = totalDuration - sliceDuration;
	const sliceInterval = lastSliceTransition / (slices.length - 1 || lastSliceTransition);

	// Calculate order slices transition in if special opitions passed		
	if (transitionOrder === "random") transitionOrder = this.shuffle(this.transitionOrder);
	else if (transitionOrder === "reverse") transitionOrder = this.transitionOrder.slice().reverse();
	else transitionOrder = this.transitionOrder;


	// If queueAnimation is true and not suppose to cancel current animation
	if (queueAnimation) {
		// Save parameters into queueredParameters object which runs during current animation's doneCB function		
		this.queuedParameters = {};
		this.queuedParameters.newPosition = newPosition;
		this.queuedParameters.newOptions = newOptions;
	}
	// Else Do the animation NOW!
	else {
		// Clear any currentAnimations
		clearTimeout(this.currentAnimation);
		this.currentAnimation = setTimeout(() => {
			if (startCB) startCB(this);
			for (
				let i = 0;
				i < slices.length;
				i++
			) {
				let sliceIndex = transitionOrder[i];
				let slice = slices[sliceIndex];
				let delay = (i * sliceInterval);

				// Canceled current queued animation for slice
				clearTimeout(this.sliceAnimations[sliceIndex]);
				// Start and save animation to sliceAnimations in case it needs to be canceled
				this.sliceAnimations[sliceIndex] = setTimeout(() => {
					// set slice's data-timeout to new timeout reference #					
					slice.setAttribute('timeout', this.sliceAnimations[sliceIndex]);

					// Set slice's new css
					slice.style.color = color;
					// Find each individual silces's position if passed an position array			
					let newPosition;
					if (Array.isArray(position)) newPosition = position[sliceIndex];
					else newPosition = position;
					// Set slice's position
					const transform = this.getTransform(newPosition, direction, numOfSlices);
					// If slice was already in correct spot then set data-animating to false					
					if (
						(
							slice.style.webkitTransform === transform ||
							slice.style.MozTransform === transform ||
							slice.style.msTransform === transform ||
							slice.style.OTransform === transform ||
							slice.style.transform === transform
						)
					) {
						if (slice.getAttribute('animating') === "true") {
						}
						else {
							// this.container.dispatchEvent(this.sliceFinished);
						}
					}
					// Else animate it!
					else {
						slice.setAttribute('animating', true);
						slice.style.transitionDuration = sliceDuration / 1000 + 's';
						slice.style.webkitTransform = transform;
						slice.style.MozTransform = transform;
						slice.style.msTransform = transform;
						slice.style.OTransform = transform;
						slice.style.transform = transform;
					}
				}, delay)
			}
			// Queue up a callback to execute upon animation finishing
			this.queuedDoneCallback = doneCB;
		}, initialDelay);
	}
}

// Returns a boolean whether the instance is currently animating or not
SliceRevealer.prototype.isAnimating = function () {
	return this.slices.some((slice, i) => {
		// If currently Animating return true
		if (slice.getAttribute('animating') === "true") return true;
		// If not animating but a slice has a queued animation return true
		const curTimeout = parseInt(this.slices[i].getAttribute('timeout'));
		const queuedTimeout = this.sliceAnimations[i];
		if (curTimeout !== queuedTimeout) return true;
		return false;
	})
}

// TODO: Actually destroy instance instead of removing sr_container
SliceRevealer.prototype.destroy = function () {
	this.container.remove();
}