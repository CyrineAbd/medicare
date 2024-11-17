import React, { useContext, useState } from 'react';
import { authContext } from '../../context/AuthContext.jsx';
import AdminProfile from './AdminProfile.jsx';
import useGetProfile from '../../hooks/useFetchData.jsx'; 
import { BASE_URL } from '../../config.js';
import Loading from '../../components/Loader/Loading.jsx';
import Error from '../../components/Error/Error.jsx';
import ListPatients from './ListPatients.jsx';
import ListDoctors from './ListDoctors.jsx';
import Appointments from './Appointments.jsx'

const AdminAccount = () => {
  const { dispatch, token } = useContext(authContext);
  const [tab, setTab] = useState('doctors','patients','appointments', 'settings');

  const { data: userData, loading, error } = useGetProfile(`${BASE_URL}/admins/profile/me`, token);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
  };

  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}
        {!loading && !error && (
          <div className='grid md:grid-cols-3 gap-10'>
            <div className='pb-[50px] px-[30px] rounded-md'>
              <div className='flex items-center justify-center'>
                <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
                  <img src={userData.photo} alt='' className='w-full h-full rounded-full' />
                </figure>
              </div>
              <div className='text-center mt-4'>
                <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>
                  {userData.name}
                </h3>
                <p className='text-textColor text-[15px] leading-6 font-medium'>
                  {userData.email}
                </p>
                
              </div>
              <div className='mt-[50px] md:mt-[100px]'>

              <button
                  onClick={() => setTab('settings')}
                  className='w-full bg-[#181A1E]   p-3 text-[16px] leading-7 rounded-md text-white'
                >
                  Profile settings
                </button>

                <button
                  onClick={handleLogout}
                  className='w-full bg-[#181A1E] mt-4 p-3 text-[16px] leading-7 rounded-md text-white'
                >
                  Logout
                </button>
                
                <button className='w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>
                  Delete account
                </button>
              </div>
            </div>
            <div className='md:col-span-2 md:px-[30px]'>
              <button
                onClick={() => setTab('doctors')}
                className={`p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor
                  ${tab === 'doctors' ? 'bg-primaryColor text-white font-normal' : ''}`}
              >
                Doctors list
              </button>
              <button
                onClick={() => setTab('patients')}
                className={`py-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor
                  ${tab === 'patients' ? 'bg-primaryColor text-white font-normal' : ''}`}
              >
                Patients list
              </button>
              <button
                onClick={() => setTab('appointments')}
                className={`py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor
                  ${tab === 'appointments' ? 'bg-primaryColor text-white font-normal' : ''}`}
              >
                Appointments
              </button>
              <div>
                {tab === 'doctors' && <ListDoctors token={token} />}
                {tab === 'patients' && <ListPatients token={token} />}
                {tab === 'appointments' && <Appointments token={token} />}
                {tab === 'settings' && <AdminProfile token={token} />}

              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminAccount;
