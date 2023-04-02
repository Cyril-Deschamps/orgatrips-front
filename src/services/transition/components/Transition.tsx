import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Loader from "./Loader";
import { useTransition } from "../TransitionContext";

const Transition = (): JSX.Element => {
  const { shouldTransition, loadingText, stopTransition } = useTransition();
  const [minimumLoading, setMinimumLoading] = useState(false);

  // Start transition
  useEffect(() => {
    if (shouldTransition) {
      setMinimumLoading(true);
    }
  }, [shouldTransition]);

  // Minimum loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      if (minimumLoading) {
        setMinimumLoading(false);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [stopTransition, minimumLoading]);

  const fakePageTransitionOption: Variants = {
    initial: { y: "100%", opacity: 0.75 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0 },
    },
  };

  const loadingPageTransitionOption: Variants = {
    initial: { y: "100%", opacity: 0.75 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      x: "900%",
      transition: {
        duration: 4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {(shouldTransition || minimumLoading) && (
        <>
          <motion.div
            animate={"animate"}
            className={
              "top-0 left-0 fixed min-w-full z-50 flex justify-center items-center bg-appBgColor min-h-screen"
            }
            exit={"exit"}
            initial={"initial"}
            variants={fakePageTransitionOption}
          />
          <motion.div
            animate={"animate"}
            className={"top-0 left-0 fixed  min-h-screen min-w-full z-50"}
            exit={"exit"}
            initial={"initial"}
            variants={loadingPageTransitionOption}
          >
            <Loader loadingText={loadingText} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Transition;
