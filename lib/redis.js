
import { Client, Entity, Schema, Repository } from 'redis-om';

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
    }
}
/* pulls the Redis URL from .env */

/* create and open the Redis OM Client */

//Entity creates something you want to add to the database
class Car extends Entity {}
//Schema is how you're going to map it out
let schema = new Schema(
    Car,
    {
        make: { type: 'string' },
        model: { type: 'string' },
        image: { type: 'string' },
        description: { type: 'text', textSearch: true }
    },
    {
        dataStructure: 'JSON',
    }
)

export async function createCar(data){
    await connect();
//a repository is like a library that keep track of everyhting you add.
    // const repository = new Repository(schema, client);
    const repository = client.fetchRepository(schema)

    const car = repository.createEntity(data)
    //the id holds all the information on the car (the variable car hold repository that has a schema and client) 
    const id = await repository.save(car);
    return id;
}

export async function createIndex(){
    //await for the code to connect with database
    await connect()
    const repository = new Repository(schema, client);
    await repository.createIndex();
}

export async function searchCars(q){
    await connect();
    const repository = new Repository(schema, client);
    const cars = await repository.search()
    .where('make').eq(q)
    .or('model').eq(q)
    .or('description').matches(q)
    .return.all()

    return cars
}