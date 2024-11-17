import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../config';
import useFetchData from '../../hooks/useFetchData';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';

const ListDoctors = ({ token }) => {
  const { data, loading, error } = useFetchData(`${BASE_URL}/doctors`, token);
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);

  useEffect(() => {
    if (Array.isArray(data)) {
      setDoctors(data);
    } else {
      setDoctors([]);
    }
  }, [data]);

  const openModal = (doctor = null) => {
    setCurrentDoctor(doctor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentDoctor(null);
    setIsModalOpen(false);
  };

  const handleAddEditDoctor = async (doctor) => {
    try {
      if (doctor.id) {
        // Update doctor
        const response = await fetch(`${BASE_URL}/doctors/${doctor.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(doctor)
        });
        if (response.ok) {
          setDoctors(doctors.map(d => d.id === doctor.id ? doctor : d));
        }
      } else {
        // Add doctor
        const response = await fetch(`${BASE_URL}/doctors`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(doctor)
        });
        if (response.ok) {
          const newDoctor = await response.json();
          setDoctors([...doctors, newDoctor]); // Ajoutez le nouveau médecin à la liste existante
        }
      }
    } catch (error) {
      console.error('Error adding/editing doctor:', error);
    }
    closeModal();
  };

  const handleDeleteDoctor = async (doctorId) => {
    try {
      const response = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error errMessage={error} />;

  return (
    <div className='overflow-x-auto'>
      <div className='flex justify-end mb-4'>
        <button
          className='bg-blue-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-200 text-sm flex items-center'
          onClick={() => openModal()}
        >
          <FaPlus className='mr-1 ' /> Add Doctor
        </button>
      </div>
      <table className='min-w-[600px] max-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
        <thead className='bg-gray-200'>
          <tr>
            <th className='py-3 px-4 text-left text-sm font-semibold'>Name</th>
            <th className='py-3 px-4 text-left text-sm font-semibold'>Email</th>
            <th className='py-3 px-4 text-left text-sm font-semibold'>Specialty</th>
            <th className='py-3 px-4 text-left text-sm font-semibold'>Phone</th>
            <th className='py-3 px-4 text-center text-sm font-semibold'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id} className='border-t border-gray-200'>
              <td className='py-4 px-4 text-sm'>{doctor.name}</td>
              <td className='py-4 px-4 text-sm'>{doctor.email}</td>
              <td className='py-4 px-4 text-sm'>{doctor.specialty}</td>
              <td className='py-4 px-4 text-sm'>{doctor.phone}</td>
              <td className='py-4 px-4 flex justify-center items-center space-x-2'>
                <button
                  className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200 text-sm flex items-center'
                  onClick={() => openModal(doctor)}
                >
                  <FaEdit className='mr-1' /> Edit
                </button>
                <button
                  className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-200 text-sm flex items-center'
                  onClick={() => handleDeleteDoctor(doctor.id)}
                >
                  <FaTrash className='mr-1' /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <DoctorForm doctor={currentDoctor} onSave={handleAddEditDoctor} onCancel={closeModal} />
      </Modal>
    </div>
  );
};

const DoctorForm = ({ doctor, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: doctor ? doctor.name : '',
    email: doctor ? doctor.email : '',
    specialty: doctor ? doctor.specialty : '',
    phone: doctor ? doctor.phone : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...doctor, ...formData });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label className='block text-sm font-medium'>Name</label>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          className='w-full border border-gray-300 p-2 rounded-md'
        />
      </div>
      <div>
        <label className='block text-sm font-medium'>Email</label>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          className='w-full border border-gray-300 p-2 rounded-md'
        />
      </div>
      <div>
        <label className='block text-sm font-medium'>Specialty</label>
        <select
          name='specialty'
          value={formData.specialty}
          onChange={handleChange}
          className='w-full border border-gray-300 p-2 rounded-md'
        >
          <option value=''>Select</option>
          <option value='surgeon'>Surgeon</option>
          <option value='neurologist'>Neurologist</option>
          <option value='dermatologist'>Dermatologist</option>
          <option value='cardiologist'>Cardiologist</option>
          <option value='gastroenterologist'>Gastroenterologist</option>
          <option value='endocrinologist'>Endocrinologist</option>
          <option value='nephrologist'>Nephrologist</option>
          <option value='pediatric'>Pediatric</option>
          <option value='gynecologic'>Gynecologic</option>
          <option value='psychiatrist'>Psychiatrist</option>
          <option value='anesthesiologist'>Anesthesiologist</option>
          <option value='radiologist'>Radiologist</option>
          <option value='pathologist'>Pathologist</option>
          <option value='ophthalmologist'>Ophthalmologist</option>
        </select>
      </div>
      <div>
        <label className='block text-sm font-medium'>Phone</label>
        <input
          type='text'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          className='w-full border border-gray-300 p-2 rounded-md'
        />
      </div>
      <div className='flex justify-end space-x-2'>
        <button
          type='button'
          onClick={onCancel}
          className='bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition duration-200 text-sm'
        >
          Cancel
        </button>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200 text-sm'
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ListDoctors;
