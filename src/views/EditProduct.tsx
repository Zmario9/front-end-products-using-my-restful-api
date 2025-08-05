import ProductForm from "../components/ProductForm";

export default function EditProduct() {
  return (
    <>
      <ProductForm
        method="PUT"
        formTitle="Editar Producto"
        btnTitle="Editar"
        isEditing={true}
      ></ProductForm>
    </>
  );
}
