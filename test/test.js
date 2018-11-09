window.onload = function () {
	var element = document.getElementById('box-two');
	var options = {
		// direction: 'horizontal',
		// numOfSlices: 8,
		// sliceDuration: 1,
		// totalDuration: 1.5,
		// curPosition: ['top', 'left', 'right', 'bottom', 'top', 'left', 'right', 'bottom',],
		// startPosition: 'right',
		// startPosition: ['top', 'left', 'right', 'bottom', 'top', 'left', 'right', 'bottom',],
		// startPosition: ['top', 'bottom', 'top', 'bottom', 'top', 'bottom', 'top', 'bottom'],
		// halfwayPosition: 'top',
		endPosition: 'top',
		// startOpacity: .999999, // startOpacity set to .999 because chrome doesn't play well with rounding pixels and sometimes is one pixel off.
		// endOpacity: 1,
	}

	var slicerTwo = sliceRevealer(element);

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