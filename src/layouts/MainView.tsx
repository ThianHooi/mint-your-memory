import classNames from "classnames";
import React from "react";
import { ChildrenT } from "../types/Children";

type Props = {
  className?: string | undefined | null;
} & ChildrenT;

const MainView: React.FC<Props> = ({ className = "", children }: Props) => {
  const styles = {
    wrapper:
      "z-0 mx-auto md:mt-[var(--header-height)] flex md:space-x-6 lg:max-w-5xl md:px-8",
    main: "flex min-h-screen flex-colx` bg-gradient-to-b from-[#2e026d] to-[#15162c]",
  };

  return <main className={classNames(styles.main, className)}>{children}</main>;
};

export default MainView;
