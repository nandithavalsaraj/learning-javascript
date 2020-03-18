const fs = require('fs');
const crypto = require('crypto');

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

	async create(attrs) {
		attrs.id = this.randomId();
		//data saved as records
		const records = await this.getAll();
		records.push(attrs);
		await this.writeAll(records);
	}

	async writeAll(records){
		await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
	}

	randomId(){
		return crypto.randomBytes(4).toString('hex');
	}

	async getOne(id){
		const records = await this.getAll();
		return records.find(record => record.id ===id);
	}

	async delete(id){
		const records = await this.getAll();
		const filteredRecords = records.filter(record => record.id!== id);
		await this.writeAll(filteredRecords);
	}

	async update(id, attrs){
		const records = await this.getAll();
		const record = records.find(record => record.id === id);
		if(!record){
			throw new Error(`Record with id ${id} not found`);
		}
		Object.assign(record, attrs);
		await this.writeAll(records);
 	}
 	async getOneBy(filters){
 		const records = await this.getAll();
 		for(let record of records){
 			let found = true;
 			for(let key in filters){
 				if(record[key] !== filters[key]){
 					found = false;
 				} 
 			}
 			if(found){
 				return record;
 			}
 		}
 	}
}
const test = async () => {
	const repo = new UsersRepository('user.json');
	//const user = await repo.delete('7f25b047');
	const res= await repo.getOneBy({password:"mypass"});
	const users = await repo.getAll();
	console.log(res);
	console.log(users);
};
test();