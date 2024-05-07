import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import nextI18nextConfig from "../../next-i18next.config";
import { useRouter } from "next-translate-routes";
import { FunctionComponent } from "react";
import { ACCOUNT_LINK, BASE_LINK, LOGIN_LINK } from "../routes";
import { useAuth } from "../services/auth/apiProvider";
import { useToastsWithIntl } from "../services/toast-notifications";
import Card from "../services/ui/Card";
import CardHeader from "../services/ui/CardHeader";
import AppLayout from "../services/ui/Layout/AppLayout";
import Title1 from "../services/ui/Title1";
import Link from "next-translate-routes/link";
import RegisterForm from "../services/auth/components/RegisterForm";
import { useTranslation } from "react-i18next";

const Register: FunctionComponent = () => {
  const { t } = useTranslation(["auth"]);
  const { createAccount, user } = useAuth();
  const { toastError } = useToastsWithIntl(["auth"]);
  const router = useRouter();

  if (user) {
    router.push(BASE_LINK);
  }

  return (
    <AppLayout>
      <Card className={"max-w-96"}>
        <CardHeader>
          <Title1>{t("auth:registerAction")}</Title1>
        </CardHeader>
        <RegisterForm
          onSubmit={(registerInfos) => {
            return createAccount(registerInfos).then(
              () => {
                router.push(ACCOUNT_LINK);
              },
              () => {
                toastError("auth:login.TOAST_ERROR");
              },
            );
          }}
        />
        <div className={"flex justify-center mt-s font-bold text-sm"}>
          <Link href={LOGIN_LINK}>{t("auth:or-login")}</Link>
        </div>
      </Card>
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? "en",
      ["auth", "validations", "pages_content", "website"],
      nextI18nextConfig,
    )),
  },
});

export default Register;
