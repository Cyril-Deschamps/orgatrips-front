import React from "react";
import TripSearchForm from "../services/trips/components/TripSearchForm";
import dashboardIllustration from "../assets/img/dashboard-illustration.svg";
import drawnArrow from "../assets/img/drawn-arrow.svg";
import Image from "next/image";
import SizedSection from "../services/ui/Section";

const Home = (): JSX.Element => {
  return (
    <main className={"flex flex-col items-center"}>
      <SizedSection
        className={
          "flex flex-row justify-between z-10 min-h-[23rem] items-start md:min-h-[26rem] xl:items-start md:justify-center lg:justify-between"
        }
      >
        <div className={"ml-xs sm:ml-xl md:ml-0 lg:ml-3xl relative"}>
          <h1
            className={
              "md:w-[30rem] font-VarsityTeam text-xl sm:text-2xl md:text-4xl leading-8 md:leading-10 tracking-wide md:text-center lg:text-start"
            }
          >
            <span className={"text-green"}>Trouvez</span> les{" "}
            <span className={"text-green"}>desinations</span>
          </h1>
          <h1
            className={
              "w-[15rem] md:w-[22rem] font-VarsityTeam text-base sm:text-xl md:text-2xl leading-6 md:leading-8 tracking-wide md:text-center lg:text-start md:mx-auto lg:mx-0"
            }
          >
            qui correspondent à <span className={"text-green"}>vos envies</span>{" "}
            et à <span className={"text-green"}>votre budget</span> en{" "}
            <span className={"text-green"}> quelques secondes</span> !
          </h1>
          <Image
            alt={"drawn-arrow"}
            className={
              "absolute right-[-3rem] top-8 w-28 md:right-[-8rem] md:w-auto"
            }
            src={drawnArrow}
          />
        </div>
        <Image
          alt={"trip-illustration"}
          className={"w-2/6 pl-10 xl:pl-0 xl:w-[32rem] hidden lg:block"}
          src={dashboardIllustration}
        />
      </SizedSection>
      <div
        className={
          "bg-white w-full mt-[-54px] flex flex-col items-center pb-12"
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
              "w-full xl:w-[32rem] text-center font-regular text-s leading-5 lg:pt-32 max-w-xl"
            }
          >
            Notre solution propulsée par l’
            <strong>intelligence artificielle</strong> vous propose des
            destinations en fonction de vos envies et de votre budget. Elle vous
            suggérera des{" "}
            <strong>réservations de transports et de logements</strong>, par
            Booking et Kiwi, qui <strong>correspondent au budget</strong>{" "}
            indiqué.
          </p>
        </SizedSection>
      </div>
    </main>
  );
};

export default Home;
