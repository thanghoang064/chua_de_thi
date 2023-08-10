import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProduct } from './product.interface'

export const productApi = createApi({
    reducerPath : 'productApi',
    baseQuery : fetchBaseQuery({ baseUrl :'http://localhost:3001/products'}),
    endpoints :(builder)=> ({
        getProductList : builder.query({
            query: () => ``
        }),
        addProduct : builder.mutation<IProduct[],IProduct>({
            query:(product)=> ({
                url:'',
                method: 'POST',
                body : product
            })
        }),
        editProduct : builder.mutation<IProduct[],IProduct>({
            query:({id,...product})=> ({
                url:`/${id}`,
                method: 'PUT',
                body : product
            })
        }),
        deleteProduct : builder.mutation<IProduct[],IProduct>({
            query:({id})=> ({
                url:`/${id}`,
                method: 'DELETE'
              
            })
        })
    })
})

export const { useGetProductListQuery,useAddProductMutation,useEditProductMutation,useDeleteProductMutation } =  productApi;