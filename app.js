const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();

dotenv.config({path:'config.env'});

app.use(bodyParser.urlencoded({ extended: true }))


MongoClient.connect(process.env.MONGO_URI, { 
    useUnifiedTopology: true}) 
    .then(client =>{
      console.log('connected to db')
      const db = client.db('roster')
      const playersCollection = db.collection('players')  
      
      app.set('view engine', 'ejs')
      app.use(bodyParser.urlencoded({ extended: true }))
      app.use(bodyParser.json());
      app.use(express.static('public'));
      

      app.get('/', (req, res) => {
        db.collection('players').find().toArray()
          .then(results => {
            res.render('index.ejs', { players: results})
          })
          .catch(error => console.error(error))
        // res.render('index.ejs', {})  
      })

      app.post('/players', (req, res) => {
        playersCollection.insertOne(req.body)
          .then(result => {
            res.redirect('/')
          })
          .catch(error => console.error(error))
      })

      app.post('/players', (req,res) => {
          console.log(req.body);
      })

      app.delete('/players', (req, res) => {
        playersCollection.deleteOne(
          { player: req.body.player }
        )
          .then(result => {
            if (result.deletedCount === 0) {
              return res.json('No fav book to delete')
            }
            res.json('Deleted favorite book')
          })
          .catch(error => console.error(error))
      })

      app.listen(3000, function() {
          console.log("listening");
      })

})
.catch(error => console.error(error))
