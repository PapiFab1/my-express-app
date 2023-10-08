import SPOONACULAR_API_KEY from  "./keyapi.js";
require('dotenv').config();


const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
//dont know why the key inst reading it properly
const spoonacularApiKey = process.env.SPOONACULAR_API_KEY;
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.post('/search', async (req, res) => {
    const ingredients = req.body.ingredients;

    try {
        // Construct the apiKeyParam with the API key
        // const apiKeyParam = `apiKey=${spoonacularApiKey}`;

        // Append apiKeyParam to the Spoonacular API request URL

        const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=ad53396b9c3548d29cfe6a3731164e4f&ingredients=${ingredients}&number=10`;

        //console.log(apiUrl);
        const response = await axios.get(apiUrl);

        const recipes = response.data;

        res.render('results', { recipes });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).send('Server Error');
    }
});


