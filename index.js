const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const movies= [
    { id: 1, name: 'shawshank redemption', timings = [{time:'10:00'}, {time:'11.00'}, {time:'13:00'}, {time:'17:00'}, {time:'20:00'}]},
    { id: 2, name: 'batman vs superman', timings = [{time:'10:00'}, {time:'11.00'}, {time:'13:00'}]},
    { id: 3, name: 'avengers endgame', timings = [{time:'10:00'}, {time:'11.00'}, {time:'13:00'}, {time:'15:00'} ] },
    { id: 4, name: 'harry potter', timings = [{time:'7:00'}, {time:'12.00'}, {time:'14:00'}, {time:'18:00'}]},
    { id: 5, name: 'aquaman', timings = [{time:'12:00'}, {time:'14.00'}] },
];

app.get('/', (req, res)=> {
    res.send('hello world!!');
}); 
app.get('/api/movies', (req, res)=> {
    res.send(movies);
});
app.get('/api/movies/:id', (req, res)=>{
   const movie = movies.find(c => c.id === parseInt(req.params.id));
   if (!movie) return res.status(404).send('The movie with given ID was not found.');
   res.send(movie);
});

app.post('/api/movies' ,(req,res) => {
    const { error } = validateMovie( req.body ); // result.error
    if (error) return res.status(400).send(result.error.details[0].message);     
    const movie = {
        id: movies.length + 1,
        name: req.body.name
    };
    movies.push(movie);
    res.send(movie);
});

app.put('api/movies/:id', (req, res) =>{
    // look up the movie
    // if not existing, return 404
    const { error } = validateMovie( req.body ); // result.error
    if (error) return res.status(400).send(result.error.details[0].message);
    //validate
    //if invalid, return 400 - bad request
    const { error } = validateMovie( req.body ); // result.error
    if (error) return res.status(400).send(result.error.details[0].message);
    // update movie
    movie.name = req.body.name;
    // return the update course
    res.send(movie); 
});

app.delete('api/movies/;id', (req, res) => {
    //look up the movie
    //not existing, return 404
    const { error } = validateMovie( req.body ); // result.error
    if (error) return res.status(400).send(result.error.details[0].message);
    //delete
    const index = movies.indexOf(movie);
    movies.splice(index, 1);
    //return the same movie
    res.send(movie);
});

function validateMovie(movie){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(movie, schema);

}

// PORT
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}...`));