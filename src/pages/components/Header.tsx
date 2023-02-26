import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/img/logo.png";
import logoBookingAffiliate from "../../assets/img/logo-booking-affiliate.png";
import logoKiwiAffiliate from "../../assets/img/logo-kiwi-affiliate.png";
import { BOOKING_LINK, KIWI_LINK } from "../../routes/external";
import { BASE_LINK } from "src/routes/public";

const HeaderPublic = (): JSX.Element => {
  return (
    <div className={"header"}>
      <Link href={BASE_LINK}>
        <Image alt={"logo"} className={"logo"} src={logo} />
      </Link>
      <nav className={"nav-right"}>
        <Link className={"nav-link"} href={BOOKING_LINK}>
          <Image
            alt={"logo-booking-affiliate"}
            className={"logo-affiliate"}
            src={logoBookingAffiliate}
          />
        </Link>
        <Link className={"btn-1"} href={KIWI_LINK}>
          <Image
            alt={"logo-kiwi-affiliate"}
            className={"logo"}
            src={logoKiwiAffiliate}
          />
        </Link>
      </nav>
    </div>
  );
};

export default HeaderPublic;
