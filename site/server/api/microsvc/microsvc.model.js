'use strict';

import mongoose from 'mongoose';

var MicrosvcSchema = new mongoose.Schema({
    imageName: String, //uploaded
    userNotified: Boolean, //notified
    stars: Number, //badges
    resized: Boolean, //resized
    tweeted: Boolean //tweeted
});

export default mongoose.model('Microsvc', MicrosvcSchema);
