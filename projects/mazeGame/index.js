const { Engine, Render, Runner, World, Bodies, Body, Events} = Matter;

const cells = 5;
const width = 600;
const height = 600;
const unitLength = width / cells ;

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
const grid = Array(cells)
	.fill(null)
	.map(() => Array(cells).fill(false));
const verticals =  Array(cells)
	.fill(null)
	.map(() => Array(cells - 1).fill(false));
const horizondals =  Array(cells - 1)
	.fill(null)
	.map(() => Array(cells).fill(false));

// Algorithm to traverse

// select a random cell
const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

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
		if(nextRow < 0|| nextRow >= cells || nextColumn < 0 || nextColumn >= cells){
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
			columnIndex * unitLength + unitLength/2,
			rowIndex * unitLength + unitLength,
			unitLength,
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
			columnIndex * unitLength + unitLength,
			rowIndex * unitLength + unitLength/2,
			10,
			unitLength,
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
	width - unitLength / 2,
	height - unitLength / 2,
	unitLength * 0.7,
	unitLength * 0.7,
	{isStatic : true,
	 label : "goal",
	  render :{
	  	fillStyle :"yellow"
	  }}
	);
World.add(world, goal);

//Ball
const ball = Bodies.circle(
	unitLength / 2,
	unitLength / 2,
	unitLength / 4,
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
			console.log("User Won!!!!!");
			console.log(collision);
			world.gravity.y = 1;
			world.bodies.forEach(body => {
			if(body.label === 'wall'){
				Body.setStatic(body, false);
			}
		});
		}
		

	});
})