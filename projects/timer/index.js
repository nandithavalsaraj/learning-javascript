class Timer{
	constructor(durationInput, startButton, pauseButton){
		this.durationInput = durationInput;
		this.startButton =startButton;
		this.pauseButton = pauseButton;
		this.timeLeft = 30;
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
		this.timeRemaining = parseFloat(this.durationInput.value);
		this.durationInput.value = this.timeRemaining - 1;
	}
};
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const timer = new Timer(durationInput, startButton, pauseButton);
