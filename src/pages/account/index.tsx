import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import nextI18nextConfig from "../../../next-i18next.config";
import { LOGIN_LINK, TRIP_LINK } from "../../routes";
import { useAuthContext } from "../../services/auth/apiProvider";
import TripListItem from "../../services/trip/components/TripListItem";
import { useLoadSavedTrips } from "../../services/trip/tripHooks";
import Button from "../../services/ui/Button";
import Divider from "../../services/ui/Divider";
import AppLayout from "../../services/ui/Layout/AppLayout";
import PaginatedList from "../../services/ui/PaginatedList";
import SizedSection from "../../services/ui/SizedSection";
import Title1 from "../../services/ui/Title1";
import Title2 from "../../services/ui/Title2";

const Dashboard = (): JSX.Element => {
  const { user, logout } = useAuthContext();
  const { data: trips, isLoading } = useLoadSavedTrips();
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
          "flex flex-col z-10 min-h-[23rem] items-start md:min-h-[26rem]"
        }
      >
        <div className={"flex w-full items-center justify-between"}>
          <Title2 className={"!pb-0"}>Bonjour {user.firstname}</Title2>
          <div className={"flex flew-row flex-wrap gap-s"}>
            <Link href={TRIP_LINK}>
              <Button>Dernière recherche</Button>
            </Link>
            <Button onClick={logout}>{t("auth:logout")}</Button>
          </div>
        </div>
        <Divider className={"w-full mt-s mb-xl"} />
        <Title1>Mes voyages</Title1>
        {!isLoading && trips && (
          <PaginatedList
            className={
              "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-xl"
            }
            emptyPlaceholder={"Aucun voyage sauvegardé"}
            id={"trip-list"}
            items={trips}
            paginatedBy={12}
            render={(trip) => (
              <TripListItem
                key={trip.DestinationCity.name}
                canBeSaved={true}
                isSavedInitially={true}
                trip={trip}
              />
            )}
          />
        )}
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
