import Form from "../../forms/Form";
import { useMemo } from "react";
import { object, string, number } from "yup";
import { useTranslation } from "next-i18next";
import AutoField from "../../forms/AutoField";
import { useToastsWithIntl } from "../../toast-notifications";
import ValidationsErrors from "../../forms/ValidationsErrors";
import SubmitButton from "src/services/forms/SubmitButton";
import { Position, User, UserToUpdateForm } from "../../../services/auth/user";

const ProfileForm = ({
  user,
  onUpdateUser,
}: {
  user: User;
  onUpdateUser: (u: UserToUpdateForm) => Promise<void>;
}): JSX.Element => {
  const { t } = useTranslation(["auth"]);
  const { toastError, toastSuccess } = useToastsWithIntl(["auth"]);

  const ProfileSchema = useMemo(
    () =>
      object()
        .shape({
          email: string().label(t("auth:email")).email().notEditable(),
          lastname: string()
            .label(t("auth:user.lastname"))
            .nullable()
            .required(),
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
        .defined(),
    [t],
  );

  return (
    <div>
      <Form
        initialValues={user}
        onSubmit={(values) =>
          onUpdateUser(values).then(
            () => {
              toastSuccess("auth:update-user.SUCCESS");
            },
            () => {
              toastError("auth:update-user.ERROR");
            },
          )
        }
        schema={ProfileSchema}
      >
        <div className={"grid --2-cols"}>
          <AutoField name={"email"} />
          <AutoField name={"lastname"} />
          <AutoField name={"firstname"} />
          <AutoField name={"phone"} />
          <AutoField name={"companyName"} />
          <AutoField name={"position"} />
          <AutoField name={"siret"} />
          <div className={"form-block"} />
        </div>

        <div className={"form-footer"}>
          <ValidationsErrors />
          <SubmitButton>Enregistrer</SubmitButton>
        </div>
      </Form>
    </div>
  );
};

export default ProfileForm;
