// File: component/ModernSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import '../../style/Scroller.css'; // You can enhance this CSS

const subjects = [
  {
    id: 1,
    name: "Tamil",
    image: "https://i.pravatar.cc/150?img=1",
    teacher: "Mr. Ravi",
    day: "Monday"
  },
  {
    id: 2,
    name: "English",
    image: "https://i.pravatar.cc/150?img=2",
    teacher: "Ms. Priya",
    day: "Tuesday"
  },
  {
    id: 3,
    name: "Maths",
    image: "https://i.pravatar.cc/150?img=3",
    teacher: "Mr. Kumar",
    day: "Wednesday"
  },
  {
    id: 4,
    name: "Science",
    image: "https://i.pravatar.cc/150?img=4",
    teacher: "Ms. Meena",
    day: "Thursday"
  },
  {
    id: 5,
    name: "Social",
    image: "https://i.pravatar.cc/150?img=5",
    teacher: "Mr. Arjun",
    day: "Friday"
  },
];

const Scroller = () => {
  return (

<div style={{
  marginTop: '20px',
  width: '100%',
  paddingTop: '20px',
  borderRadius: '10px',
  marginLeft: '0 !important',
}}>
      <h6 style={{color:'white'}}>Teachers</h6>
    <Swiper
      slidesPerView={2}
      spaceBetween={30}
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      loop={true}
      speed={800}
      modules={[Autoplay, Pagination]}
      className="subjectSwiper"

    >
      {subjects.map((subject) => (
        <SwiperSlide key={subject.id}>
          <div className="subject-card">
            <div className="subject-top">
              <img src={subject.image} alt={subject.name} className="subject-logo" />
              <h3 className="subject-name">{subject.name}</h3>
            </div>
            <div className="subject-info">
              <p className="teacher-name">👨‍🏫 {subject.teacher}</p>
              <p className="schedule-day" style={{
                fontSize: '14px',
              }}>📅 {subject.day}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  );
};

export default Scroller;
