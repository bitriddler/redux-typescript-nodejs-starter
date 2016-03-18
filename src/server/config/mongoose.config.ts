import {Mongoose} from 'mongoose';

export function configureMongoose() {

  const mongoose = new Mongoose();

  mongoose.connect('mongodb://127.0.0.1/goodsense', function(err) {
    if(err) { throw err; }

    console.log("Successfully connected to mongodb");
  });

  return mongoose; 
}