'use strict';

import mongoose from 'mongoose';

var MonosvcSchema = new mongoose.Schema({
/*  name: String,
  info: String,
  active: Boolean,*/
  imageName: String, //uploaded
  resized: Boolean, //resized
  userNotified: Boolean, //notified
  starts: Number, //badges
  tweeted: Boolean //tweeted
});

export default mongoose.model('Monosvc', MonosvcSchema);
