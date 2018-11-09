function getNum(num, delay) {
	console.log(num + 'start');
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log(num + 'finish');
			resolve(num)
		}, delay)
	})
}

async function getAllNums() {
	let newNum = await getNum(1, 1000);
	let blah = await getNum(2, 2000);
	console.log(newNum);
}

getAllNums()