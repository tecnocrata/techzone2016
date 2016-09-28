'use strict';

import mongoose from 'mongoose';

var MonosvcSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  imageName: String,
  resized: Boolean
});

export default mongoose.model('Monosvc', MonosvcSchema);
