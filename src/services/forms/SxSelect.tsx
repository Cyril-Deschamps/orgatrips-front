import { ReactNode, useState } from "react";
import { useField } from "formik";
import Button from "../ui/reactive/Button";
import { DialogCloseContext } from "../ui/block/Dialog";

interface Props<E> {
  id?: string;
  name: string;
  selectModal: ReactNode;
  getElementName(element: NonNullable<E>): string;
  disabled?: boolean;
}

const SxSelect = <E,>({
  id,
  name,
  selectModal,
  getElementName,
  disabled,
}: Props<E>): JSX.Element => {
  const [openedSelectModal, setOpenedSelectModal] = useState(false);
  const [field, , helpers] = useField<E | null>(name);

  return (
    <div>
      {!disabled && (
        <Button
          id={id}
          onClick={() => setOpenedSelectModal(true)}
          type={"button"}
        >
          Ajouter
        </Button>
      )}

      {!!field.value && (
        <span>
          {getElementName(field.value as NonNullable<E>)}{" "}
          {!disabled && (
            <button onClick={() => helpers.setValue(null)} type={"button"}>
              Supprimer
            </button>
          )}
        </span>
      )}

      <DialogCloseContext.Provider value={() => setOpenedSelectModal(false)}>
        {openedSelectModal && selectModal}
      </DialogCloseContext.Provider>
    </div>
  );
};

export default SxSelect;
