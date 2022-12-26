import Link from "next/link";

import { Button } from "../button/Button";
import { CTABanner } from "../cta/CTABanner";
import { Section } from "../layout/Section";

const Banner = () => (
  <Section>
    <CTABanner
      button={
        <Link href={"/"}>
          <a>
            <Button disabled>Votre suivi de voyage</Button>
          </a>
        </Link>
      }
      subtitle={"Bientôt sur OrgaTrips"}
      title={"Une application web & mobile pour simplifier vos rêves !"}
    />
  </Section>
);

export { Banner };
