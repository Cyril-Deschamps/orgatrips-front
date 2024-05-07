import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next-translate-routes";
import React from "react";
import nextI18nextConfig from "../../next-i18next.config";
import { REGISTER_LINK } from "../routes";
import { useAuth } from "../services/auth/apiProvider";
import LoginForm from "../services/auth/components/LoginForm";
import { useToastsWithIntl } from "../services/toast-notifications";
import Card from "../services/ui/Card";
import CardHeader from "../services/ui/CardHeader";
import AppLayout from "../services/ui/Layout/AppLayout";
import Title1 from "../services/ui/Title1";
import Link from "next-translate-routes/link";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const { t } = useTranslation(["auth"]);
  const { login, user } = useAuth();
  const { toastError } = useToastsWithIntl(["auth"]);
  const router = useRouter();

  if (user) {
    router.back();
  }

  return (
    <AppLayout>
      <Card className={"max-w-96"}>
        <CardHeader>
          <Title1>{t("auth:loginAction")}</Title1>
        </CardHeader>
        <LoginForm
          onSubmit={(loginInfos) => {
            return login(loginInfos).catch(() => {
              toastError("auth:login.TOAST_ERROR");
            });
          }}
        />
        <div className={"flex justify-center mt-s font-bold text-sm"}>
          <Link href={REGISTER_LINK}>{t("auth:or-register")}</Link>
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

export default Login;
