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
			color: "#ED5B6E",
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
			endPosition: "left",
			numOfSlices: 13,
			transitionOrder: [0, 12, 1, 11, 2, 10, 3, 9, 4, 8, 5, 7, 6]
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
			color: "#02797a",
			direction: "vertical",
			endPosition: ["top", "bottom", "top", "bottom", "top", "bottom", "top", "bottom", "top", "bottom", "top", "bottom", "top", "bottom"],
			numOfSlices: 14,
			sliceDuration: 1.3,
		},
		//Aug
		{
			...defaultNavOptions,
			color: "#9A0200",
			endPosition: "right",
			numOfSlices: 5,
			transitionOrder: "reverse"
		},
		// Sep
		{
			...defaultNavOptions,
			color: "#5D730E",
			direction: "vertical",
			numOfSlices: 3,
			endPosition: "bottom",
		},
		// Oct
		{
			...defaultNavOptions,
			color: "#3D4139",
			numOfSlices: 13,
			transitionOrder: [6, 1, 4, 12, 0, 5, 9, 2, 8, 3, 10, 11, 7]
		},
		//Nov
		{
			...defaultNavOptions,
			color: "#571510",
			direction: "vertical",
			endPosition: ["bottom", "bottom", "bottom", "bottom", "bottom", "bottom", "top", "top", "top", "top", "top", "top"],
			transitionOrder: [6, 5, 7, 4, 8, 3, 9, 2, 10, 1, 11, 0],
			numOfSlices: 12,

		},
		// Dec
		{
			...defaultNavOptions,
			color: "#DBF3FF",
			direction: "vertical",
			endPosition: "top",
			numOfSlices: 12,
			transitionOrder: "random"
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
