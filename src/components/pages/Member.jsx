import React, { useState, useCallback, useEffect } from 'react';
import { Icon } from '@iconify/react';
import CustomModal from '../common/CustomModal';
import EditMember from '../core/MemberPage/EditMember';
import DeleteMember from '../core/MemberPage/DeleteMember';
import Spinner from '../common/Spinner';
import AddMember from '../core/MemberPage/AddMember';
import { deleteUser, getUserDetails } from '../../services/operations/userApis';

const Member = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(""); // Track 'edit' or 'delete'
  const [selectedMember, setSelectedMember] = useState(null); // Track the selected member
  const [members, setMembers] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); // Trigger for fetching data

  const handleOpenModal = useCallback((action, member = null) => {
    setModalAction(action);
    setSelectedMember(member || null);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleDelete = useCallback(async (user_id) => {
    console.log(`Deleting member with id: ${user_id}`);

    try {
      await deleteUser(user_id);
      setRefreshKey((prev) => prev + 1); // Trigger refetch after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    handleCloseModal();
  }, [handleCloseModal]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const resp = await getUserDetails({
          page: 1,
          limit: 10,
        });
        setMembers(resp?.data || []);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, [refreshKey]); // Refetch data when refreshKey changes

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
              <th className="col-3">Phone</th>
              <th className="col-3">Status</th>
              <th className="col">Action</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {members.map((mb, i) => (
              <tr className="text-center" key={mb.user_id}>
                <th className="text-center">{i + 1}</th>
                <td>{`${mb.first_name} ${mb.last_name || ""}`}</td>
                <td>{mb.phone_number}</td>
                <td className={`${mb.status === "active" ? "text-green-500": "text-red-500"} capitalize`}>
                  {mb.status}
                </td>
                <td className="text-center d-flex gap-2">
                  <button
                    type="button"
                    className="btnPrimary"
                    onClick={() => handleOpenModal('edit', mb)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btnSecondary"
                    onClick={() => handleOpenModal('delete', mb)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <CustomModal open={isModalOpen} onClose={handleCloseModal}>
          {modalAction === 'add' ? (
            <AddMember 
              onClose={handleCloseModal} 
            />
          ) : modalAction === 'edit' ? (
            <EditMember 
              member={selectedMember} 
              onClose={handleCloseModal} 
            />
          ) : (
            <DeleteMember
              member={selectedMember}
              onClose={handleCloseModal}
              onDelete={handleDelete}
            />
          )}
        </CustomModal>
      )}
    </div>
  );
};

export default React.memo(Member);
