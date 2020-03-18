const express = require('express');
const bodyParser = require('body-parser');
const usersRepo = require('./repositories/users');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send('Email in use');
  }

  if (password !== passwordConfirmation) {
    return res.send('Passwords must match');
  }
  await usersRepo.create({email, password});
  res.send('Account created!!!');
});


//tell app to start listening to the incomming network traffic
app.listen(3000, () => {
	console.log('listen');
});