import { twMerge } from "tailwind-merge";
import Image, { StaticImageData } from "next/image";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  iconSrc: string | StaticImageData;
  children: React.ReactNode;
  iconClassName?: string;
  textClassName?: string;
  alt?: string;
}

const TextWithIcon = ({
  iconSrc,
  iconClassName,
  alt = "icon",
  children,
  className,
  ...props
}: Props): JSX.Element => {
  return (
    <div
      className={twMerge("flex flex-row items-center", className)}
      {...props}
    >
      <Image
        alt={alt}
        className={twMerge("w-s sm:w-l h-s sm:h-l", iconClassName)}
        src={iconSrc}
      />
      <span className={"text-gray-500 font-light pl-2"}>{children}</span>
    </div>
  );
};

export default TextWithIcon;
