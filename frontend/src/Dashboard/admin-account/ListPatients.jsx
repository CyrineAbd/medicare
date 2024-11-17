import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../config';
import useFetchData from '../../hooks/useFetchData';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; // Import des icônes

const ListPatients = ({ token }) => {
  const { data, loading, error } = useFetchData(`${BASE_URL}/users`, token);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setPatients(data);
    } else {
      setPatients([]);
    }
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <Error errMessage={error} />;

  return (
    <div className='overflow-x-auto'>
      <div className='flex justify-end mb-4'>
        <button className='bg-blue-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-200 text-sm flex items-center'>
          <FaPlus className='mr-1' /> Add Patient
        </button>
      </div>
      <table className='min-w-[600px] max-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
        <thead className='bg-gray-200'>
          <tr>
            <th className='py-3 px-4 text-left text-sm font-semibold'>Name</th>
            <th className='py-3 px-4 text-left text-sm font-semibold'>Email</th>
            <th className='py-3 px-4 text-left text-sm font-semibold'>Phone</th>
            <th className='py-3 px-4 text-center text-sm font-semibold'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} className='border-t border-gray-200'>
              <td className='py-4 px-4 text-sm'>{patient.name}</td>
              <td className='py-4 px-4 text-sm'>{patient.email}</td>
              <td className='py-4 px-4 text-sm'>{patient.phone}</td>
              <td className='py-4 px-4 flex justify-center items-center space-x-2'>
                <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200 text-sm flex items-center'>
                  <FaEdit className='mr-1' /> Edit
                </button>
                <button className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-200 text-sm flex items-center'>
                  <FaTrash className='mr-1' /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListPatients;
