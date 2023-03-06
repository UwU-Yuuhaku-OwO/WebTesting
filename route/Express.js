app.post('/delete', function(req, res) {
    const id = req.body.id; // Get the ID of the document to delete
   
    const collection = db.collection('quotes');
    collection.deleteOne({ _id: ObjectId(id) }, function(err, result) {
      if (err) throw err;
   
      console.log('Document deleted');
      res.redirect('/');
    });
  });
  