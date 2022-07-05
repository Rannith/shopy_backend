import pkg from 'mongoose';
const { Schema, model } = pkg;

const schema = Schema;

const roleSchema = new schema({
    roleType: {
        type: String,
        required: true,
    }
})

export default model("role", roleSchema);