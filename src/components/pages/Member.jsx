import React, { useState, useCallback, useMemo } from 'react';
import { Icon } from '@iconify/react';
import CustomModal from '../common/CustomModal';
import EditMember from '../core/MemberPage/EditMember';
import DeleteMember from '../core/MemberPage/DeleteMember';
import { GET_MEMBERS } from '../../graphql/Members/membersQueries';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_MEMBER } from '../../graphql/Members/membersMutations';
import Spinner from '../common/Spinner';
import AddMember from '../core/MemberPage/AddMember';
const Member = () => {
  const { loading, error, data } = useQuery(GET_MEMBERS);
  const [removeMember] = useMutation(DELETE_MEMBER);

  // Log data, loading, and error to check
  // console.log("Loading:", loading);
  // console.log("Error:", error);
  console.log("Data:", data?.members);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(""); // Track 'edit' or 'delete'
  const [selectedMember, setSelectedMember] = useState(null); // Track the selected member

  const handleOpenModal = useCallback((action, member = null) => {
    setModalAction(action);
    setSelectedMember(member || null);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleDelete = useCallback((memberId) => {
    console.log(`Deleting member with id: ${memberId}`);
    removeMember({
      variables: { id: memberId },
      refetchQueries: [{ query: GET_MEMBERS }], // Refetch the GET_MEMBERS query
      awaitRefetchQueries: true, // Wait for the refetch to complete
    }).then(() => {
      console.log("Member deleted successfully");
      handleCloseModal();
    })
    .catch((err) => {
      console.error("Error deleting member:", err);
    });
    
    handleCloseModal();
  }, [removeMember, handleCloseModal]);

  if (loading) return <Spinner/>;
  if (error) return <div>Error loading members</div>;

  return (
    <div className="content">
      <span className="title">Members</span>
      <div className="col-12 d-flex justify-content-between py-2">
        <div className="col-6 d-flex align-items-end">List of members</div>
        <div className="col-6 text-end">
          <button type="button" className="btnPrimary" onClick={() => handleOpenModal('add')}>
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
            {
              data?.members.map((mb, i) => (
                <tr className="text-center" key={mb.id}>
                  <th className="text-center">{i + 1}</th>
                  <td>{mb.name}</td>
                  <td>{mb.address}</td>
                  <td>{mb.mobile}</td>
                  <td className="text-center d-flex gap-2">
                    <button type="button" className="btnPrimary" onClick={() => handleOpenModal('edit', mb)}>Edit</button>
                    <button type="button" className="btnSecondary" onClick={() => handleOpenModal('delete', mb)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <CustomModal open={isModalOpen} onClose={handleCloseModal}>
          {
            modalAction === 'add' ? (
              <AddMember />
            ) :
            modalAction === 'edit' ? (
              <EditMember member={selectedMember} onClose={handleCloseModal} />
            ) : (
              <DeleteMember member={selectedMember} onClose={handleCloseModal} onDelete={handleDelete} />
            )
          }
        </CustomModal>
      )}
    </div>
  )
}

export default React.memo(Member);
