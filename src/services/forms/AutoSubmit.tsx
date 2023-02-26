import * as React from "react";
import { useFormikContext } from "formik";
import { isEqual, debounce } from "lodash";

const AutoSubmit = ({
  minDebounce = 500,
  maxDebounce,
}: {
  minDebounce?: number;
  maxDebounce?: number;
}): null => {
  const formik = useFormikContext();
  const [lastValues, updateState] = React.useState(formik.values);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const submitForm = React.useCallback(
    debounce(
      (): void => {
        formik.submitForm();
      },
      minDebounce,
      maxDebounce ? { maxWait: maxDebounce } : {},
    ),
    [],
  );

  React.useEffect(() => {
    const valuesEqualLastValues = isEqual(lastValues, formik.values);

    const valuesEqualInitialValues = isEqual(
      formik.values,
      formik.initialValues,
    );

    if (!valuesEqualLastValues) {
      updateState(formik.values);
    }

    if (!valuesEqualLastValues && !valuesEqualInitialValues && formik.isValid) {
      submitForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values, formik.isValid]);

  return null;
};

export default AutoSubmit;
