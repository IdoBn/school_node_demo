var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postsSchema = new Schema({
  title: String,
  body: String
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

postsSchema.virtual('createdAt')
  .get(function() {
    return this._id.getTimestamp();
  });

module.exports = mongoose.model('Post', postsSchema);