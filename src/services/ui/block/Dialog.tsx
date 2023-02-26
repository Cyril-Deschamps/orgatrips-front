import {
  createContext,
  CSSProperties,
  FunctionComponent,
  useContext,
} from "react";
import { createPortal } from "react-dom";
import useLockBodyScroll from "../useLockBodyScroll";
import classNames from "classnames";
import iconCloseGrey from "../../../assets/img/icons/icon-close-white.svg";
import Card from "./Card";
import Image from "next/image";

export type DialogCloseAPI = (() => void) | null;
export const DialogCloseContext = createContext<DialogCloseAPI>(null);

export function useDialogClose(): (() => void) | null {
  return useContext(DialogCloseContext);
}

interface Props {
  onClose?(): void;
  "aria-describedby"?: string;
  "aria-labelledby"?: string;
  className?: string;
  style?: CSSProperties;
  panel?: boolean;
  children: JSX.Element;
}

const Dialog: FunctionComponent<Props> = ({
  onClose,
  "aria-describedby": ariaDescribedBy,
  "aria-labelledby": ariaLabelledBy,
  children,
  className,
  style,
  panel,
}) => {
  useLockBodyScroll();
  const onCloseContext = useDialogClose();

  const template = (
    <div
      aria-describedby={ariaDescribedBy}
      aria-labelledby={ariaLabelledBy}
      className={"modal-overlay"}
    >
      <Card
        className={classNames([
          "dialog",
          "dialog-card",
          panel && "panel",
          className,
        ])}
        style={style}
      >
        {(onClose || onCloseContext) && (
          <button
            className={"close-btn"}
            onClick={(onClose || onCloseContext) as () => void}
          >
            <Image alt={"Fermer"} className={"icon"} src={iconCloseGrey} />
          </button>
        )}

        {children}
      </Card>
    </div>
  );

  return createPortal(template, document.body);
};

export default Dialog;
