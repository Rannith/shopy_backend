import pkg from 'mongoose';
const { Schema, model } = pkg;

const schema = Schema;

const productTypeSchema = new schema({
    productType: {
        type: String,
        required: true
    }
})

export default model("product_type", productTypeSchema);