import { type ActionFunctionArgs, redirect, type LoaderFunctionArgs } from "react-router-dom";
import { getProductById, updateProduct } from "../ProductServices/ProductService";

export async function editProductAction({ request, params }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());
    let error = "";
    if (Object.values(data).includes("")) error = "Todos los campos son obligatorios";
    if (+data.price <= 0) error = "El precio no puede ser negativo";
    if (error.length) return error;
    if (params.id !== undefined) {
        await updateProduct(data, +params.id);
    }
    return redirect("/");
}

export async function editProductLoader({ params }: LoaderFunctionArgs) {
    // console.log(params.id);
    if (params.id !== undefined) {
        const product = await getProductById(+params.id);
        if (!product) return redirect("/");
        return product;
    }
}