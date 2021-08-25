
const Sauce = require('../models/sauces');
const fs = require('fs');

exports.createThing = (req, res, next) => {
    req.body.sauce = JSON.parse(req.body.sauce);
    const url = req.protocol + '://' + req.get('host');
    const sauce = new Sauce({
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        mainPepper: req.body.sauce.mainPepper,
        imageUrl: url + '/images/' + req.file.filename,
        heat: req.body.sauce.heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
  });
  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.likeThing = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      let currentSauce = res.json(sauce);
      req.body = JSON.parse(req.body);

      if(req.body.like === 1 && currentSauce.usersLiked.includes(req.body.userID)){
        res.json({message : 'User already liked this sauce'})
      }
    
      if(req.body.like === -1 && currentSauce.usersDisliked.includes(req.body.userId)){
        res.json({message : 'User already disliked this sauce'})
      }
    1
      if(req.body.like === -1 && currentSauce.usersDisliked.includes(req.body.userId)=== false){
        currentSauce.likes -= 1;
        currentSauce.usersDisliked.push(req.body.userId);
      }
    
      if(req.body.like === 1 && currentSauce.usersLiked.includes(req.body.userId) === false){
        currentSauce.likes += 1;
        currentSauce.usersLiked.push(req.body.userId);
      }
    
      if(req.body.like === 0 && currentSauce.usersLiked.includes(req.body.userId)){
        currentSauce.likes -= 1;
        currentSauce.usersLiked.filter( id => id !== req.body.userId )
      }
    
      if(req.body.like === 0 && currentSauce.usersDisliked.includes(req.body.userId)){
        currentSauce.likes += 1;
        currentSauce.usersDisLiked.filter( id => id !== req.body.userId )
      }
      currentSauce.save().then(
        (sauce) => {
          res.status(201).json({
            message: 'Post saved successfully!'
          });
         })
         .catch(
          (error) => {
            res.status(404).json({
              error: error
            });
          }
        );
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  ); 
}

exports.getOneThing = (req, res, next) => {
    Sauce.findOne({
      _id: req.params.id
    }).then(
      (sauce) => {
        res.status(200).json(sauce);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  }


  exports.updateThing = (req, res, next) => {
 
  sauce = {...req.body}
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
   sauce.imageUrl = url + '/images/' + req.file.filename
  }
  Sauce.updateOne({_id: req.params.id}, sauce).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteThing = (req, res, next) => {
  Sauce.findOne({_id: req.params.id}).then(
    (sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Sauce.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      });
    }
  );
};

  exports.getAllthings = (req, res, next) => {
    Sauce.find().then(
      (sauces) => {
        res.status(200).json(sauces);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  }