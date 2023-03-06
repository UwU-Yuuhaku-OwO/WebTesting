// server.js
//console.log('May Node be with you')

const express = require('express');
const bodyParser= require('body-parser')
const app = express();

const MongoClient = require('mongodb').MongoClient

const connectionString = 'mongodb+srv://WhoTill:who123@cluster0.hjfsdes.mongodb.net/test'

// (0) CONNECT: server -> connect -> MongoDB Atlas 
MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        
        // (1a) CREATE: client -> create -> database -> 'star-wars-quotes'
        // -> create -> collection -> 'quotes'
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')
        
        // To tell Express to EJS as the template engine
        app.set('view engine', 'ejs') 
        
        // Make sure you place body-parser before your CRUD handlers!
        app.use(bodyParser.urlencoded({ extended: true }))

        // To make the 'public' folder accessible to the public
        app.use(express.static('public'))
        app.use('/css', express.static(__dirname + '/public/css'))
        app.use('/img', express.static(__dirname + '/public/img'))
        app.use('/js', express.static(__dirname + '/public/js'))
        app.use('/lib', express.static(__dirname + '/public/lib'))
        app.use('/scss', express.static(__dirname + '/public/scss'))

        // app.get('', (req, res) =>{
        //     res.sendFile(__dirname + '/views/index.html')
        // })

        // To teach the server to read JSON data 
        app.use(bodyParser.json())

        // (2) READ: client -> browser -> url 
        // -> server -> '/' -> collection -> 'quotes' -> find() 
        // -> results -> index.ejs -> client
        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
                .then(results => {

                    // results -> server -> console
                    console.log(results)
                    
                    // results -> index.ejs -> client -> browser 
                    // The file 'index.ejs' must be placed inside a 'views' folder BY DEFAULT
                    res.render('index1.ejs', { quotes: results })
                    // res.sendFile(__dirname + '/views/index1.html', { quotes: results })
                })
                .catch(/* ... */)
        })

        // (1b) CREATE: client -> index.ejs -> data -> SUBMIT 
        // -> post -> '/quotes' -> collection -> insert -> result
        app.post('/add', (req, res) => {
            quotesCollection.insertOne(req.body)
            .then(result => {
                
                // results -> server -> console
                console.log(result)

                // -> redirect -> '/'
                res.redirect('/')
             })
            .catch(error => console.error(error))
        })
        
        // (4) DELETE: client -> click -> 'Delete Darth Vadar's quote'
        // -> delete -> 'Darth Vadar'

        // app.de('/delete', function(req, res) {
        //     const id = req.body.id; // Get the ID of the document to delete
           
        //     quotesCollection.deleteOne({ _id: quotesCollection(id) }, function(err, result) {
        //       if (err) throw err;
           
        //       console.log('Document deleted');
        //       res.redirect('/');
        //     });
        //   });
          


          app.delete('/delete', (req, res) => {
            quotesCollection.deleteOne(
                { id: req.body.id }
            )
            .then(result => {
                res.json(`Deleted`)
            })
            .catch(error => console.error(error))
        })


        // app.delete('/quotes', (req, res) => {
        //     quotesCollection.deleteOne(
        //         { name: req.body.name }
        //     )
        //     .then(result => {
        //         res.json(`Deleted Darth Vadar's quote`)
        //     })
        //     .catch(error => console.error(error))
        // })


        
        // server -> listen -> port -> 3000
        app.listen(3000, function() {
            console.log('listening on 3000')
        })
    })


