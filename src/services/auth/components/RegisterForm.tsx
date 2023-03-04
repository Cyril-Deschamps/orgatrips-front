import React, { FunctionComponent, useMemo } from "react";
import { useTranslation } from "next-i18next";
import { object, ref, SchemaOf, string, number } from "yup";
import { LOGIN_LINK } from "../../../routes";
import Form from "../../forms/Form";
import { Position, UserToRegisterForm } from "../user";
import ValidationsErrors from "../../forms/ValidationsErrors";
import SubmitButton from "../../forms/SubmitButton";
import AutoField from "../../forms/AutoField";
import Link from "next/link";

interface Props {
  onSubmit: (values: UserToRegisterForm) => Promise<void>;
  onCancel?: () => void;
}

const RegisterForm: FunctionComponent<Props> = ({ onSubmit, onCancel }) => {
  /* Hooks */
  const { t } = useTranslation(["auth"]);

  /* Models */
  const RegisterSchema: SchemaOf<UserToRegisterForm> = useMemo(() => {
    const BaseSchema = object()
      .shape({
        email: string().label(t("auth:email")).required().email(),
        password: string()
          .label(t("auth:password"))
          .nullable()
          .required()
          .meta({ password: true })
          .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
            message: { key: "user.password.matches" },
          }),
        passwordConfirmation: string()
          .label(t("auth:password-confirm"))
          .nullable()
          .required()
          .meta({ password: true })
          .equals([ref("password")], { key: "user.password.equals" }),
        lastname: string().label(t("auth:user.lastname")).nullable().required(),
        firstname: string()
          .label(t("auth:user.firstname"))
          .nullable()
          .required(),
        phone: string().label(t("auth:user.phone")).nullable().required(),
        companyName: string()
          .label(t("auth:user.company-name"))
          .nullable()
          .required(),
        position: number()
          .label(t("auth:user.position-label"))
          .meta({
            select: true,
            enum: Position,
            translate: ["auth", "auth:user.position"],
          })
          .nullable()
          .required(),
        siret: string()
          .label(t("auth:user.siret"))
          .nullable()
          .required()
          .matches(/\d{14}/g),
      })
      .defined();

    return BaseSchema;
  }, [t]);

  return (
    <Form initialValues={{}} onSubmit={onSubmit} schema={RegisterSchema}>
      <div className={"grid --2-cols"}>
        <AutoField name={"email"} placeholder={"e.g. john.doe@mail.com"} />
        <AutoField name={"lastname"} placeholder={"Doe"} />
        <AutoField name={"firstname"} placeholder={"John"} />
        <AutoField name={"phone"} placeholder={"06 XX XX XX XX"} />

        <div>
          <AutoField name={"password"} placeholder={"**********"} />
          <p className={"input-tip"}>
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

        <AutoField name={"companyName"} placeholder={"MyCompany"} />
        <AutoField name={"position"} />
        <AutoField name={"siret"} placeholder={"XXX XXX XXX XXXXX"} />
        <div className={"form-block"} />
      </div>
      <div className={"form-footer"}>
        <ValidationsErrors />
        {onCancel && <button onClick={onCancel}>Annuler</button>}
        <SubmitButton>Envoyer ma demande</SubmitButton>
        {!onCancel && (
          <Link className={"link"} href={LOGIN_LINK}>
            J'ai déjà un compte, je me connecte
          </Link>
        )}
      </div>
    </Form>
  );
};

export default RegisterForm;
