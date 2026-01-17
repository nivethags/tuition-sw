import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import '../../style/StaffScroller.css'; // Assuming you have a CSS file for styling

import 'swiper/css';
import 'swiper/css/pagination';
// import '../../style/Scroller.css';

const subjects = [
  {
    id: 1,
    name: "Tamil",
    image: "https://i.pravatar.cc/150?img=1",
    staff: "Mr. Ravi",
    day: "Monday",
    resultAvailable: true
  },
  {
    id: 2,
    name: "English",
    image: "https://i.pravatar.cc/150?img=2",
    staff: "Ms. Priya",
    day: "Tuesday",
    resultAvailable: false
  },
  {
    id: 3,
    name: "Maths",
    image: "https://i.pravatar.cc/150?img=3",
    staff: "Mr. Kumar",
    day: "Wednesday",
    resultAvailable: true
  },
  {
    id: 4,
    name: "Science",
    image: "https://i.pravatar.cc/150?img=4",
    staff: "Ms. Meena",
    day: "Thursday",
    resultAvailable: false
  },
];

const StaffScroller = () => {
  return (
    <div>

      <h6 style={{color:'white'}}>Test Subjects</h6>
   <Swiper
   
      slidesPerView={2}
  spaceBetween={30}
  pagination={{ clickable: true }}
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  loop={true}
  speed={800}
  modules={[Autoplay, Pagination]}
  className="mySwiper"
>

      {subjects.map((subject) => (
       <SwiperSlide key={subject.id}>
  <div
    className={`profile-card subject-box ${subject.resultAvailable ? 'result-available' : ''}`}
  >
    {subject.resultAvailable && (
      <div className="tick-icon">✔️</div>
    )}
    <div className="subject-top">
      <img src={subject.image} alt={subject.name} className="subject-logo" />
      <h3 className="subject-name">{subject.name}</h3>
    </div>
    <div className="subject-info">
      <p className="teacher-name">👨‍🏫 {subject.staff}</p>
      <p className="schedule-day" style={{ fontSize: '12px' }}>📅 {subject.day}</p>
    </div>
  </div>
</SwiperSlide>

      ))}
    </Swiper>
    </div>
  );
};

export default StaffScroller;
