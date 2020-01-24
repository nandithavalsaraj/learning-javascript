class Timer{
	constructor(durationInput, startButton, pauseButton){
		this.durationInput = durationInput;
		this.startButton =startButton;
		this.pauseButton = pauseButton;
		//event listeners
		this.startButton.addEventListener('click', this.start);
		this.pauseButton.addEventListener('click', this.pause);
	}
	start = () => {
		this.tick();
		//function tick is called every 1 second.
		this.interval = setInterval(this.tick, 1000);
	}

	pause = () => {
		clearInterval(this.interval);
	}

	tick = () => {
		this.timeRemaining = this.timeRemaining - 1;
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
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const timer = new Timer(durationInput, startButton, pauseButton);
