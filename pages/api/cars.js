import { createCar } from "../../lib/redis";

//the request creates a car id. The response will be 
export default async function handler(req, res){
    //on call it will run createCar function and request the body
    //req.body will be a JavaScript object containing the parsed JSON data
    const id = await createCar(req.body);

    res.status(200).json({id})
}