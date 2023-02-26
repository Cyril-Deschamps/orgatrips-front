import { FunctionComponent } from "react";
import { useTranslation } from "next-i18next";
import logger from "../i18n/logger";
import { useFormikContext } from "formik";

interface Props {
  errors?: unknown;
}

const ValidationsErrors: FunctionComponent<Props> = ({
  errors: propsErrors,
}) => {
  const { t } = useTranslation(["validations"]);
  const { errors: formikErrors } = useFormikContext();

  const errors = propsErrors ? propsErrors : formikErrors;

  if (errors && typeof errors == "object") {
    if (Object.keys(errors).length === 0) return null;

    return (
      <ul className={"form-errors"}>
        {Object.entries(errors).map(([field, e]) => {
          if (typeof e === "object" && !("key" in e)) {
            return (
              <li key={field}>
                <ValidationsErrors errors={e} />
              </li>
            );
          }

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          /* @ts-ignore */
          const tr = t(`validations:${e.key}`, e.values);
          if (!tr || tr === "undefined") {
            logger.error(
              `Une validation n'a pas été renseignée pour le champ ${field}`,
              e.key,
              `validations:${e.key}`,
              e.values,
            );
            return null;
          }
          return <li key={field}>{tr as string}</li>;
        })}
      </ul>
    );
  }

  return null;
};

export default ValidationsErrors;
