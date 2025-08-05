import ProductForm from "../components/ProductForm";
export default function NewProduct() {
  return (
    <>
      <ProductForm
        method="POST"
        formTitle="Registrar Producto"
        btnTitle="Registrar"
      ></ProductForm>
    </>
  );
}
