import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products from "./views/Products";
import { newProductAction , productsAction, productsLoader } from "./TSActionsAndLoaders/allProducts";
import { editProductAction, editProductLoader } from "./TSActionsAndLoaders/editProduct";
import NewProduct from "./views/NewProduct";
import EditProduct from "./views/EditProduct";
import { deleteProductAction } from "./TSActionsAndLoaders/delProduct";

export const router = createBrowserRouter([
    {
        path:"/",
        element: Layout(),
        children:[
            {
                index: true,
                element: <Products/>,
                loader: productsLoader,
                action: productsAction
            },{
                path:"productos/nuevo",
                element: <NewProduct/>,
                action: newProductAction
            },{
                path:"productos/:id/editar",
                element: <EditProduct/>,
                action: editProductAction,
                loader: editProductLoader
            },{
                path:"productos/:id/eliminar",
                action: deleteProductAction
            }
        ]
    }
]);