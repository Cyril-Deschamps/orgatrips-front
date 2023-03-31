import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

import plane from "../../../assets/img/plane.svg";
import cloud1 from "../../../assets/img/cloud1.svg";
import cloud2 from "../../../assets/img/cloud2.svg";
import cloud3 from "../../../assets/img/cloud3.svg";
import cloud4 from "../../../assets/img/cloud4.svg";

const Loader = ({ loadingText }: { loadingText: string }): JSX.Element => {
  return (
    <div
      className={
        "flex justify-center items-center bg-white min-h-screen overflow-visible"
      }
    >
      <div className={"absolute left-[-100vh] bg-white overflow-hidden"}>
        <Image
          alt={"plane-animation"}
          className={
            "relative rotate-90 h-[105vh] mt-[-2.5vh] left-[-3vh] w-auto max-w-none"
          }
          src={plane}
        />
      </div>
      <motion.div
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.75, delay: 0.5, ease: "easeIn" },
        }}
        className={"absolute w-2/12 max-w-[10rem] top-[10%] left-[15%]"}
        initial={{ y: 50, opacity: 0 }}
      >
        <Image alt={"cloud"} className={"w-full"} src={cloud1} />
      </motion.div>
      <motion.div
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.75, delay: 0.5, ease: "easeIn" },
        }}
        className={"absolute w-2/12 max-w-[10rem] top-[5%] left-[75%]"}
        initial={{ y: 50, opacity: 0 }}
      >
        <Image alt={"cloud"} className={"w-full"} src={cloud2} />
      </motion.div>
      <motion.div
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.75, delay: 0.4, ease: "easeIn" },
        }}
        className={"absolute w-2/12 max-w-[10rem] top-[20%] left-[50%]"}
        initial={{ y: 50, opacity: 0 }}
      >
        <Image alt={"cloud"} className={"w-full"} src={cloud3} />
      </motion.div>
      <motion.div
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.75, delay: 0.25, ease: "easeIn" },
        }}
        className={"w-3/4"}
        initial={{ y: 50, opacity: 0 }}
      >
        <p
          className={
            "text-appBgColor text-3xl sm:text-[2.5vw] text-center font-VarsityTeam"
          }
        >
          {loadingText}
        </p>
      </motion.div>
      <motion.div
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.75, delay: 0.35, ease: "easeIn" },
        }}
        className={"absolute w-2/12 max-w-[10rem] top-[70%] left-[5%]"}
        initial={{ y: 50, opacity: 0 }}
      >
        <Image alt={"cloud"} className={"w-full"} src={cloud4} />
      </motion.div>
      <motion.div
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.75, delay: 0.6, ease: "easeIn" },
        }}
        className={"absolute w-2/12 max-w-[10rem] top-[65%] left-[35%]"}
        initial={{ y: 50, opacity: 0 }}
      >
        <Image alt={"cloud"} className={"w-full"} src={cloud2} />
      </motion.div>
      <motion.div
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.75, delay: 0.45, ease: "easeIn" },
        }}
        className={"absolute w-2/12 max-w-[10rem] top-[80%] left-[50%]"}
        initial={{ y: 50, opacity: 0 }}
      >
        <Image alt={"cloud"} className={"w-full"} src={cloud2} />
      </motion.div>
      <motion.div
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.75, delay: 0.6, ease: "easeIn" },
        }}
        className={"absolute w-2/12 max-w-[10rem] top-[75%] left-[75%]"}
        initial={{ y: 50, opacity: 0 }}
      >
        <Image alt={"cloud"} className={"w-full"} src={cloud2} />
      </motion.div>
    </div>
  );
};

export default Loader;
