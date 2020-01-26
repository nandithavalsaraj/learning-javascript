const debounce = (func, delay = 1000) => {
	let timeoutId ;
	return (...args) => {
		//need to clear and update the timeout every time we type in letter by letter
		if(timeoutId){
		clearTimeout(timeoutId);
	    }
		timeoutId = setTimeout(() => {
		func.apply(null, args);
	}, delay)
	};
};