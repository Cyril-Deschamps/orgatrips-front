import React, { FunctionComponent, useMemo } from "react";
import { object, ref, string } from "yup";
import { UserToRegister } from "../user";
import ValidationsErrors from "../../forms/ValidationsErrors";
import SubmitButton from "../../forms/SubmitButton";
import Form from "../../forms/Form";
import AutoField from "../../forms/AutoField";
import { useTranslation } from "react-i18next";

interface Props {
  onSubmit: (values: UserToRegister) => Promise<void>;
}

const RegisterForm: FunctionComponent<Props> = ({ onSubmit }) => {
  const { t } = useTranslation(["auth"]);
  const RegisterSchema = useMemo(
    () =>
      object()
        .shape({
          email: string().label(t("auth:email")).required().email(),
          password: string().label(t("auth:password")).password(),
          passwordConfirmation: string()
            .label(t("auth:password-confirm"))
            .nullable()
            .passwordConfirmation(ref("password")),
          lastname: string().label(t("auth:lastname")).nullable().required(),
          firstname: string().label(t("auth:firstname")).nullable().required(),
        })
        .defined(),
    [t],
  );

  return (
    <Form initialValues={{}} onSubmit={onSubmit} schema={RegisterSchema}>
      <div className={"flex flex-col gap-xxs"}>
        <AutoField name={"email"} placeholder={"votre.email@email.fr"} />
        <AutoField name={"lastname"} placeholder={"Rousselo"} />
        <AutoField name={"firstname"} placeholder={"Alexandro"} />

        <AutoField name={"password"} placeholder={"********"} />
        <div className={"bg-gray-100 m-auto rounded-xl p-m"}>
          <p className={""}>
            Votre mot de passe doit contenir :<br />
            - Minimum 8 caractères
            <br />
            - Au moins 1 majuscule et 1 minuscule
            <br />
            - Au moins 1 chiffre
            <br />
          </p>
        </div>

        <AutoField name={"passwordConfirmation"} placeholder={"**********"} />
      </div>
      <div className={"flex flex-col items-center mt-m"}>
        <ValidationsErrors />
        <SubmitButton>{t("auth:registerAction")}</SubmitButton>
      </div>
    </Form>
  );
};

export default RegisterForm;
