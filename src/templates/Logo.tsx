import { AppConfig } from "../utils/AppConfig";

type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  const size = props.xl ? "44" : "32";
  const fontStyle = props.xl
    ? "font-semibold text-3xl"
    : "font-semibold text-xl";

  return (
    <span className={`text-gray-900 inline-flex items-center ${fontStyle}`}>
      <svg
        className={"text-primary-500 stroke-current mr-1"}
        fill={"none"}
        height={size}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeWidth={"1.5"}
        viewBox={"0 0 24 24"}
        width={size}
        xmlns={"http://www.w3.org/2000/svg"}
      >
        <path d={"M0 0h24v24H0z"} stroke={"none"} />
        <rect height={"8"} rx={"1"} width={"6"} x={"3"} y={"12"} />
        <rect height={"12"} rx={"1"} width={"6"} x={"9"} y={"8"} />
        <rect height={"16"} rx={"1"} width={"6"} x={"15"} y={"4"} />
        <path d={"M4 20h14"} />
      </svg>

      {AppConfig.site_name}
    </span>
  );
};

export { Logo };
