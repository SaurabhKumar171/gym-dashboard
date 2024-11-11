import React from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const CustomModal = ({ open, onClose, children }) => (
  <Modal open={open} onClose={onClose} center>
    {children}
  </Modal>
);

export default CustomModal;
