import pkg from 'mongoose';
const { Schema, model } = pkg;
import productCategory from './product-category';
import productType from './product-type';

const schema = Schema;

const productSchema = new schema({
    productName: {
        type: String,
        required: true
    },
    productImageUrl: {
        type: String,
        required: true
    },
    oldPrice: {
        type: String,
        required: true
    },
    newPrice: {
        type: String,
        required: true
    },
    productCategoryId: {
        type: pkg.Types.ObjectId,
        ref: 'productCategory'
    },
    productTypeId: {
        type: pkg.Types.ObjectId,
        ref: 'productType'
    }
});

export default model("product", productSchema);