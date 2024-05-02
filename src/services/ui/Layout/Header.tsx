import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next-translate-routes/link";
import { BASE_LINK, BLOG_LINK } from "src/routes";
import { default as NextLink } from "next/link";
import logo from "../../../assets/img/logo.png";
import Button from "../Button";

const Header = (): JSX.Element => {
  const pathname = usePathname();

  return (
    <header
      className={
        "flex flex-row items-center content-between py-xs px-s md:px-2xl pb-2xl md:pb-2xl"
      }
    >
      <Link href={BASE_LINK}>
        <div className={"w-52 sm:w-80 ml-[-10px] mr-5 shrink-0"}>
          <Image alt={"logo"} loading={"eager"} src={logo} />
        </div>
      </Link>
      <nav
        className={
          "flex sm:flex-row items-center gap-xs sm:gap-m ml-auto shrink flex-col justify-end"
        }
      >
        {pathname.includes(BLOG_LINK) ? (
          <NextLink href={BASE_LINK}>
            <Button>Accéder a l'application</Button>
          </NextLink>
        ) : (
          <NextLink href={BLOG_LINK}>
            <Button className={"bg-green"}>Accéder au blog</Button>
          </NextLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
