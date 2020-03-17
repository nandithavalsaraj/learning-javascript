const express = require('express');

const app = express();

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
app.post('/',(req, res) =>{ 
	//get access to the data inputted from the browser
	req.on('data', data => {	
		const parsed = data.toString('utf8').split('&');
		const formData = {};
		for (let pair of parsed){
			const [key, value] =pair.split('=');
			formData[key] = value;
		}
		console.log(formData);
	});
	res.send("Account Created");
});

//tell app to start listening to the incomming network traffic
app.listen(3000, () => {
	console.log('listen');
});