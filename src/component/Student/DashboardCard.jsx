import React from 'react';
import '../../style/DashboardCard.css'; // Move styles to a separate CSS file

const DashboardCard = ({
  name = "Elizabeth Foster",
  role = "Web & Graphic Design",
  avatar = "https://i.postimg.cc/sxWYtVkn/avatar-1.jpg",
  completion = 85,
  rating = 7.5
}) => {
  return (
    <div className="dashboard-card profile-card" style={{marginTop:'100px',width:'90%',marginInline:'auto'}}>
      <div className="profile-card-wrapper">
        <figure className="card-avatar">
          <img src={avatar} alt={name} width="48" height="48" />
        </figure>
        <div>
          <p className="card-title">{name}</p>
          <p className="card-subtitle">{role}</p>
        </div>
      </div>

      <ul className="progress-list">
        <li className="progress-item">
          <div className="project-label">
            <p className="progress-title">Project Completion</p>
            <data value={completion} className="progress-data">{completion}%</data>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${completion}%`, backgroundColor: 'var(--blue-ryb)' }}></div>
          </div>
        </li>
        <li className="progress-item">
          <div className="project-label">
            <p className="progress-title">Overall Rating</p>
            <data value={rating} className="progress-data">{rating}</data>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${rating * 10}%`, backgroundColor: 'var(--coral)' }}></div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DashboardCard;
