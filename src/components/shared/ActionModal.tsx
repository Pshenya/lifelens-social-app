import { Modal } from 'flowbite-react';
import { Button } from '../ui/button';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import Loader from './Loader';
import { useState } from 'react';

type ActionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
};

const ActionModal = ({ isOpen, onClose, onConfirmDelete }: ActionModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelayedClose = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      onConfirmDelete();
    }, 3000);
  }

  return (
    <>
      <Modal show={isOpen} size="xl" onClose={onClose} popup className='delete-modal'>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button className='delete-btn' onClick={onDelayedClose}>
                {isDeleting
                  ?
                    <>
                      <span className='flex mr-1'>
                        Deleting...
                      </span>
                      <Loader lottie={false}/>
                    </>
                  : 'Delete'}
              </Button>
              <Button className="cancel-btn" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ActionModal;

