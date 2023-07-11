const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
app.set('views', path.join(__dirname, 'views'));
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.use((req, res, next) => {
  User.findById('64ad2d61b57252d8548c7a50')
    .then(user => {                                                               
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
}); 

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://abhinandanbhope1642000:Abhi123@cluster0.xvthvtu.mongodb.net/shop?retryWrites=true&w=majority').then(result =>{
  User.findOne().then(user =>{
    if(!user){
      const user = new User({
        name:'Max' ,
        email: 'max@text.com' ,
        cart: {
          items: []
        }
      });
      user.save();

    }

  });
 

console.log(result) ; 
app.listen(3000);
})
.catch(err =>{
  console.log(err);
});
