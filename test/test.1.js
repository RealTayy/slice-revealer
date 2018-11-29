window.onload = function () {
	const element = document.getElementById('box-two');
	const options = {
		numOfSlices: 13,
		// startPosition: 'top',
		// endPosition: 'top',
		// halfwayPosition: 'middle',

	}

	const slicerTwo = sliceRevealer(element, options);

	let time = 0;
	let timer = 0;
	setInterval(() => { time++; timer = time / 100 }, 10);
	// setInterval(() => { slicerTwo.isAnimating() }, 500)

	element.addEventListener('mouseenter', function () {
		slicerTwo.doIt('halfway', {
			startCB: (instance) => {
				console.log(timer + ':entering...');
			},
			doneCB: (instance) => {
				console.log(timer + ':entered!');
			},
			initialDelay: 1
		});
	})

	element.addEventListener('mouseleave', function () {
		slicerTwo.doIt('start', {
			startCB: (instance) => {
				console.log(timer + ':leaving...');
			},
			doneCB: (instance) => {
				console.log(timer + ':left!');
				// instance.resetPosition();
			},			
			// transitionOrder: 'reverse',
		});
	})
}