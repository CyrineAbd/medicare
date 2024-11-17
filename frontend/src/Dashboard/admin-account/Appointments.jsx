import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../config';
import useFetchData from '../../hooks/useFetchData';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; // Import des icônes

const ListAppointments = ({ token }) => {
  const { data, loading, error } = useFetchData(`${BASE_URL}/appointments`, token);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setAppointments(data);
    } else {
      setAppointments([]);
    }
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <Error errMessage={error} />;

  return (
    <div className='overflow-x-auto'>
      <div className='flex justify-end mb-4'>
        <button className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-200 text-sm flex items-center'>
          <FaPlus className='mr-1' /> Add Appointment
        </button>
      </div>
      <table className='min-w-[600px] max-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
        <thead className='bg-gray-200'>
          <tr>
            <th className='py-3 px-4 text-left text-sm font-semibold'>Date</th>
            <th className='py-3 px-4 text-left text-sm font-semibold'>Time</th>
            <th className='py-3 px-4 text-left text-sm font-semibold'>Patient</th>
            <th className='py-3 px-4 text-left text-sm font-semibold'>Doctor</th>
            <th className='py-3 px-4 text-center text-sm font-semibold'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id} className='border-t border-gray-200'>
              <td className='py-4 px-4 text-sm'>{appointment.date}</td>
              <td className='py-4 px-4 text-sm'>{appointment.time}</td>
              <td className='py-4 px-4 text-sm'>{appointment.patient}</td>
              <td className='py-4 px-4 text-sm'>{appointment.doctor}</td>
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

export default ListAppointments;
