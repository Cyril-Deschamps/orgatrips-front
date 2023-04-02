import React from "react";
import Image from "next/image";
import SizedSection from "../services/ui/SizedSection";
import TitleLegend from "../services/ui/TitleLegend";
import Title2 from "../services/ui/Title2";
import Divider from "../services/ui/Divider";
import TripSearchForm from "../services/trip/components/TripSearchForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import nextI18NextConfig from "../../next-i18next.config";
import { Trans, useTranslation } from "next-i18next";
import AppLayout from "../services/ui/Layout/AppLayout";
import { default as NextLink } from "next/link";

import dashboardIllustration from "../assets/img/dashboard-illustration.svg";
import logoKiwiClassic from "../assets/img/logo-kiwi-classic.svg";
import logoBookingClassic from "../assets/img/logo-booking-classic.svg";
import sectionCutBackground from "../assets/img/section-cut-background.svg";
import drawnArrow from "../assets/img/drawn-arrow.svg";
import bestPriceIcon from "../assets/img/icons/icon-best-price.svg";
import hotelIcon from "../assets/img/icons/icon-hotel.svg";
import planeIcon from "../assets/img/icons/icon-plane.svg";
import trainIcon from "../assets/img/icons/icon-train.svg";
import tripImage from "../assets/img/trip-image.jpeg";
import BaseSeo from "../services/seo/BaseSeo";
import { jsonLdScriptProps } from "react-schemaorg";
import { Organization } from "schema-dts";
import { hostBaseURL } from "../services/auth/config";
import { BOOKING_LINK, KIWI_LINK } from "../routes/external";

const Home = (): JSX.Element => {
  const { t } = useTranslation(["trip", "home", "website"]);

  return (
    <AppLayout>
      <BaseSeo
        description={t("home:page_description")}
        title={t("home:page_title")}
      >
        <script
          {...jsonLdScriptProps<Organization>({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${hostBaseURL}/#organization`,
            url: hostBaseURL,
            name: "OrgaTrips",
            logo: `${hostBaseURL}/assets/logo.png`,
          })}
        />
      </BaseSeo>
      <main className={"flex flex-col items-center"}>
        <SizedSection
          className={
            "flex flex-row z-10 min-h-[28rem] items-start sm:min-h-[26rem] justify-center lg:justify-between"
          }
        >
          <div
            className={
              "ml-xs sm:ml-xl md:ml-0 lg:ml-2xl relative flex flex-col items-center gap-s"
            }
          >
            <h1
              className={
                "font-VarsityTeam md:w-full text-4xl md:text-5xl leading-8 md:leading-10 sm:tracking-wide text-center lg:text-start"
              }
            >
              <Trans
                components={{
                  green: <span className={"text-green"} />,
                  little: (
                    <div
                      className={
                        "text-lg md:text-3xl leading-7 md:leading-8 w-[90%] md:w-[26rem] mx-auto lg:mx-0 tracking-normal pt-xs"
                      }
                    />
                  ),
                }}
              >
                {t("home:main_title")}
              </Trans>
            </h1>
            <Image
              alt={"drawn-arrow"}
              className={
                "hidden md:block absolute bottom-[-3rem] left-[33rem] w-28 md:w-36"
              }
              src={drawnArrow}
            />
          </div>
          <Image
            alt={"trip-illustration"}
            className={
              "w-2/6 pl-14 pt-10 xl:pt-0 xl:pl-0 xl:w-[32rem] hidden lg:block"
            }
            loading={"eager"}
            src={dashboardIllustration}
          />
        </SizedSection>
        <div
          className={
            "bg-white w-full mt-[-54px] flex flex-col items-center pb-6 md:pb-12"
          }
        >
          <SizedSection
            className={"flex flex-col justify-between lg:flex-row items-center"}
          >
            <TripSearchForm
              className={"mt-[-10em] z-20 shrink-0 lg:mr-10 mb-16"}
            />
            <p
              className={
                "w-full xl:w-[34rem] text-center font-regular text-s leading-5 lg:pt-0 xl:pt-10  max-w-xl"
              }
            >
              {" "}
              <Trans>{t("home:main_description")}</Trans>
            </p>
          </SizedSection>
          <SizedSection className={"pt-4xl"}>
            <div className={"sm:pl-[2.5vw]"}>
              <TitleLegend>{t("home:our_partners_legend")}</TitleLegend>
              <Title2 className={"text-3xl"}>
                {t("home:our_partners_title")}
              </Title2>
              <Divider className={"w-64"} />
              <div
                className={
                  "flex flex-row gap-x-3xl gap-y-s pt-10 md:pt-xl pl-1 flex-wrap w-[40%] items-center"
                }
              >
                <NextLink href={BOOKING_LINK}>
                  <Image
                    alt={"Logo Booking"}
                    className={
                      "max-h-l lg:max-h-2xl object-contain object-left grayscale"
                    }
                    src={logoBookingClassic}
                  />
                </NextLink>

                <NextLink href={KIWI_LINK}>
                  <Image
                    alt={"Logo kiwi"}
                    className={"max-h-3xl object-contain object-left grayscale"}
                    src={logoKiwiClassic}
                  />
                </NextLink>
              </div>
            </div>
            <div className={"mt-[-8rem] lg:mt-[-6rem]"}>
              <Image
                alt={"section-background relative"}
                className={"w-full h-[26rem]"}
                src={sectionCutBackground}
              />
              <div
                className={
                  "mt-[-26rem] pt-5 md:pt-8 pb-8 md:px-l lg:px-10 gap-xl flex flex-col"
                }
              >
                <div className={"flex flex-row-reverse"}>
                  <div
                    className={
                      "mx-xs md:mx-0 grid grid-cols-2 md:grid-cols-4 p-xs gap-xs md:gap-[6.5vw] w-[45%] h-[7.5rem] row-auto items-center justify-items-center"
                    }
                  >
                    <Image
                      alt={"icon-plane"}
                      className={
                        "max-w-[2.5rem] sm:max-w-[3.5rem] w-full h-full md:h-auto"
                      }
                      src={planeIcon}
                    />
                    <Image
                      alt={"icon-train"}
                      className={
                        "max-w-[2.5rem] sm:max-w-[3.5rem] w-full h-full md:h-auto"
                      }
                      src={trainIcon}
                    />
                    <Image
                      alt={"icon-hotel"}
                      className={
                        "max-w-[2.5rem] sm:max-w-[3.5rem] w-full h-full md:h-auto"
                      }
                      src={hotelIcon}
                    />
                    <Image
                      alt={"icon-best-price"}
                      className={
                        "max-w-[2.5rem] sm:max-w-[3.5rem] w-full h-full md:h-auto"
                      }
                      src={bestPriceIcon}
                    />
                  </div>
                </div>
                <div
                  className={
                    "flex-1 min-h-0 flex flex-row items-center flex-wrap"
                  }
                >
                  <div className={"w-full md:w-1/3 px-m md:px-0"}>
                    <Image
                      alt={"trip-image"}
                      className={
                        "rounded-md object-cover h-[14rem] md:h-[12.5rem]"
                      }
                      src={tripImage}
                    />
                  </div>

                  <div
                    className={
                      "pt-3xl md:pt-0 md:pl-xl lg:pl-4xl w-full md:w-2/3"
                    }
                  >
                    <TitleLegend>{t("home:comparator_legend")}</TitleLegend>
                    <Title2>{t("home:comparator_title")}</Title2>
                    <p>
                      <Trans>{t("home:comparator_content")}</Trans>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SizedSection>
        </div>
      </main>
    </AppLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? "en",
      ["trip", "validations", "home", "website"],
      nextI18NextConfig,
    )),
  },
});

export default Home;
