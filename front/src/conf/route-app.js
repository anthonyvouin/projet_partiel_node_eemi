export const host = 'http://localhost';
export const port = ':3000';


export const routesApp = {
    categorie : {

    },
    contact:'/api/contact/send-email',
    product:{
        allProductsApi:'/api/product/get-all-products',
        productByIdApi: '/api/product/get-product-by-id/',
        createProduct: '/api/product/create'

    }
}