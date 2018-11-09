window.onload = function () {
	var element = document.getElementById('box-two');
	var options = {
		direction: 'vertical',
		numOfSlices: 12,
		startPosition: 'top',
		halfwayPosition: 'middle',
	}

	var slicerTwo = sliceRevealer(element, options);

	element.addEventListener('mouseenter', function () {
		slicerTwo.doIt('halfway');
	})

	element.addEventListener('mouseleave', function () {
		slicerTwo.doIt('end', {
			startCB: () => { console.log('starting!') },
			doneCB: (instance) => { console.log('finished!'); instance.resetPosition() }
		});
	})
}