window.onload = function () {
	const element = document.getElementById('box-two');
	const options = {
		numOfSlices: 13,
		// transitionOrder: 'reverse',
		halfwayPosition: 'top',

	}

	const slicerTwo = sliceRevealer(element, options);

	let time = 0;
	let timer = 0;
	setInterval(() => { time++; timer = time / 100 }, 10);
	// setInterval(() => { slicerTwo.isAnimating() }, 500)

	element.addEventListener('mouseenter', function () {
		slicerTwo.doIt('end', {
			startCB: (instance) => {
				console.log(timer + ':entering...');
			},
			doneCB: (instance) => {
				console.log(timer + ':entered!');
			},
			// queueAnimation: true
		});
	})

	element.addEventListener('mouseleave', function () {
		slicerTwo.doIt('halfway', {
			startCB: (instance) => {
				console.log(timer + ':leaving...');
			},
			doneCB: (instance) => {
				console.log(timer + ':left!');
				instance.resetPosition();
			},
			queueAnimation: true,
			// transitionOrder: 'reverse',
		});
	})
}