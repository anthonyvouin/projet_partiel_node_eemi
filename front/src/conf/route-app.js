export const host = 'http://localhost';
export const port = ':3000';


export const routesApp = {
    categorie : {

    },
    contact:'/api/contact/send-email',
    product:{
        allProductsApi:'/api/product/get-all-products',
        allProductsBabaWish:'/api/product/get-all-productsDb',
        productByIdApi: '/api/product/get-product-by-id/',
        createProduct: '/api/product/create',
        deleteProduct: '/api/product/',
        updateProduct: '/api/product/',
        productById:'/api/product/products-by-id/'

    },
    orders:{
        allOrders: '/api/order/get-all-order',
        create: '/api/order/create'
    }
}