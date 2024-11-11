import React, { useState, useCallback, useMemo } from 'react';
import { dataMembers } from './data/DataAPI';
import { Icon } from '@iconify/react';
import CustomModal from '../common/CustomModal';
import EditMember from '../core/MemberPage/EditMember';
import DeleteMember from '../core/MemberPage/DeleteMember';

const Member = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(""); // Track 'edit' or 'delete'
  const [selectedMember, setSelectedMember] = useState(null); // Track the selected member

  const handleOpenModal = useCallback((action, member) => {
    setModalAction(action);
    setSelectedMember(member);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleDelete = useCallback((memberId) => {
    console.log(`Deleting member with id: ${memberId}`);
    handleCloseModal();
    // Here you could update your data source (e.g., remove member from state or update database)
  }, [handleCloseModal]);

  // Memoize table rows to avoid unnecessary re-renders
  const memberRows = useMemo(() => (
    dataMembers.map((mb, i) => (
      <tr key={mb.id}>
        <th className="text-center">{i + 1}</th>
        <td>{mb.name}</td>
        <td>{mb.address}</td>
        <td>{mb.phone}</td>
        <td className="text-center d-flex gap-2">
          <button type="button" className="btnPrimary" onClick={() => handleOpenModal('edit', mb)}>Edit</button>
          <button type="button" className="btnSecondary" onClick={() => handleOpenModal('delete', mb)}>Delete</button>
        </td>
      </tr>
    ))
  ), [handleOpenModal]);

  return (
    <div className="content">
      <span className="title">Members</span>
      <div className="col-12 d-flex justify-content-between py-2">
        <div className="col-6 d-flex align-items-end">List of members</div>
        <div className="col-6 text-end">
          <button type="button" className="btnPrimary">
            <span className="d-none d-sm-block">Add Member</span>
            <Icon className="d-block d-sm-none" icon="material-symbols:add" />
          </button>
        </div>
      </div>
      <div className="table-responsive text-nowrap">
        <table className="table table-bordered align-middle">
          <thead>
            <tr className="text-center">
              <th className="col">No</th>
              <th className="col-4">Name</th>
              <th className="col-3">Address</th>
              <th className="col-3">Phone</th>
              <th className="col">Action</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {memberRows}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <CustomModal open={isModalOpen} onClose={handleCloseModal}>
          {modalAction === 'edit' ? (
            <EditMember member={selectedMember} onClose={handleCloseModal} />
          ) : (
            <DeleteMember member={selectedMember} onClose={handleCloseModal} onDelete={handleDelete} />
          )}
        </CustomModal>
      )}
    </div>
  )
}

export default React.memo(Member);
