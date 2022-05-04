const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    //_id:{type:String,required:true},
    name: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    author: { type: String, required: true },
    productInCart: { type: Number, required: false },
    InStock: {type:Boolean , required:true},
},
    {
        timestamps: true,
    }
);
const Book = mongoose.model('Book', bookSchema);

module.exports = Book; 