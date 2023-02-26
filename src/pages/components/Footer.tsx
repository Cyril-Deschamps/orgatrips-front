/* images and icons */
import logo from "../../assets/img/logo.png";
import Image from "next/image";
import Link from "next/link";

const Footer = (): JSX.Element => {
  return (
    <div className={"footer"}>
      <div>
        <Image alt={"logo Autolity"} className={"logo"} src={logo} />
      </div>
      <div className={"columns"}>
        <div className={"col-brand"}>
          <p className={"body-s"}>
            Le premier réseau européen de professionnels de l’automobile
            premium. Avec l’application Autolity, les membres du réseau peuvent
            acheter ou céder des véhicules à marchand.
          </p>
        </div>
        <nav>
          <Link href={""}>La solution</Link>
          <Link href={""}>Qui sommes-nous</Link>
          <Link href={""}>Contact</Link>
        </nav>
        <div className={"col-lang"}>Français</div>
      </div>
    </div>
  );
};

export default Footer;
