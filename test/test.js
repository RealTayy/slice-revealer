window.onload = function () {
	var element = document.getElementById('box-two');
	var options = {
		numOfSlices: 12,
		halfwayPosition: 'middle',
		endPosition: 'top',
		// transitionOrder: "random",

	}

	var slicerTwo = sliceRevealer(element, options);

	let time = 0;
	let timer = 0;
	setInterval(() => { time++; timer = time / 100 }, 10);
	setInterval(() => { slicerTwo.isAnimating() }, 500)

	element.addEventListener('mouseenter', function () {
		isNotHover = false;
		slicerTwo.doIt('halfway', {
			startCB: (instance) => {
				console.log(timer + ':entering...');
			},
			doneCB: (instance) => {
				console.log(timer + ':entered!');
			},
			transitionOrder: 'reverse'
		});
	})

	element.addEventListener('mouseleave', function () {
		slicerTwo.doIt('end', {
			startCB: (instance) => {
				console.log(timer + ':leaving...');
			},
			doneCB: (instance) => {
				console.log(timer + ':left!');
				instance.resetPosition();
			},
			queueAnimation: true
		});
	})
}