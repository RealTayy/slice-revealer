window.onload = function () {
	var element = document.getElementById('box-two');
	var options = {
		// direction: 'vertical',
		numOfSlices: 14,
		// startPosition: 'top',
		halfwayPosition: 'middle',
		reverse: true,
	}

	var slicerTwo = sliceRevealer(element, options);

	let time = 0;
	let timer = 0;
	setInterval(() => { time++; timer = time / 100 }, 10);

	element.addEventListener('mouseenter', function () {
		slicerTwo.doIt('halfway', {
			startCB: () => {
				console.log(timer + ':entering...');
			},
			doneCB: (instance) => {
				console.log(timer + ':entered!');
			},
			// initialDelay: 1.6,
			// forced: true,
		});
	})

	element.addEventListener('mouseleave', function () {
		slicerTwo.doIt('end', {
			startCB: () => {
				console.log(timer + ':leaving...')
			},
			doneCB: (instance) => {
				console.log(timer + ':left!');
				// instance.resetPosition();
			},
			random: true,
			//reverse: false
		});
	})
}