window.onload = function () {
	var element = document.getElementById('box-two');
	var options = {
		numOfSlices: 12,
		halfwayPosition: 'middle',
		transitionOrder: "random",

	}

	var slicerTwo = sliceRevealer(element, options);

	let time = 0;
	let timer = 0;
	setInterval(() => { time++; timer = time / 100 }, 10);
	setInterval(() => { slicerTwo.isAnimating() }, 500)

	element.addEventListener('mouseenter', function () {
		isNotHover = false;
		slicerTwo.doIt('end', {
			startCB: () => {
				console.log(timer + ':entering...');
			},
			doneCB: (instance) => {
				console.log(timer + ':entered!');
			},
			// random: true,
			// initialDelay: 1.6,
			// forced: true,
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
			// random: true,
			//reverse: false
		});
	})
}