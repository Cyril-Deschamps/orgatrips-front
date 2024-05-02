import { twMerge } from "tailwind-merge";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import Title2 from "./Title2";
import TextWithIcon from "./TextWithIcon";
import Card from "./Card";
import { StaticImageData } from "next/image";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  icon: string | StaticImageData;
  textClassName?: string;
}

const InfoCard = ({
  textClassName,
  title,
  icon,
  className,
  children,
  ...props
}: Props): JSX.Element => {
  return (
    <Card
      className={twMerge("w-full bg-black opacity-85", className)}
      {...props}
    >
      <TextWithIcon className={"pb-xs"} iconClassName={"w-10"} iconSrc={icon}>
        <Title2 className={"text-white pb-0"}>{title}</Title2>
      </TextWithIcon>
      <p className={twMerge("text-white", textClassName)}>{children}</p>
    </Card>
  );
};

export default InfoCard;
