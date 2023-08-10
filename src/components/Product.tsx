import { useEffect, useState } from "react";
import { useAddProductMutation, useDeleteProductMutation, useEditProductMutation, useGetProductListQuery } from "../toolkit/product/product.service"
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, editNewProduct, loadProductList, searchProduct } from "../toolkit/product/productSlice";
import { RootState } from "../toolkit";
import { IProduct } from "../toolkit/product/product.interface";

const Product = () => {
    const dispatch = useDispatch();
    const { isError,isLoading,data: ProductList,isSuccess : productListSuccess} = useGetProductListQuery(null);
    const [onAddProduct] = useAddProductMutation();
    const [onEditProduct] = useEditProductMutation();
    const [onDeleteProduct] = useDeleteProductMutation();
    const  productState = useSelector((state:RootState)=>state.products.products);
    const [id,setID] = useState<any>();
    const [name,setName] = useState<string>('');
    const [nameSearch,setNameSearch] = useState<string>('');
    const [decs,setDecs] = useState<string>('');
    const [quantity,setQuantity] = useState<number>(0);
    const [origin,setOrigin] = useState<string>('');
    useEffect(()=>{
        if(productListSuccess) {
            dispatch(loadProductList(ProductList))
        }
    },[productListSuccess])
    if(isLoading) {
        return <p>Loading ...</p>
    }
    if(isError) {
        return <p>Error ...</p>
    }
    const handleAddProduct = () => {
        var newId = ProductList.length > 0 ? ProductList[ProductList.length - 1].id + 1 : 1;
        const newProduct = {id:newId , name:name,description: decs,quantity:quantity,origin:origin};
        onEditProduct(newProduct)
        .then(()=>{
            dispatch(addNewProduct(newProduct));
        })
    }
     const handleEditProduct = (p : IProduct) => {
        const newProduct = {id: p.id, name:name,description: decs,quantity:quantity,origin:origin};
        onEditProduct(newProduct)
        .then(()=>{
            dispatch(editNewProduct(newProduct));
        })
    }
    const searchInput = () => {
        dispatch(searchProduct({seachTerm:nameSearch,products: ProductList}))
    }
    const handleDetailProduct = (p :IProduct) => {
        setID(p.id);
        setName(p.name);
        setDecs(p.description);
        setOrigin(p.origin);
        setQuantity(p.quantity);
    }
    return (
        <div>
            Name Search <input type="text" onChange={(e) => setNameSearch(e.target.value)} />
            <button onClick={searchInput}>Search</button>
            Name<input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
            Description<input type="text" onChange={(e) => setDecs(e.target.value)} value={decs}/>
            Quantity<input type="text" onChange={(e) => setQuantity(+e.target.value)} value={quantity}/>
            Origin<select onChange={(e) => setOrigin(e.target.value)} value={origin}>
                <option value={'Viet nam'}>Viet nam</option>
                <option value={'Trung quoc'}>Trung Quoc</option>
                <option value={'Thai lan'}>Thai lan</option>
            </select>
            <button onClick={handleAddProduct}>Them</button>
            <button onClick={e =>handleEditProduct({id:id, name:name,description: decs,quantity:quantity,origin:origin})}>Sua</button>
            <table>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Description</td>
                    <td>Quantity</td>
                    <td>Origin</td>
                    <td>Action</td>
                </tr>
                { (productState as IProduct[] || []).map(product=>{
                    return <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.quantity}</td>
                            <td>{product.origin}</td>
                            <td>
                                <button onClick={(e) => handleDetailProduct(product)}>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>

                })
                
                }
            </table>
        </div>
    )
}
export default Product;