import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { IProduct, IProductState, SearchPayLoad } from "./product.interface";

const initialState : IProductState = {
    products:[]
}

const productSlice = createSlice({
    name: 'product',
    initialState : initialState,
    reducers : {
        loadProductList : (state,action: PayloadAction<IProduct[]>) => {
                state.products = action.payload
        },
        addNewProduct : (state,action: PayloadAction<IProduct>) => {
            state.products.push(action.payload);
        },
        searchProduct : (state,action: PayloadAction<SearchPayLoad>) => {
            const seachTerm = action.payload.seachTerm;
            const filterProduct = action.payload.products.filter(student=> student.name && student.name.toLowerCase().includes(seachTerm))
            state.products = filterProduct;
        },
        editNewProduct : (state,action: PayloadAction<IProduct>) => {
                const productIndex = state.products.findIndex(product => product.id === action.payload.id);
                if(productIndex != -1) {
                    state.products[productIndex] = {
                        name:action.payload.name,
                        description : action.payload.description,
                        quantity : action.payload.quantity,
                        origin : action.payload.origin
                    }
                }
        },
        deleteProduct : (state,action: PayloadAction<IProduct>) => {
            state.products.filter(product => product.id !== action.payload.id);        
        },
        
    }
})

export const {loadProductList,addNewProduct,searchProduct,editNewProduct,deleteProduct} = productSlice.actions;
export default productSlice.reducer;