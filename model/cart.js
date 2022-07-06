import pkg from 'mongoose';
const { Schema, model } = pkg;
import user from './user'
import product from './product'

const schema = Schema;

const cartSchema = new schema({
    userId: {
        type: pkg.Types.ObjectId,
        ref: 'user',
        required: true
    },
    productId: {
        type: pkg.Types.ObjectId,
        ref: 'product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        required: false
    }
})

export default model("cart", cartSchema);