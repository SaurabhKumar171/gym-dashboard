import React from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import close from '../../assets/close-icon.svg';

const CustomModal = ({ open, onClose, children }) => (
  <Modal  
    classNames={{
      modal: 'customModal',
    }}
    open={open} 
    onClose={onClose} 
    center
    // closeIcon={closeIcon}
    closeOnOverlayClick={true}
  >
    {children}
  </Modal>
);

export default CustomModal;
