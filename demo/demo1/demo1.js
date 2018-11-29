document.addEventListener("DOMContentLoaded", function (event) {
	// Array of options
	const slideOptions = [
		{
			startPosition: 'middle',
			endPosition: 'right',
			color: '#111',
			numOfSlices: 6,
			zIndex: 1
		},
		{
			direction: 'vertical',
			startPosition: 'middle',
			endPosition: 'bottom',
			color: '#111',
			numOfSlices: 15,
			transitionOrder: [7, 8, 6, 9, 5, 10, 4, 11, 3, 12, 2, 13, 1, 14, 0],
			zIndex: 1
		},
		{
			startPosition: 'middle',
			endPosition: 'left',
			color: '#111',
			transitionOrder: 'random',
			numOfSlices: 12,
			zIndex: 1
		},
		{
			direction: 'vertical',
			startPosition: 'middle',
			endPosition: ['top', 'top', 'top', 'top', 'top', 'top', 'top', 'top', 'bottom', 'bottom', 'bottom', 'bottom', 'bottom', 'bottom', 'bottom', 'bottom'],
			color: '#111',
			numOfSlices: 16,
			transitionOrder: [15, 0, 14, 1, 13, 2, 12, 3, 11, 4, 10, 5, 9, 6, 8, 7],
			zIndex: 1
		},
	];

	// Get array of .slide elements
	const slides = document.getElementsByClassName('slide');
	// Get array of .page elements
	const pages = document.getElementsByClassName('page');
	// Populate array of sliceRevealer with instances
	const sliceRevealerArr = [];
	for (let i = 0; i < slides.length; i++) {
		sliceRevealerArr[i] = sliceRevealer(slides[i], slideOptions[i]);
	}

	// Set initial actives
	let activeInstance = sliceRevealerArr[0];
	let activeIndex = 0;

	// function to go to new slide
	function slideTo(index) {
		const oldIndex = activeIndex;
		activeIndex = index;
		// swap pagenation actives
		pages[activeIndex].classList.add('active');
		pages[oldIndex].classList.remove('active');

		activeInstance.goPhase('start', {
			startCB: () => {

			},
			doneCB: () => {
				const oldSlide = slides[oldIndex];
				const newSlide = slides[activeIndex];
				// Swap opacity
				newSlide.style.opacity = "1";
				oldSlide.style.opacity = "0";
				// Switch to new activeInstance
				activeInstance = sliceRevealerArr[activeIndex];
				// Swap slide actives
				slides[activeIndex].classList.add('active');
				slides[oldIndex].classList.remove('active');
				// Animate new instance
				activeInstance.goPhase('end');
			}
		});
	}

	imagesLoaded('#slides', { background: '.slide .slide-img' }, () => {
		activeInstance.goPhase('end', {
			initialDelay: 1,
			startCB: () => {
				slides[0].classList.add('active');
			}
		});

		// Event Listener for pagination
		const pagination = document.getElementsByClassName('pagination')[0];
		pagination.addEventListener('click', (e) => {
			const target = e.target;
			if (target.tagName === "SPAN") {
				// If click on same page then do nothing
				if (e.target.classList.contains('active')) return;
				// If trying to pagenate and activeInstance is still animating then don't do anything
				if (activeInstance.isAnimating()) return;
				const index = Array.prototype.indexOf.call(target.parentNode.children, target);
				slideTo(index)
			}
		});

		// Event listener for arrow-nav
		const arrowNav = document.getElementsByClassName("arrow-nav")[0];
		arrowNav.addEventListener('click', (e) => {
			const target = e.target;
			if (target.tagName === "SPAN") {
				const index = Array.prototype.indexOf.call(target.parentNode.children, target);
				if (index === 0) {
					// Previous arrow clicked
					if (activeInstance.isAnimating()) return;
					if (activeIndex === 0) slideTo(sliceRevealerArr.length - 1)
					else slideTo(activeIndex - 1);

				}
				else {
					// Next arrow clicked
					if (activeInstance.isAnimating()) return;
					if (activeIndex === sliceRevealerArr.length - 1) slideTo(0)
					else slideTo(activeIndex + 1);
				}
			}
		});
	});
});
