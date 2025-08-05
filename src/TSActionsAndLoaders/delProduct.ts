import { type ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteProduct } from "../ProductServices/ProductService";
export async function deleteProductAction({params}: ActionFunctionArgs){
    console.log(params.id);
    console.log("Desde DELETE PRODUCT");
    if(params.id !== undefined) await deleteProduct(+params.id);
    return redirect("/");
}