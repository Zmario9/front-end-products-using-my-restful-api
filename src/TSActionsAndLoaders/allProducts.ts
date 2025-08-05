import { type ActionFunctionArgs, redirect } from "react-router-dom";
import { addProduct, getProducts, updateProductAvailability } from "../ProductServices/ProductService";

export async function newProductAction({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = "";
  if (Object.values(data).includes("")) error = "Todos los campos son obligatorios";
  if (Object.values(data.price).includes("e")) error = "Datos escritos no válidos.";
  if (error.length) return error;

  await addProduct(data);
  return redirect("/");
}

export async function productsLoader() {
  const products = await getProducts();
  return products;
}

export async function productsAction({request}: ActionFunctionArgs){
  const data = Object.fromEntries(await request.formData());
  await updateProductAvailability(+data.id);
  return console.log("Desde action de actualizar");
}