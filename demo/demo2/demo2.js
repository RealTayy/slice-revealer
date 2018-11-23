document.addEventListener("DOMContentLoaded", function (event) {

	const defaultNavOptions = {
		startPosition: 'middle',
		endPosition: 'left',
		startOptions: {
			startCB: (instance) => {
				console.log(instance.target);
			}
		},
		endOptions: {
			startCB: () => console.log('hi')
		},
	}

	const navOptionsArr = [
		// Jan
		{
			...defaultNavOptions,
		},
		// Feb
		{
			...defaultNavOptions,
		},
		// Mar
		{
			...defaultNavOptions,
		},
		// Apr
		{
			...defaultNavOptions,
		},
		// May
		{
			...defaultNavOptions,
		},
		// Jun
		{
			...defaultNavOptions,
		},
		// Jul
		{
			...defaultNavOptions,
		},
		//Aug
		{
			...defaultNavOptions,
		},
		// Sep
		{
			...defaultNavOptions,
		},
		// Oct
		{
			...defaultNavOptions,
		},
		//Nov
		{
			...defaultNavOptions,
		},
		// Dec
		{
			...defaultNavOptions,
		},
	]

	// Initialize all navBoxes's sliceRevealer instance and push to navInstances.
	const navInstances = [];
	const navBoxes = document.getElementsByClassName('nav-box');
	for (let i = 0; i < navBoxes.length; i++) {
		const navBox = navBoxes[i];
		const instance = sliceRevealer(navBox, navOptionsArr[i]);
		navInstances.push(instance);
		navBox.addEventListener('mouseenter', () => instance.goPhase('end'));
		navBox.addEventListener('mouseleave', () => instance.goPhase('start'));
	}
});
