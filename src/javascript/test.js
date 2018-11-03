function Constructor(options) {
	var defaultOptions = {
		one: 'a',
		two: 'b',
		three: 'c',
		...options
	}
}

var cons = new Constructor();
var options = {};
console.log(options);