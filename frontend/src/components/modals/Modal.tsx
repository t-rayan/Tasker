import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";
import Spinner from "../Spinner";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="justify-center
       items-center 
       flex 
       overflow-x-hidden 
       overflow-y-auto 
       fixed 
       inset-0 
       z-50 
       outline-none 
       focus:outline-none 
       bg-neutral-800/70
       dark:bg-neutral-800/50
        p-12
       "
      >
        <div
          className="
              relative
              w-full
              md:w-4/6
              lg:w-3/6
              xl:w-2/5
              my-6
              mx-auto
              h-auto
              lg:h-auto
              md:h-auto
              "
        >
          {/* content */}
          <div
            className={`
                translate
                duration-300
                h-full
                ${showModal ? "translate-y-0" : "translate-y-full"}
                ${showModal ? "opacity-100" : "opacity-0"}

`}
          >
            <div
              className="translate
              h-full
              lg:h-auto
              md:h-auto
              border-0
              rounded-xl
              shadow-lg
              relative
              flex
              flex-col
              w-full
              bg-white
              dark:bg-darkBg
              outline-none
              focus:outline-none
              pb-5
            "
            >
              {/* header */}
              <div className="flex items-center py-4 px-6 rounded-t justify-start relative border-b-[1px] dark:border-darkCardBg">
                <button
                  onClick={handleClose}
                  className="p-1 bg-neutral-200 dark:bg-darkCardBg rounded-md hover:opacity-70 transition absolute right-3 dark:text-neutral-600"
                >
                  <IoMdClose size={14} />
                </button>
                <div className="text-lg font-semibold dark:text-neutral-400">
                  {title}
                </div>
              </div>

              {/* body */}
              <div className="relative p-6  flex-auto">{body}</div>

              {/* footer */}
              <div className="flex flex-col gap-2 px-6 py-3">
                <div className="flex flex-row justify-end items-center gap-4 w-full">
                  <Button onClick={onClose} disabled={disabled} secondary sm>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} disabled={disabled} sm>
                    {disabled ? <Spinner /> : actionLabel}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
