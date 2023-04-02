import Image from "next/image";
import Link from "next-translate-routes/link";
import { BASE_LINK } from "src/routes";

import logo from "../../../assets/img/logo.png";
import logoKiwiAffiliate from "../../../assets/img/logo-kiwi-affiliate.png";
import logoBookingAffiliate from "../../../assets/img/logo-booking-affiliate.svg";

const Header = (): JSX.Element => {
  return (
    <header
      className={
        "flex flex-row items-center content-between py-xs px-s md:px-2xl pb-2xl md:pb-3xl"
      }
    >
      <Link href={BASE_LINK}>
        <div className={"w-52 sm:w-80 ml-[-10px] mr-5 shrink-0"}>
          <Image alt={"logo"} src={logo} />
        </div>
      </Link>
      <nav
        className={
          "flex sm:flex-row items-center gap-xs sm:gap-m ml-auto shrink flex-col justify-end"
        }
      >
        <div className={"w-14 sm:w-24"}>
          <Image alt={"logo-booking-affiliate"} src={logoBookingAffiliate} />
        </div>
        <div className={"w-14 sm:w-24"}>
          <Image alt={"logo-kiwi-affiliate"} src={logoKiwiAffiliate} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
