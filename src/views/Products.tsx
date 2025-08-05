import { Link, useLoaderData } from "react-router-dom";
import { type Product} from "../types";
import {
  ActionBtnsStyle,
  viewsParentDivStructure,
  headingParentDivStyle,
  ActionBtnsColor,
} from "../tailwindStylePatterns/bts";
import ProductDetails from "../components/ProductDetails";

export default function Products() {
  const data = useLoaderData<Product[]>();
  // console.table(data);
  return (
    <>
      <div className={viewsParentDivStructure}>
        <h2 className={headingParentDivStyle}>Productos</h2>
        <Link to="productos/nuevo" className={ActionBtnsStyle+" "+ActionBtnsColor}>
          Agregar nuevo producto
        </Link>
      </div>
      <div className="p-2">
        <table className="w-full mt-5 table-auto rounded-lg overflow-hidden shadow-xl/30">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <ProductDetails
                key={product.id}
                product={product}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
