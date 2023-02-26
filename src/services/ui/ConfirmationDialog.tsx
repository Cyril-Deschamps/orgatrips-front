import {
  createContext,
  ElementType,
  FunctionComponent,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Dialog from "./block/Dialog";
import { Element, isValidElementType, typeOf } from "react-is";
import { spliceReturn } from "../data-structures/array";
import { Namespace, TFuncKey, useTranslation } from "next-i18next";
import { StringMap, TOptions } from "i18next";
import CardBody from "./block/CardBody";
import Section from "./block/Section";

interface ConfirmOptions {
  closable?: boolean;
}

interface Props {
  content: ReactElement | ReactNode;
  options: ConfirmOptions;
  onCancel?: (() => void) | boolean;
  onConfirm?: (() => void) | boolean;
}

const ConfirmationDialog: FunctionComponent<Props> = ({
  content,
  options,
  onCancel,
  onConfirm,
}) => {
  let contentElement;
  const typeOfContent = typeOf(content);
  if (typeOfContent === undefined || typeOfContent === Element) {
    contentElement = content;
  } else if (isValidElementType(content)) {
    const Content = content as ElementType;
    contentElement = <Content />;
  }

  const { closable } = options;

  return (
    <Dialog
      onClose={
        closable && typeof onCancel === "function" ? onCancel : undefined
      }
    >
      <CardBody>
        <Section>{contentElement}</Section>

        <div className={"form-footer right"}>
          {onCancel && (
            <button
              className={"btn-2"}
              onClick={typeof onCancel === "function" ? onCancel : undefined}
            >
              Annuler
            </button>
          )}
          <button
            className={"btn-1"}
            onClick={typeof onConfirm === "function" ? onConfirm : undefined}
          >
            Valider
          </button>
        </div>
      </CardBody>
    </Dialog>
  );
};

export default ConfirmationDialog;

export interface ConfirmationAPI {
  contents: [
    ReactElement | ReactNode,
    ConfirmOptions,
    [
      (() => Promise<unknown>) | undefined | boolean,
      (() => Promise<unknown>) | undefined | boolean,
    ],
  ][];
  confirm(
    content: ReactElement | ReactNode,
    confirm?: (() => Promise<unknown>) | boolean,
    cancel?: (() => Promise<unknown>) | boolean,
    options?: ConfirmOptions,
  ): void;
}

export interface ConfirmationAPIWithIntl<N extends Namespace> {
  contents: [
    ReactElement | ReactNode,
    ConfirmOptions,
    [
      (() => Promise<unknown>) | undefined | boolean,
      (() => Promise<unknown>) | undefined | boolean,
    ],
  ][];
  confirm<
    TKeys extends TFuncKey<N> | TemplateStringsArray extends infer A
      ? A
      : never,
    TInterpolationMap extends Record<string, unknown> = StringMap,
  >(
    key: TKeys | TKeys[],
    confirm?: (() => Promise<unknown>) | boolean,
    cancel?: (() => Promise<unknown>) | boolean,
    options?: (TOptions<TInterpolationMap> & ConfirmOptions) | string,
    defaultValue?: string,
  ): void;
}

export interface ProviderConfirmationAPI extends ConfirmationAPI {
  removeContent(content: Props["content"]): void;
}

export const ConfirmationContext =
  createContext<ProviderConfirmationAPI | null>(null);

export function useProvideConfirmation(): ProviderConfirmationAPI {
  const [contents, setContents] = useState<ConfirmationAPI["contents"]>([]);

  return {
    contents,
    confirm(content, confirm, cancel, options = { closable: true }) {
      setContents((prevContents) => [
        ...prevContents,
        [content, options, [confirm, cancel]],
      ]);
    },
    removeContent(content) {
      setContents((prevContents) =>
        spliceReturn(
          prevContents,
          prevContents.findIndex((c) => c[0] === content),
        ),
      );
    },
  };
}

/**
 * @deprecated Please use useConfirmationWithIntl
 */
export function useConfirmation(): ConfirmationAPI {
  const [currentContents, setCurrentContents] = useState<Props["content"][]>(
    [],
  );
  const context = useContext(ConfirmationContext) as ProviderConfirmationAPI;

  useEffect(() => {
    return () => {
      currentContents.forEach((c) => {
        context.removeContent(c);
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return useMemo(
    () => ({
      ...context,
      confirm(content, confirm, cancel, ...otherParams) {
        setCurrentContents((prevContents) => [...prevContents, content]);

        return context.confirm(
          content,
          confirm && typeof confirm === "function"
            ? () =>
                confirm().then(
                  () => context.removeContent(content),
                  () => {
                    /*Do nothing*/
                  },
                )
            : confirm === true
            ? () => {
                context.removeContent(content);
                return Promise.resolve();
              }
            : confirm,
          cancel && typeof cancel === "function"
            ? () =>
                cancel().then(
                  () => context.removeContent(content),
                  () => {
                    /*Do nothing*/
                  },
                )
            : cancel === true
            ? () => {
                context.removeContent(content);
                return Promise.resolve();
              }
            : cancel,
          ...otherParams,
        );
      },
    }),
    [context],
  );
}

export function useConfirmationWithIntl<N extends Namespace>(
  ns?: N,
): ConfirmationAPIWithIntl<N> {
  const [currentContents, setCurrentContents] = useState<Props["content"][]>(
    [],
  );
  const context = useContext(ConfirmationContext) as ProviderConfirmationAPI;
  const { t } = useTranslation(ns);

  useEffect(() => {
    return () => {
      currentContents.forEach((c) => {
        context.removeContent(c);
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return useMemo(
    () => ({
      ...context,
      confirm(key, confirm, cancel, options, defaultValue) {
        const content = defaultValue
          ? (t(key, defaultValue, options) as string)
          : (t(key, options) as string);
        setCurrentContents((prevContents) => [...prevContents, content]);

        return context.confirm(
          content,
          confirm && typeof confirm === "function"
            ? () =>
                confirm().then(
                  () => context.removeContent(content),
                  () => {
                    /*Do nothing*/
                  },
                )
            : confirm === true
            ? () => {
                context.removeContent(content);
                return Promise.resolve();
              }
            : confirm,
          cancel && typeof cancel === "function"
            ? () =>
                cancel().then(
                  () => context.removeContent(content),
                  () => {
                    /*Do nothing*/
                  },
                )
            : cancel === true
            ? () => {
                context.removeContent(content);
                return Promise.resolve();
              }
            : cancel,
          typeof options === "object" ? options : undefined,
        );
      },
    }),
    [context, t],
  );
}

export const ProvideConfirmation: FunctionComponent = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const confirmationAPI = useProvideConfirmation();

  return (
    <ConfirmationContext.Provider value={confirmationAPI}>
      {children}

      {confirmationAPI.contents.map((c, index) => (
        <ConfirmationDialog
          key={index}
          content={c[0]}
          onCancel={c[2][1]}
          onConfirm={c[2][0]}
          options={c[1]}
        />
      ))}
    </ConfirmationContext.Provider>
  );
};
