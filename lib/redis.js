import { Client, Entity, Schema, Repository } from 'redis-om'

/* pulls the Redis URL from .env */
const url = process.env.REDIS_URL

/* create and open the Redis OM Client */
const client = await new Client().open(url)

//Entity creates something you want to add to the database
class Car extends Entity {}
//Schema is how you're going to map it out
let schema = new Schema(
    Car,
    {
        make: { type: 'string' },
        model: { type: 'string' },
        image: { type: 'string' },
        description: { type: 'string' }
    },
    {
        dataStructure: 'JSON'
    }
)

export async function createCar(data){
    await connect();
//a repository is like a library that keep track of everyhting you add.
    const repository = new Repository(schema, client);
    const car = repository.createEntity(data)
    //the id holds all the information on the car (the variable car hold repository that has a schema and client) 
    const id = await repository.save(car)
}

// export default client