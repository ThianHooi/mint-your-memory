import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment } from "react";
import { ChildrenT } from "../types/Children";

type Props = {
  showDialog: boolean;
  onClose: () => void;
  desktopSize?: "md" | "lg";
} & ChildrenT;

const SimpleDialog = ({
  children,
  showDialog,
  onClose,
  desktopSize,
}: Props) => {
  const styles = {
    header: "font-semibold mb-3",
    subheader: "text-sm text-grey",
    grid: "grid grid-cols-4 gap-1 w-full mt-4",
    dialogWrapper: "relative z-50",
    dialogTransitionWrapper: "absolute inset-0 overflow-hidden",
    dialogTransitionChildWrapper:
      "pointer-events-none flex min-h-full items-center justify-center p-4 text-center",
    dialogTransitionChild: "fixed inset-0 bg-black bg-opacity-25",
    dialogPanelWrapper: "fixed inset-0 overflow-y-auto flex items-center",
    dialogPanel: classNames("rounded-lg bg-white mx-auto px-4 py-2 w-10/12 ", {
      "md:w-1/2": !desktopSize || desktopSize === "lg",
      "md:w-1/3": desktopSize && desktopSize === "md",
    }),
  };

  return (
    <Transition appear show={showDialog} as={Fragment}>
      <HeadlessDialog
        as="div"
        className={styles.dialogWrapper}
        onClose={onClose}
      >
        <div className={styles.dialogTransitionWrapper}>
          <div className={styles.dialogTransitionChildWrapper}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className={styles.dialogTransitionChild} />
            </Transition.Child>
          </div>

          <div className={styles.dialogPanelWrapper}>
            <HeadlessDialog.Panel className={styles.dialogPanel}>
              {children}
            </HeadlessDialog.Panel>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
};

export default SimpleDialog;
