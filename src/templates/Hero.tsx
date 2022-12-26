import Link from "next/link";

import { Background } from "../background/Background";
import { Button } from "../button/Button";
import { HeroOneButton } from "../hero/HeroOneButton";
import { Section } from "../layout/Section";
import { NavbarTwoColumns } from "../navigation/NavbarTwoColumns";
import { Logo } from "./Logo";

const Hero = () => (
  <Background color={"bg-gray-100"}>
    <Section yPadding={"py-6"}>
      <NavbarTwoColumns logo={<Logo xl />}>
        <li>
          <p>A bientôt :)</p>
        </li>
      </NavbarTwoColumns>
    </Section>

    <Section yPadding={"pt-20 pb-32"}>
      <HeroOneButton
        button={
          <Link href={"/"}>
            <a>
              <Button disabled xl>Générateur bientôt disponible</Button>
            </a>
          </Link>
        }
        description={
          "Trouver et générer votre prochain voyage en moin de 5 minutes !"
        }
        title={
          <>
            {"OrgaTrips\n"}
            <span className={"text-primary-500"}>Des propositions de voyage en fonction de votre budget et vos envies.</span>
          </>
        }
      />
    </Section>
  </Background>
);

export { Hero };
