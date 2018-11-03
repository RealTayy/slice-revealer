// DELETEME
console.log('demo1.js Loaded');

window.onload = function () {
	var elements = document.getElementsByClassName('test-boxes-one');	
	var slicer = sliceRevealer(elements);
	slicer.doSomething();		
	var element = document.getElementById('box-two')
	var slicerTwo = sliceRevealer(element, {kappakappa: 999});
	slicerTwo.doSomething()
	 
}

// style="height: 360px; width: 288px; top: 1160px; left: 648px;"