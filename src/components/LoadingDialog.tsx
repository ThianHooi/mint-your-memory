import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import classNames from "classnames";
import LoadingSpinnerIcon from "./icon/LoadingSpinnerIcon";

type Props = {
  showDialog: boolean;
  onClose: () => void;
  desktopSize?: "md" | "lg";
};

const LoadingDialog = ({ showDialog, onClose, desktopSize }: Props) => {
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
      <Dialog as="div" className={styles.dialogWrapper} onClose={onClose}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

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
            <Dialog.Panel className={styles.dialogPanel}>
              <div
                className={classNames(
                  "flex flex-col items-center justify-center space-y-8 px-4 pt-4 pb-4 text-center text-[16px] font-medium"
                )}
              >
                <LoadingSpinnerIcon />
                <p>Loading...</p>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LoadingDialog;
