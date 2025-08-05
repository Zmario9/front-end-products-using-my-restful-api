import { Form, useFetcher, useNavigation } from "react-router-dom";
import {
  ActionBtnsColor,
  ActionBtnsStyle,
  DeleteBtnColor,
  NotAvailableBtnColors,
} from "../tailwindStylePatterns/bts";
import type { Product } from "../types";
import { formatCurrency } from "../utils";
import { useNavigate } from "react-router-dom";
import ModalDialog from "./ModalDialog";
import { useState } from "react";

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isAvailable = product.availability ? "Disponible" : "No disponible";

  // Aquí obtenemos el estado del fetcher
  const isSubmittingAvailability =
    fetcher.state === "submitting" &&
    fetcher.formData?.get("id") === product.id.toString();

  const isDeleting =
    navigation.state === "submitting" &&
    navigation.formAction.includes(`productos/${product.id}/eliminar`);

  return (
    <>
      <tr className="border-b hover:bg-gray-300 duration-150">
        <td className="p-3 text-lg text-gray-800">{product.name}</td>
        <td className="p-3 text-lg text-gray-800 text-center">
          {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800 text-center">
          <fetcher.Form action="" method="POST">
            <button
              type="submit"
              name="id"
              id="availability"
              value={product.id}
              className={
                isAvailable === "Disponible"
                  ? ActionBtnsColor + " " + ActionBtnsStyle
                  : NotAvailableBtnColors +
                    " " +
                    ActionBtnsStyle +
                    " disabled:cursor-not-allowed"
              }
              disabled={isSubmittingAvailability}
            >
              {isSubmittingAvailability ? "Cambiando..." : isAvailable}
            </button>
          </fetcher.Form>
        </td>
        <td className="p-3 text-lg text-gray-800">
          <div className="flex gap-2 items-center justify-center">
            <button
              onClick={() => navigate(`/productos/${product.id}/editar`)}
              className={ActionBtnsStyle + " cursor-pointer " + ActionBtnsColor}
            >
              Editar
            </button>
            {/* Este botón ahora solo abre el modal */}
            <button
              type="button"
              className={ActionBtnsStyle + " " + DeleteBtnColor}
              onClick={() => setDialogVisible(true)}
            >
              Eliminar
            </button>

            {/* El modal ahora contendrá el formulario de eliminación */}
            <ModalDialog
              isModalOpen={isDialogVisible}
              onClose={() => setDialogVisible(false)}
            >
              <Form method="POST" action={`productos/${product.id}/eliminar`}>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    ¿Estás seguro de que quieres eliminar el producto{" "}
                    {product.name}?
                  </p>
                </div>
                <div className="mt-4 flex gap-2 justify-end">
                  <button
                    type="button"
                    className={ActionBtnsStyle + " " + ActionBtnsColor}
                    onClick={() => setDialogVisible(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className={
                      ActionBtnsStyle +
                      " " +
                      DeleteBtnColor +
                      " disabled:cursor-not-allowed"
                    }
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Eliminando..." : "Eliminar"}
                  </button>
                </div>
              </Form>
            </ModalDialog>
          </div>
        </td>
      </tr>
    </>
  );
}
