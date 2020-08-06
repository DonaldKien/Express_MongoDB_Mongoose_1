const express	= require("express");
const app		= express();
const mongoose	= require("mongoose");
const bodyParser= require("body-parser");

mongoose.connect("mongodb+srv://project_1:<PASSWORD>@cluster0.mibfu.mongodb.net/restaurants?retryWrites=true&w=majority");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const router = express.Router();

let RestaurantsSchema = new mongoose.Schema({
	name: String,
	address: String,
	types: [String],
	phone: String,
	email: String,
	description: String,
	opening_time: String,
	latitude: Number,
	longitude: Number
})
const RestaurantsModel = mongoose.model("RestaurantsCollection", RestaurantsSchema);


router.get('/', (request, response) => {
	response.json({ message: "hooray! welcome to our api!"})
})

// SHOW 
router.get('/restaurants', (request, response) => {
	RestaurantsModel.find()
	.then( data => response.json({ RestaurantsList: data }) )
	.catch( err => response.json({ message: "Something went wrong" }) )
})

// CREATE NEW
router.post('/restaurants', (request, response) => {
	let newRestaurant = new RestaurantsModel({
		name: request.body.name,
		address: request.body.address,
		types: request.body.types,
		phone: request.body.phone,
		email: request.body.email,
		description: request.body.description,
		opening_time: request.body.opening_time,
		latitude: request.body.latitude,
		longitude: request.body.longitude
	})
	newRestaurant.save()
	.then( data => response.json({ message: "Restaurant was created successfully" }) )
	.catch( err => response.json({ message: "Something went wrong" }) )
})

// FIND BY ID
router.get('/restaurants/:id', (request, response) => {
	RestaurantsModel.findById(request.params.id)
	.then( data => response.json({ RestaurantsList: data }))
	.catch( err => response.json({ message: "Something went wrong" }) )
})

// UPDATE
router.put('/restaurants/:id', (request, response) => {
	RestaurantsModel.findByIdAndUpdate( request.params.id, request.body, {useFindAndModify: true} )
	.then( data => response.json({ message: "Restaurant successfully updated" }) )
	.catch( err => response.json({ message: "Something went wrong" }) )
})

// DELETE
router.delete('/restaurants/:id', (request, response) => {
	RestaurantsModel.findOneAndRemove(request.params.id)
	.then( data => response.json({ message: "Restaurant successfully deleted" }) )
	.catch( err => response.json({ message: "Something went wrong" }) )
})

app.use("/api", router);
app.listen(process.env.PORT || 8080, () => {
	console.log('============== Magic happens on port 8080 ==================');
});