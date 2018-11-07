window.onload = function () {
	var element = document.getElementsByClassName('box-two')[0];

	var options = {
		direction: 'horizontal',
		numOfSlices: 8,
		// sliceDuration: 1,
		// totalDuration: 1.5,
		startPosition: 'left',
		endPosition: 'middle',
		startOpacity: .999999, // startOpacity set to .999 because chrome doesn't play well with rounding pixels and sometimes is one pixel off.
		endOpacity: 1,
	}

	var slicerTwo = sliceRevealer(element, options);

	element.addEventListener('mouseenter', function () {
		slicerTwo.doIt()
	})

	element.addEventListener('mouseleave', function () {
		slicerTwo.undoIt();		
	})
}