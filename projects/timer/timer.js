class Timer{
	constructor(durationInput, startButton, pauseButton, callbacks ){
		this.durationInput = durationInput;
		this.startButton =startButton;
		this.pauseButton = pauseButton;
		if(callbacks){
			this.onStart = callbacks.onStart;
			this.onTick = callbacks.onTick;
			this.onComplete = callbacks.onComplete;
		}
		//event listeners
		this.startButton.addEventListener('click', this.start);
		this.pauseButton.addEventListener('click', this.pause);
	}
	start = () => {
		if(this.onStart){
			this.onStart();
		}
		this.tick();
		//function tick is called every 1 second.
		this.interval = setInterval(this.tick, 1000);
	}

	pause = () => {
		clearInterval(this.interval);
	}

	tick = () => {
		if(this.timeRemaining<= 0){
			this.pause;
			if(this.onComplete){
			this.onComplete();
		}
		}
		else{
			this.timeRemaining = this.timeRemaining - 1;
			if(this.onTick){
			this.onTick();
		}
		}
	}

	//getter and setter for time remaining which can be callede as a variable using this.<function name> due to usage of get and set keyword
	//hiding setting and getting value of time remaining
	get timeRemaining(){
           return parseFloat(this.durationInput.value);
	}
	set timeRemaining(time){
		this.durationInput.value = time;
	}
	
};