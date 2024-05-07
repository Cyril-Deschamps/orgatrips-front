import React, { FunctionComponent, useMemo } from "react";
import { object, string } from "yup";
import { UserToLogin } from "../user";
import ValidationsErrors from "../../forms/ValidationsErrors";
import SubmitButton from "../../forms/SubmitButton";
import Form from "../../forms/Form";
import AutoField from "../../forms/AutoField";
import { useTranslation } from "react-i18next";

interface Props {
  onSubmit: (values: UserToLogin) => Promise<unknown>;
}

const LoginForm: FunctionComponent<Props> = ({ onSubmit }) => {
  const { t } = useTranslation(["auth"]);
  const LoginSchema = useMemo(
    () =>
      object()
        .shape({
          email: string().label(t("auth:email")).required().email(),
          password: string()
            .label(t("auth:password"))
            .password(new RegExp(`.`)),
        })
        .defined(),
    [t],
  );

  return (
    <Form
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        return onSubmit(values);
      }}
      schema={LoginSchema}
    >
      <div className={"flex flex-col gap-xxs"}>
        <AutoField name={"email"} placeholder={"votre.email@email.fr"} />

        <AutoField name={"password"} placeholder={"********"} />
      </div>
      <div className={"flex flex-col items-center mt-m"}>
        <ValidationsErrors />
        <SubmitButton>{t("auth:loginAction")}</SubmitButton>
      </div>
    </Form>
  );
};

export default LoginForm;
