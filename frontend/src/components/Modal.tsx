import { useEffect, useState } from "react";
import InputField from "./InputField";
import Button from "./Button";

interface ModalProps {
  variant: "AddSub" | "EditSub" | "Confirm";
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: { description: string; price: string }) => void;
  confirmAction?: () => void;

  company?: string;
  image?: string;

  defaultValue?: {
    description?: string;
    price?: string;
  };

  confirmMessage?: string;
}

const Modal: React.FC<ModalProps> = ({
  variant,
  open,
  onClose,
  onSubmit,
  confirmAction,
  company,
  image,
  defaultValue,
  confirmMessage,
}) => {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (!open) {
      setDescription("");
      setPrice("");
    } else if (variant === "EditSub") {
      setDescription(defaultValue?.description || "");
      setPrice(defaultValue?.price || "");
    }
  }, [open, variant, defaultValue]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
      <div className="flex flex-col items-start gap-6 p-6 rounded-xl w-full max-w-92 bg-neutral-50 shadow-[0_0_20px_0_rgba(0,0,0,0.25)] ">
        {variant === "AddSub" && (
          <>
            <h2 className="text-2xl font-semibold">Add subscription</h2>

            <div className="flex gap-3 items-center">
              {image && <img src={image} alt={company} className="size-12" />}

              {company && <p className="text-xl font-medium">{company}</p>}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (onSubmit) {
                  onSubmit({ description, price });
                }
                onClose();
              }}
              className="flex flex-col w-full gap-6"
            >
              <InputField
                value={description}
                title="Description"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description..."
              />

              <InputField
                value={price}
                title="Price (SEK)"
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price..."
              />

              <div className="flex items-start gap-4">
                <Button type="submit"> Add new </Button>
                <Button type="button" variant="dark" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </>
        )}

        {variant === "EditSub" && (
          <>
            <h2 className="text-2xl font-semibold">Edit subscription</h2>

            <div className="flex gap-3 items-center">
              {image && <img src={image} alt={company} className="size-12" />}

              {company && <p className="text-xl font-medium">{company}</p>}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (onSubmit) {
                  onSubmit({ description, price });
                }
                onClose();
              }}
              className="flex flex-col w-full gap-6"
            >
              <InputField
                value={description}
                title="Description"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description..."
              />

              <InputField
                value={price}
                title="Price (SEK)"
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price..."
              />

              <div className="flex items-start gap-4">
                <Button type="submit"> Save changes </Button>
                <Button type="button" variant="dark" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </>
        )}

        {variant === "Confirm" && (
          <>
            <h2 className="text-2xl font-semibold">Wait!</h2>
            <p className="font-medium">{confirmMessage}</p>

            <div className="flex items-start gap-4">
              <Button
                type="button"
                onClick={() => {
                  if (confirmAction) {
                    confirmAction();
                  } else {
                    onClose();
                  }
                }}
              >
                Confirm
              </Button>
              <Button type="button" variant="dark" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
