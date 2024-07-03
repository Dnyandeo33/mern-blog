import { Button, Modal } from 'flowbite-react';
import PropTypes from 'prop-types';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const HandleModal = ({
  showModel,
  setShowModel,
  handleDeleteComment,
  handleTo,
  title,
}) => {
  return (
    <Modal show={showModel} onClose={() => setShowModel(false)} popup size="md">
      <Modal.Header />
      <Modal.Body>
        <div className="text center">
          <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
          <h3 className="mb-5 text-center text-lg  text-gray-500 dark:text-gray-400">
            {`Are you sure! you want to delete this ${title}?`}
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="failure"
              onClick={() => handleDeleteComment(handleTo)}
            >
              Yes, I am sure.
            </Button>
            <Button color="gray" onClick={() => setShowModel(false)}>
              No, Cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

HandleModal.propTypes = {
  showModel: PropTypes.bool.isRequired,
  setShowModel: PropTypes.func.isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
  handleTo: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default HandleModal;
