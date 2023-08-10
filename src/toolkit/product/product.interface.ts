export interface IProduct {
    id?: number,
    name :string,
    description: string
    quantity : number,
    origin : string
}
export interface IProductState {
    products : IProduct[]
}
export interface SearchPayLoad {
    seachTerm :string;
    products :IProduct[]
}