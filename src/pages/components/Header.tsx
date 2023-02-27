import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/img/logo.png";
import logoBookingAffiliate from "../../assets/img/logo-booking-affiliate.png";
import logoKiwiAffiliate from "../../assets/img/logo-kiwi-affiliate.png";
import { BOOKING_LINK, KIWI_LINK } from "../../routes/external";
import { BASE_LINK } from "src/routes/public";

const Header = (): JSX.Element => {
  return (
    <div
      className={
        "flex flex-row items-center content-between py-xs px-s md:px-2xl pb-2xl md:pb-3xl"
      }
    >
      <Link
        className={"w-52 sm:w-80 ml-[-10px] mr-5 shrink-0"}
        href={BASE_LINK}
      >
        <Image alt={"logo"} src={logo} />
      </Link>
      <nav
        className={
          "flex flex-row items-center gap-xs sm:gap-s ml-auto shrink flex-wrap justify-end"
        }
      >
        <Link className={"w-14 sm:w-24"} href={BOOKING_LINK}>
          <Image alt={"logo-booking-affiliate"} src={logoBookingAffiliate} />
        </Link>
        <Link className={"w-14 sm:w-24"} href={KIWI_LINK}>
          <Image alt={"logo-kiwi-affiliate"} src={logoKiwiAffiliate} />
        </Link>
      </nav>
    </div>
  );
};

export default Header;
