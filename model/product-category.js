import pkg from 'mongoose';
const { Schema, model } = pkg;

const schema = Schema;

const productCategorySchema = new schema({
    productCategory: {
        type: String,
        required: true
    }
})

export default model("product_category", productCategorySchema);