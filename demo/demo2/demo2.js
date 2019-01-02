document.addEventListener("DOMContentLoaded", function (event) {

	const defaultNavOptions = {
		startPosition: 'middle',
		endPosition: 'left',
	}

	const navOptionsArr = [
		// Jan
		{
			...defaultNavOptions,
			color: "#BB552D"
		},
		// Feb
		{
			...defaultNavOptions,
			color: "#ED5B6E",
			direction: "vertical",
			endPosition: ["top", "bottom"],
			numOfSlices: 2,
			sliceDuration: 1.3,

		},
		// Mar
		{
			...defaultNavOptions,
			color: "#39561E",
			direction: "vertical",
			endPosition: "top",
			numOfSlices: 4,
			transitionOrder: "reverse",
		},
		// Apr
		{
			...defaultNavOptions,
			color: "#365874",
			endPosition: "left",
			numOfSlices: 13,
			transitionOrder: [0, 12, 1, 11, 2, 10, 3, 9, 4, 8, 5, 7, 6]
		},
		// May
		{
			...defaultNavOptions,
			color: "#36415A",
			direction: "vertical",
			endPosition: "bottom",
			numOfSlices: 13,
			transitionOrder: [6, 7, 5, 8, 4, 9, 3, 10, 2, 11, 1, 12, 0],
		},
		// Jun
		{
			...defaultNavOptions,
			color: "#EEA25F",
			endPosition: ["left", "left", "left", "left", "left", "left", "right", "right", "right", "right", "right", "right"],
			numOfSlices: 12,
			transitionOrder: [0, 11, 1, 10, 2, 9, 3, 8, 4, 7, 5, 6]

		},
		// Jul
		{
			...defaultNavOptions,
			color: "#30797A",
			direction: "vertical",
			endPosition: ["top", "bottom", "top", "bottom", "top", "bottom", "top", "bottom", "top", "bottom", "top", "bottom", "top", "bottom"],
			numOfSlices: 14,
			sliceDuration: 1.3,
		},
		//Aug
		{
			...defaultNavOptions,
			color: "#933533",
			endPosition: "right",
			numOfSlices: 5,
			transitionOrder: "reverse"
		},
		// Sep
		{
			...defaultNavOptions,
			color: "#5D730E",
			direction: "vertical",
			numOfSlices: 3,
			endPosition: "bottom",
		},
		// Oct
		{
			...defaultNavOptions,
			color: "#3D4139",
			numOfSlices: 13,
			transitionOrder: [6, 1, 4, 12, 0, 5, 9, 2, 8, 3, 10, 11, 7]
		},
		//Nov
		{
			...defaultNavOptions,
			color: "#571510",
			direction: "vertical",
			endPosition: ["bottom", "bottom", "bottom", "bottom", "bottom", "bottom", "top", "top", "top", "top", "top", "top"],
			transitionOrder: [6, 5, 7, 4, 8, 3, 9, 2, 10, 1, 11, 0],
			numOfSlices: 12,

		},
		// Dec
		{
			...defaultNavOptions,
			color: "#DBF3FF",
			direction: "vertical",
			endPosition: "top",
			numOfSlices: 12,
			transitionOrder: "random"
		},
	]

	// Initialize pre-loader cover instance
	const mainSr = sliceRevealer(document.getElementById('main_sr'), {
		numOfSlices: 3,
		startPosition: 'middle',
		endPosition: 'right',
		zIndex: 10,
		color: '#222',
		sticky: true,
	})

	// Initialize hero_sr instance
	const heroSr = sliceRevealer(document.getElementById('hero_sr'), {
		numOfSlices: 12,
		startPosition: 'left',
		endPosition: 'middle',
		zIndex: 5,
		color: '#222',
		transitionOrder: 'random'
	})

	// Initialize content_sr instance
	const contentSr = sliceRevealer(document.getElementById('content_sr'), {
		numOfSlices: 12,
		startPosition: 'right',
		endPosition: 'middle',
		zIndex: 5,
		color: '#222',
		transitionOrder: 'random'
	})


	// Uncover when images loaded
	imagesLoaded('#main', { background: '.nav-img' }, () => {
		document.getElementById('main_sr').style.backgroundColor = "transparent";
		mainSr.goPhase('end', {
			startCB: () => {
				document.getElementById('links').style.opacity = 1;
				document.getElementById('main-preloader').style.opacity = 0;
			}
		});
	});


	// Initialize all nav-box's sliceRevealer instance and push to navInstances.
	const navInstances = [];
	const navBoxes = document.getElementsByClassName('nav-box');
	for (let i = 0; i < navBoxes.length; i++) {
		const navBox = navBoxes[i];
		const instance = sliceRevealer(navBox, navOptionsArr[i]);
		navInstances.push(instance);
		navBox.addEventListener('mouseenter', () => instance.goPhase('end'));
		navBox.addEventListener('mouseleave', () => instance.goPhase('start'));
	}

	// Initialize all nav-link's click event listeners
	const navLinks = document.getElementsByClassName('nav-link');
	for (let i = 0; i < navBoxes.length; i++) {
		navLink = navLinks[i];
		navLink.addEventListener('click', (e) => {
			const month = e.target.dataset.month;
			enterInfo(month);
		});
	}

	// Initialize all info-return click event listeners
	const infoReturns = document.getElementsByClassName('info-return');
	for (let i = 0; i < infoReturns.length; i++) {
		infoReturn = infoReturns[i];
		infoReturn.addEventListener('click', (e) => {
			const month = e.target.dataset.month;
			exitInfo(month);
		});
	}

	// Function to enter info display
	const enterInfo = (month) => {
		if (isTransitioning()) return;
		// Do Animation
		targetInfoBox = document.getElementById(`${month}-info`);
		contentSr.goPhase('end', {
			doneCB: (inst) => {
				inst.goPhase('start');
				targetInfoBox.style.opacity = '1';
				targetInfoBox.classList.add('active');
			}
		});
		heroSr.goPhase('end', {
			doneCB: (inst) => {
				inst.goPhase('start');
			}
		});
	}

	// Function to exit info display
	const exitInfo = (month) => {
		if (isTransitioning()) return;
		targetInfoBox = document.getElementById(`${month}-info`);
		contentSr.goPhase('end', {
			startCB: (inst) => {
				targetInfoBox.classList.remove('active');
			},
			doneCB: (inst) => {
				inst.goPhase('start');
				targetInfoBox.style.opacity = '0';
			}
		});
		heroSr.goPhase('end', {
			doneCB: (inst) => {
				inst.goPhase('start');
			}
		});
	}

	// Helper function to check if transition is currently happening
	const isTransitioning = () => {
		if (mainSr.isAnimating()) return true;
		if (heroSr.isAnimating()) return true;
		if (contentSr.isAnimating()) return true;
		return false;
	}
});
