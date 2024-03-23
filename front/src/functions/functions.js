import { host, port, routesApp } from '@/conf/route-app';

export const clickOnCloseButton = (e) => {
    return ( !e.target.farthestViewportElement && e.target.className === 'p-sidebar-mask p-component-overlay p-component-overlay-enter p-sidebar-visible p-sidebar-right')
    ||(e.target.farthestViewportElement && e.target.farthestViewportElement.classList.value === 'p-icon p-sidebar-close-icon white')
    || (!e.target.farthestViewportElement && e.target.className === 'p-icon p-sidebar-close-icon white')
    || (!e.target.farthestViewportElement && e.target.className === 'p-sidebar-close p-sidebar-icon p-link focus-sidebar-close-button')
    ||(!e.target.farthestViewportElement && e.target.classList.value === 'p-icon p-sidebar-close-icon white')
}

export const getProductsBabaWish = async(category) => {
    let response;
    if(category === 'tous les produits'){
        response = await fetch(`${host}${port}${routesApp.product.allProductsBabaWish}`);
    }else{
        response = await fetch(`${host}${port}${routesApp.product.byCategoryBabaWish}${category}`)
    }

    const result = await response.json();

    result.map(e => {
        if(e.image){
            e.image = `${host}${port}/${e.image}`;
        }
    })

    return result;
}

export const getIconsByCategory = (category) => {
    switch(category){
        case 'electronics':
            return 'computer';
        case 'jewelery':
            return 'diamond';
        case `men's clothing`:
            return 'face_6'
        case `women's clothing`: 
            return 'face_3';
        default: 
            return 'package_2';
    } 
}