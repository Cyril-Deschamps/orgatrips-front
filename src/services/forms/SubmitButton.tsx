import { useContext, useMemo, useState } from "react";
import { FormikContextType, FormikContext } from "formik";
import { twMerge } from "tailwind-merge";
import Button from "../ui/Button";
import { useTranslation } from "react-i18next";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const SubmitButton = ({
  className,
  onClick,
  children,
}: ButtonProps): JSX.Element => {
  const formik: FormikContextType<unknown> | undefined =
    useContext(FormikContext);

  const { t } = useTranslation(["validations"]);

  const [isHookedSubmitting, setIsHookedSubmitting] = useState(false);

  // Memos
  const isSubmitting = useMemo(
    () => (formik?.isSubmitting && !onClick) || isHookedSubmitting,
    [formik?.isSubmitting, isHookedSubmitting, onClick],
  );

  return (
    <Button
      className={twMerge(className, "w-3/4")}
      disabled={isSubmitting}
      onClick={(ev) => {
        if (onClick) {
          ev.stopPropagation();
          const onSubmit = onClick(ev) as Promise<unknown> | void;

          if (onSubmit instanceof Promise) {
            setIsHookedSubmitting(true);
            onSubmit.finally(() => setIsHookedSubmitting(false));
          }
        }
      }}
      type={"submit"}
    >
      {isSubmitting ? t("validations:loading") : children}
    </Button>
  );
};

export default SubmitButton;
