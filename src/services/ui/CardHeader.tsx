import { twMerge } from "tailwind-merge";
import Image from "next/image";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import goBackIcon from "../../assets/img/icons/icon-chevron-left.svg";
import { useRouter } from "next/router";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
  goBack?: boolean;
}

const CardHeader = ({
  className,
  children,
  goBack = false,
  ...props
}: Props): JSX.Element => {
  const router = useRouter();
  return (
    <div {...props} className={twMerge("flex flex-row gap-s pb-s", className)}>
      {goBack && (
        <button onClick={() => router.back()}>
          <Image alt={"go back"} src={goBackIcon} />
        </button>
      )}
      {children}
    </div>
  );
};

export default CardHeader;
