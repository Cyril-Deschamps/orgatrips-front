import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next-translate-routes";
import { useTranslation } from "react-i18next";
import nextI18nextConfig from "../../../next-i18next.config";
import { LOGIN_LINK } from "../../routes";
import { useAuth } from "../../services/auth/apiProvider";
import Button from "../../services/ui/Button";
import AppLayout from "../../services/ui/Layout/AppLayout";
import SizedSection from "../../services/ui/SizedSection";

const Dashboard = (): JSX.Element => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { t } = useTranslation(["auth", "pages_content", "website"]);

  if (!user) {
    router.push(LOGIN_LINK);
    return <></>;
  }

  return (
    <AppLayout>
      <SizedSection
        className={
          "flex flex-row z-10 min-h-[23rem] items-start md:min-h-[26rem] justify-center lg:justify-between"
        }
      >
        <div
          className={
            "ml-xs sm:ml-xl md:ml-0 lg:ml-2xl relative flex flex-col items-center gap-s"
          }
        >
          <Button onClick={logout}>{t("auth:logout")}</Button>
        </div>
      </SizedSection>
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

export default Dashboard;
