'use strict';

import mongoose from 'mongoose';

var MonosvcSchema = new mongoose.Schema({
/*  name: String,
  info: String,
  active: Boolean,*/
    imageName: String, //uploaded
  userNotified: Boolean, //notified
  starts: Number, //badges
  resized: Boolean, //resized
  tweeted: Boolean //tweeted
});

export default mongoose.model('Monosvc', MonosvcSchema);
