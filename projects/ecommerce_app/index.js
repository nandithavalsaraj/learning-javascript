const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//all route handlers will be able to access the bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true}));

//route handler
app.get('/', (req, res) => {
	res.send(`
		<div>
			<form method="POST">
				<input name="email" placeholder="email"/>
				<input name="password" placeholder="password"/>
				<input name="passwordconfirmation" placeholder="password confirmation"/>
				<button>Sign Up</button>
			</form>
		</div>
		`);
});

app.post('/', (req, res) =>{ 
	console.log(req.body);
	res.send("Account Created");
});



//tell app to start listening to the incomming network traffic
app.listen(3000, () => {
	console.log('listen');
});