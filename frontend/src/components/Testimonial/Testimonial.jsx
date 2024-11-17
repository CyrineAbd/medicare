import React from 'react'
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import patientAvatar1 from'../../assets/images/1.png'
import patientAvatar2 from'../../assets/images/2.png'
import patientAvatar3 from'../../assets/images/3.png'
import patientAvatar4 from'../../assets/images/4.png'

import { HiStar } from 'react-icons/hi';

const Testimonial = () => {
  return (
    <div className='mt-[30px] lg:mt-[55px]'>
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        <SwiperSlide>
          <div className='py-[30px] px-5 rounded-3'>
            <div className='flex items-center gap-[13px]'>
              <img src={patientAvatar1} alt="Patient Avatar" />
              <div>
                <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>
                Brett Caroll
                </h4>
                <div className='flex  items-center gap-[2px]' >
                    <HiStar  className='text-yellowColor w-[18px] h-5'/>
                    <HiStar  className='text-yellowColor w-[18px] h-5'/>
                    <HiStar  className='text-yellowColor w-[18px] h-5'/>
                    <HiStar  className='text-yellowColor w-[18px] h-5'/>
                    <HiStar  className='text-yellowColor w-[18px] h-5'/>
                </div>
              </div>
            </div>
            <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>I have taken medical services .They treat so well and 
                they are providing the best medical services
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='py-[30px] px-5 rounded-3'>
            <div className='flex items-center gap-[13px]'>
              <img src={patientAvatar2} alt="Patient Avatar" />
              <div>
                <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>
                Pamella
                </h4>
                <div className='flex  items-center gap-[2px]' >
                    <HiStar  className='text-yellowColor w-[18px] h-5'/>
                    <HiStar  className='text-yellowColor w-[18px] h-5'/>
                    <HiStar  className='text-yellowColor w-[18px] h-5'/>
                    <HiStar  className='text-yellowColor w-[18px] h-5'/>
                    <HiStar  className='text-yellowColor w-[18px] h-5'/>
                </div>
              </div>
            </div>
            <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>I recently received medical treatment,
             and I couldn't be more pleased. The care provided was exceptional, and the staff went above and beyond to ensure my comfort and well-being. 
              Highly recommended!</p>
       
       </div> 
       </SwiperSlide>
        
        <SwiperSlide>
          <div className='py-[30px] px-5 rounded-3'>
            <div className='flex items-center gap-[13px]'>
              <img src={patientAvatar3} alt="Patient Avatar" />
              <div>
                <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>
                 Farah
                </h4>
                <div className='flex  items-center gap-[2px]' >
                    <HiStar  className='text-yellowColor w-[18px] h-5'/>
                    <HiStar  className='text-yellowColor w-[18px] h-5'/>
                    <HiStar  className='text-yellowColor w-[18px] h-5'/>
                    <HiStar  className='text-yellowColor w-[18px] h-5'/>
                    <HiStar  className='text-yellowColor w-[18px] h-5'/>
                </div>
              </div>
            </div>
            <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>My experience with their medical services has been outstanding. The staff is incredibly attentive and caring.
             The quality of care and professionalism is unmatched.           
             </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='py-[30px] px-5 rounded-3'>
            <div className='flex items-center gap-[13px]'>
              <img src={patientAvatar4} alt="Patient Avatar" />
              <div>
                <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>
                  Mouhamed Ali
                </h4>
                <div className='flex  items-center gap-[2px]' >
                    <HiStar  className='text-yellowColor w-[18px] h-5'/>
                    <HiStar  className='text-yellowColor w-[18px] h-5'/>
                    <HiStar  className='text-yellowColor w-[18px] h-5'/>
                    <HiStar  className='text-yellowColor w-[18px] h-5'/>
                    <HiStar  className='text-yellowColor w-[18px] h-5'/>
                </div>
              </div>
            </div>
            <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'> I am truly grateful for their excellent service and highly recommend them to anyone in need of medical care .            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};


export default Testimonial