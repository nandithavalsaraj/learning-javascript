const fs = require('fs');

class UsersRepository{
	constructor(filename){
		if(!filename){
			throw new Error('Creating a repository requires a filename');
		}

		this.filename = filename;
		try{
			//check if a file exists
			fs.accessSync(this.filename);
		} catch(err){
			//create a file in case 
			fs.writeFileSync(this.filename, '[]');
		}	
	}
	async getAll(){
		//open the file this.filename
		return JSON.parse(
			await fs.promises.readFile(this.filename, {
			 encoding :'utf8'
		})
	  );
	}
}
const test = async () => {
	const repo = new UsersRepository('user.json');
	const users = await repo.getAll();
	console.log(users);
};
test();