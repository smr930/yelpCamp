var mongoose    = require("mongoose");

// schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    price: String,
    address: String,
    phone: Number,
    createdAt: { type: Date, default: Date.now },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },

    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// compile it into a model
module.exports = mongoose.model("Campground", campgroundSchema);