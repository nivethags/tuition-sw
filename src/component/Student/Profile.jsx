import React from 'react';
import { FaEdit } from "react-icons/fa"; 
import { FaPaperPlane } from "react-icons/fa";

import '../../style/Profile.css';

const Profile = () => {
    // Sample user data — you can fetch this dynamically later
    const user = {
        id: "stu123", // Unique student ID
        name: "John Doe",
        designation: "Tuition Student",
        profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
        about:
            "Motivated student focused on improving math and science skills. Passionate about learning and growth.",
        contact: {
            email: "john.doe@example.com",
            phone: "+1 234 567 890",
        },
        dateOfJoining: "2023-01-15",
        marks: {
            Math: 92,
            Science: 88,
            English: 85,
            Social: 90,
        },
    };
const handleRaiseRequest = (studentId) => {
  // Call API or show modal with student ID
  console.log("Raise request for student:", studentId);
  // Optionally show confirmation
  alert(`Update request submitted for student ID: ${studentId}`);
};

    return (
        <main className="profile-page" style={{marginLeft:'60px'}}>
            
            <section className="profile-card">
{/* <button
                        className="edit-icon-btn"
                        aria-label="Edit Profile"
                        onClick={() => alert("Edit Profile")}
                    >
                        <FaEdit style={{color:'black'}} />
                    </button> */}
                <div className="profile-image-container">
                    <img
                        src={user.profileImage}
                        alt={`${user.name} profile`}
                        className="profile-image"
                    />
                    
                </div>

                <div className="profile-info">
                    <h1 className="profile-name">{user.name}</h1>
                    <p className="profile-designation">{user.designation}</p>

                    <section className="profile-about">
                        <h2>About Me</h2>
                        <p>{user.about}</p>
                    </section>

                    <section className="profile-contact">
                        <h2>Contact Info</h2>
                        <p>
                            <strong>Email:</strong>{" "}
                            <a href={`mailto:${user.contact.email}`}>{user.contact.email}</a>
                        </p>
                        <p>
                            <strong>Phone:</strong>{" "}
                            <a href={`tel:${user.contact.phone}`}>{user.contact.phone}</a>
                        </p>
                    </section>

                    <section className="profile-joining">
                        <h2>Date of Joining</h2>
                        <time dateTime={user.dateOfJoining}>
                            {new Date(user.dateOfJoining).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </time>
                    </section>

                    <section className="profile-marks">
                        <h2>Marks Overview</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(user.marks).map(([subject, score]) => (
                                    <tr key={subject}>
                                        <td>{subject}</td>
                                        <td>{score}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>

<button
  className="raise-request-btn"
  onClick={() => handleRaiseRequest(user.id)}
>
  <FaPaperPlane style={{ marginRight: "8px" }} />
  Raise Request to Update Marks
</button>


                </div>
            </section>
        </main>
    );
};

export default Profile;
