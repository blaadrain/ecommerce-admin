"use client";

import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";

type AlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
};

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-2">
        <Button disabled={isLoading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isLoading} variant="destructive" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
