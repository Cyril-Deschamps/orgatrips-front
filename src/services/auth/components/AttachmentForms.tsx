import React, { FunctionComponent } from "react";
import { useTranslation } from "next-i18next";
import { useToastsWithIntl } from "../../toast-notifications";
import FileInput from "../../files/FileInput";
import { readFile } from "../../files/utils";
import { User, UserKyc } from "../user";
import useFileAsObjectURL from "../../files/useFileAsObjectURL";

const AttachmentForms = ({
  user,
  onUpdateKyc,
}: {
  user: User;
  onUpdateKyc: KycProps["onUpdateKyc"];
}): JSX.Element => {
  const { t } = useTranslation(["auth"]);

  return (
    <div className={"grid --3-cols attachments-grid"}>
      <div className={"form-block"}>
        <label className={"input-label"}>{t("auth:user.kyc.identity")}</label>
        <KycForm
          onUpdateKyc={onUpdateKyc}
          type={"identity"}
          value={user.Kyc.identity}
        />
      </div>

      <div className={"form-block"}>
        <label className={"input-label"}>{t("auth:user.kyc.kbis")}</label>
        <KycForm
          onUpdateKyc={onUpdateKyc}
          type={"kbis"}
          value={user.Kyc.kbis}
        />
      </div>

      <div className={"form-block"}>
        <label className={"input-label"}>{t("auth:user.kyc.bank")}</label>
        <KycForm
          onUpdateKyc={onUpdateKyc}
          type={"bank"}
          value={user.Kyc.bank}
        />
      </div>
    </div>
  );
};

type KycProps = {
  value: UserKyc[keyof UserKyc];
  type: keyof UserKyc;
  onUpdateKyc: (type: keyof UserKyc, form: Partial<UserKyc>) => Promise<void>;
};

const KycForm: FunctionComponent<KycProps> = ({ value, type, onUpdateKyc }) => {
  const { t } = useTranslation(["auth"]);
  const { toastError, toastSuccess } = useToastsWithIntl(["auth"]);
  const objectURL = useFileAsObjectURL({ url: value });

  const updateKyc = (type: keyof UserKyc, file: string | null) =>
    onUpdateKyc(type, { [type]: file }).then(
      () => {
        toastSuccess("auth:update-kyc.SUCCESS");
      },
      () => {
        toastError("auth:update-kyc.ERROR");
      },
    );

  return value !== null ? (
    <div className={"file"}>
      <a
        className={"file-name"}
        href={objectURL?.url ?? "#"}
        rel={"noreferrer"}
        target={"_blank"}
      >
        {objectURL !== null &&
          objectURL.name !== undefined &&
          `${type}.${objectURL.name.split(".")[1]}`}
      </a>
      <button
        className={"delete-file"}
        onClick={() => updateKyc(type, null)}
        type={"button"}
      >
        Supprimer
      </button>
    </div>
  ) : (
    <FileInput
      accept={"image/*,application/pdf"}
      dragLabel={`Déposez votre ${t(
        `auth:user.kyc.${type}` as unknown as TemplateStringsArray,
      )} ici (PDF ou image, 5mo max)`}
      onChange={(list) => {
        if (list[0].size / 1024 > 5000) toastError("auth:update-kyc.TOO_LARGE");
        else readFile(list[0]).then(async (file) => updateKyc(type, file));
      }}
    />
  );
};

export default AttachmentForms;
