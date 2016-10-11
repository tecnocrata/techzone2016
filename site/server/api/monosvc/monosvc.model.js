'use strict';

import mongoose from 'mongoose';

var MonosvcSchema = new mongoose.Schema({
    imageName: String, //uploaded
    userNotified: Boolean, //notified
    stars: Number, //badges
    resized: Boolean, //resized
    tweeted: Boolean //tweeted
});

export default mongoose.model('Monosvc', MonosvcSchema);
