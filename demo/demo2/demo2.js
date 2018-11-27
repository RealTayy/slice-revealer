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
			color: "#BB552D"
		},
		// Feb
		{
			...defaultNavOptions,
			color: "#FF5056",
			direction: "vertical",
			endPosition: ["top", "bottom"],
			numOfSlices: 2,
			sliceDuration: 1.3,

		},
		// Mar
		{
			...defaultNavOptions,
			color: "#39561E",
			direction: "vertical",
			endPosition: "top",
			numOfSlices: 4,
			transitionOrder: "reverse",
		},
		// Apr
		{
			...defaultNavOptions,
			color: "#365874",
			endPosition: ["left", "right", "left", "right", "left", "right"],
			numOfSlices: 6,
		},
		// May
		{
			...defaultNavOptions,
			color: "#36415A",
			direction: "vertical",
			endPosition: "bottom",
			numOfSlices: 13,
			transitionOrder: [6, 7, 5, 8, 4, 9, 3, 10, 2, 11, 1, 12, 0],
		},
		// Jun
		{
			...defaultNavOptions,
			color: "#EEA25F",
			endPosition: ["left", "left", "left", "left", "left", "left", "right", "right", "right", "right", "right", "right"],
			numOfSlices: 12,
			transitionOrder: [0, 11, 1, 10, 2, 9, 3, 8, 4, 7, 5, 6]

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
