import {
  Link,
  Form,
  useActionData,
  type HTMLFormMethod,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import ErrorMsg from "../components/ErrorMsg";
import {
  ActionBtnsStyle,
  viewsParentDivStructure,
  headingParentDivStyle,
  ActionBtnsColor,
} from "../tailwindStylePatterns/bts";
import type { Product } from "../types";

type FormDataProps = {
  method: HTMLFormMethod;
  formTitle: string;
  btnTitle: string;
  isEditing?: boolean;
};

const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

export default function ProductForm({
  method,
  formTitle,
  btnTitle,
  isEditing,
}: FormDataProps) {
  const productToEdit = useLoaderData<Product>();
  const error = useActionData();
  const navigation = useNavigation();

  const isSubmitting =  navigation.state === "submitting";

  return (
    <>
      <div className={viewsParentDivStructure}>
        <h2 className={headingParentDivStyle}>{formTitle}</h2>
        <Link to="/" className={ActionBtnsStyle + " " + ActionBtnsColor}>
          Regresar a página principal
        </Link>
      </div>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <Form className="mt-10" method={method}>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="name">
            Nombre Producto:
          </label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50 shadow-gray-600"
            placeholder="Nombre del Producto"
            name="name"
            autoComplete="off"
            defaultValue={productToEdit?.name || ""}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="price">
            Precio:
          </label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50 shadow-gray-600"
            placeholder="Precio Producto. ej. 200, 300"
            name="price"
            defaultValue={productToEdit?.price || ""}
          />
        </div>
        {isEditing && (
          <div className="mb-4">
            <label className="text-gray-800" htmlFor="availability">
              Disponibilidad:
            </label>
            <select
              id="availability"
              className="mt-2 block w-full p-3 bg-gray-50"
              name="availability"
              defaultValue={productToEdit?.availability.toString()}
            >
              {availabilityOptions.map((option) => (
                <option key={option.name} value={option.value.toString()}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <input
          type="submit"
          className="mt-5 w-full hover:bg-indigo-700 duration-100 bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded disabled:cursor-not-allowed"
          value={isSubmitting ? "Cargando..." : btnTitle}
          disabled={isSubmitting}
        />
      </Form>
    </>
  );
}
