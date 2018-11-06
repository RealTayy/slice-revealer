// DELETEME
console.log('demo1.js Loaded');

window.onload = function () {
	var element = document.getElementById('box-two')

	var options = {
		direction: 'vertical',
		numOfSlices: 6,
		endOpacity: 1,
	}

	var slicerTwo = sliceRevealer(element, options);

	element.addEventListener('mouseenter', function () {
		slicerTwo.animateIt({})
		// slicerTwo.hello();
	})
}