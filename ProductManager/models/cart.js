import { Schema, model } from 'mongoose'

const cartSchema = new Schema({
    products: {
        type: [
            {
                id_prod: {
                    // en este caso este dato es unico
                    // asi con esto se evita referencias redundantes
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'products'
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        default: []
    }


})

cartSchema.pre('findOne', function(){
    this.populate('products.id_prod')
})

const cartModel = model("carts", cartSchema)

export default cartModel