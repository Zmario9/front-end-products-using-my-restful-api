import { safeParse } from "valibot";
import { DraftProductSchema, ProductSchema, ProductsSchema, type Product } from "../types";
import axios from "axios";
type ProductData = {
    [k: string]: FormDataEntryValue;
}

// POST

export async function addProduct(data: ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        });
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/`;
            const { data } = await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            });
            // console.log(url);
            return console.log(data);
        } else {
            throw new Error("Datos no válidos");
        }
    } catch (error) {
        console.log(error);
    }
}

// GET

export async function getProductById(id: Product["id"]) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const { data } = await axios(url);
        const result = safeParse(ProductSchema, data.data);
        // console.log(result);

        if (result.success) return result.output;
        throw new Error("No se pudo obtener los datos");
    } catch (e) {
        console.log(e);
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`;
        const { data } = await axios(url);
        const result = safeParse(ProductsSchema, data.data);

        if (result.success) return result.output;
        throw new Error("No se pudo obtener los datos");
    } catch (e) {
        console.log(e);
    }
}

// PUT

export async function updateProduct(data: ProductData, id: Product["id"]) {
    // console.log("Desde update service")
    try {
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: Number(data.price),
            availability: data.availability === "true"
        });
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
            // console.log("CONSEGUIDO!")
            // console.log(result);
            await axios.put(url, result.output);
        }
    } catch (e) {
        console.log(e);
    }
}

// PATCH

export async function updateProductAvailability(id: Product["id"]){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.patch(url);
    } catch(e){
        console.log(e);
    }
}


// DELETE

export async function deleteProduct(id: Product["id"]) {
    try {
        // console.log("DESDE DELETE SERVICE");
        // console.log(id);
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.delete(url);
    } catch (e) {
        console.log(e);
    }
}
