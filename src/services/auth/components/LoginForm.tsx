import React, { FunctionComponent, useMemo } from "react";
import { LOST_PASSWORD_LINK, REGISTER_LINK } from "../../../routes";
import { object, string } from "yup";
import { UserToLogin } from "../user";
import ValidationsErrors from "../../forms/ValidationsErrors";
import SubmitButton from "../../forms/SubmitButton";
import Form from "../../forms/Form";
import AutoField from "../../forms/AutoField";
import { useTranslation } from "next-i18next";
import Link from "next/link";

interface Props {
  onSubmit: (values: UserToLogin) => Promise<unknown>;
  onCancel?: () => void;
}

const LoginForm: FunctionComponent<Props> = ({ onSubmit, onCancel }) => {
  const { t } = useTranslation(["auth"]);
  const LoginSchema = useMemo(
    () =>
      object()
        .shape({
          email: string().label(t("auth:email")).required().email(),
          password: string().label(t("auth:password")).password(),
        })
        .defined(),
    [t],
  );

  return (
    <div className={"auth-form"}>
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          return onSubmit(values);
        }}
        schema={LoginSchema}
      >
        <AutoField name={"email"} placeholder={"votre.email@email.fr"} />

        <AutoField name={"password"} placeholder={"********"} />

        <div className={"lost-password-cta"}>
          <Link href={LOST_PASSWORD_LINK}>Mot de passe oublié</Link>
        </div>

        <div className={"form-footer"}>
          <ValidationsErrors />
          {onCancel && (
            <button onClick={onCancel} type={"button"}>
              Annuler
            </button>
          )}
          <SubmitButton>Connexion</SubmitButton>
          {!onCancel && (
            <Link className={"link"} href={REGISTER_LINK}>
              Inscription
            </Link>
          )}
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
