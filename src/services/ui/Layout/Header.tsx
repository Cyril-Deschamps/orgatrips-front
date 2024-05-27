import Image from "next/image";
import { usePathname } from "next/navigation";
import { ACCOUNT_LINK, BASE_LINK, BLOG_LINK, LOGIN_LINK } from "src/routes";
import logo from "../../../assets/img/logo.png";
import Button from "../Button";
import { useAuthContext } from "../../auth/apiProvider";
import Link from "next/link";
import { ADMIN_ARTICLES_LINK } from "../../../routes/blog";
import { useTranslation } from "react-i18next";

const Header = (): JSX.Element => {
  const pathname = usePathname();
  const { user } = useAuthContext();
  const { t } = useTranslation("website");

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
          "menu-item flex flex-col items-center gap-s ml-auto shrink justify-end"
        }
      >
        {user ? (
          <Link href={ACCOUNT_LINK}>
            <Button className={"bg-green px-s py-xxs text-s text-white"}>
              {t("header.account")}
            </Button>
          </Link>
        ) : (
          <Link href={LOGIN_LINK}>
            <Button className={"bg-green px-s py-xxs text-s text-white"}>
              {t("header.login")}
            </Button>
          </Link>
        )}
        {pathname.includes(BLOG_LINK) ? (
          <Link href={BASE_LINK}>
            <Button className={"bg-green px-s py-xxs text-s text-white"}>
              {t("header.home")}
            </Button>
          </Link>
        ) : (
          <Link href={BLOG_LINK}>
            <Button className={"bg-green px-s py-xxs text-s text-white"}>
              {t("header.blog")}
            </Button>
          </Link>
        )}
        {user && user.admin && (
          <Link href={ADMIN_ARTICLES_LINK}>
            <Button className={"bg-green px-s py-xxs text-s text-white"}>
              {t("header.admin")}
            </Button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
