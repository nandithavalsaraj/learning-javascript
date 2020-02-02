const { Engine, Render, Runner, World, Bodies, Body, Events} = Matter;

const cellsHorizondal = 14;
const cellsVertical = 10;
const width = window.innerWidth;
const height = window.innerHeight;
const unitLengthX = width / cellsHorizondal ;
const unitLengthY = height / cellsVertical ;


const engine = Engine.create();
//disabling the gravity of the world
engine.world.gravity.y = 0;
const { world } = engine;
const render = Render.create({
	element : document.body,
	engine: engine,
	options: {
		wireframes : false,
		width,
		height
	}
});
Render.run(render);
Runner.run(Runner.create(), engine);

//Walls creation 
const walls = [
	Bodies.rectangle(width / 2, 0, width, 2, { isStatic : true }),
	Bodies.rectangle(width / 2, height, width, 2, { isStatic : true }),
	Bodies.rectangle(0, height / 2, 2, height, { isStatic : true }),
	Bodies.rectangle(width, height / 2, 2, height,{ isStatic : true })
];
World.add(world, walls);

//Maze generation
const shuffle = (arr) => {
	let counter = arr.length;
	while(counter > 0){
		let index = Math.floor(Math.random() * counter);
		counter--;
		const temp = arr[counter];
		arr[counter] = arr[index];
		arr[index] = temp;
	}
	return arr;
};
const grid = Array(cellsVertical)
	.fill(null)
	.map(() => Array(cellsHorizondal).fill(false));
const verticals =  Array(cellsVertical)
	.fill(null)
	.map(() => Array(cellsHorizondal - 1).fill(false));
const horizondals =  Array(cellsVertical - 1)
	.fill(null)
	.map(() => Array(cellsHorizondal).fill(false));

// Algorithm to traverse

// select a random cell
const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizondal);

const stepThroughCell = (row, column) => {
	//if visited the cell then return 
	if(grid[row][column]){
		return ;
	}

	//Mark the cell as visited
	grid[row][column] = true;

	// Assemble randomly-ordered list of neighbours
	const neighbours = shuffle([
	[row - 1, column, 'up'],
	[row, column + 1, 'right'],
	[row + 1, column, 'down'],
	[row, column - 1, 'left']]);

	// for each neighbour iterate
	for(let neighbour of neighbours){
		const [nextRow, nextColumn, direction] = neighbour;

		//see if neighbour is out of bounds
		if(nextRow < 0|| nextRow >= cellsVertical || nextColumn < 0 || nextColumn >= cellsHorizondal){
			continue;
		}
		// if we have visisted this neighbour continue to next neighbour
		if(grid[nextRow][nextColumn]){
			continue;
		}

		//Remove a wall (horizondal / vertical)
		if(direction =='left'){
			verticals[row][column-1] = true;}
		else if(direction =='right'){
			verticals[row][column] = true;}
		else if(direction =='up'){
			horizondals[row-1][column] = true;}
		else if(direction =='down'){
			horizondals[row][column] = true;}

		stepThroughCell(nextRow, nextColumn);
	}
}
stepThroughCell(startRow,startColumn);
horizondals.forEach((row, rowIndex) => {
	row.forEach((open, columnIndex) => {
		if(open){
			return;}
		const wall = Bodies.rectangle(
			columnIndex * unitLengthX + unitLengthX/2,
			rowIndex * unitLengthY + unitLengthY,
			unitLengthX,
			10,
			{
			  isStatic : true,
			  label :"wall",
			  render :{
			  	fillStyle :"green"
			  }}
			);
		World.add(world, wall);
	});
});
verticals.forEach((row, rowIndex) => {
	row.forEach((open, columnIndex) => {
		if(open){
			return;}
		const wall = Bodies.rectangle(
			columnIndex * unitLengthX + unitLengthX,
			rowIndex * unitLengthY + unitLengthY/2,
			10,
			unitLengthY,
			{isStatic : true,
			  label :"wall",
			  render :{
			  	fillStyle :"green"
			  }}
			);
		World.add(world, wall);
	});
});

//goal box created
const goal = Bodies.rectangle(
	width - unitLengthX / 2,
	height - unitLengthY / 2,
	unitLengthX * 0.7,
	unitLengthY * 0.7,
	{isStatic : true,
	 label : "goal",
	  render :{
	  	fillStyle :"yellow"
	  }}
	);
World.add(world, goal);

//Ball
const ballRadius = Math.min(unitLengthX, unitLengthY) / 3;
const ball = Bodies.circle(
	unitLengthX / 2,
	unitLengthY / 2,
	ballRadius,
	{
		label :"ball",
		render :{
			fillStyle :"red"
		}
	}
	);
World.add(world, ball);

//Adding keypress events
document.addEventListener("keydown", event =>{
	const  { x, y} = ball.velocity;
	if(event.keyCode === 87){
		Body.setVelocity(ball, {x, y : y - 5});
	}
	if(event.keyCode === 68){
		Body.setVelocity(ball, {x: x + 5, y} )
	}
	if(event.keyCode === 83){
		Body.setVelocity(ball, {x, y : y + 5})
	}
	if(event.keyCode === 65){
		Body.setVelocity(ball, {x : x - 5, y})
	}
});
//Win Condition
Events.on(engine, 'collisionStart', event => {
	event.pairs.forEach(collision =>{
		const labels = ["ball", "goal"];
		if(labels.includes(collision.bodyA.label) && labels.includes(collision.bodyB.label)){
			document.querySelector('.winner').classList.remove('hidden');
			world.gravity.y = 1;
			world.bodies.forEach(body => {
			if(body.label === 'wall'){
				Body.setStatic(body, false);
			}
		});
		}
		

	});
})