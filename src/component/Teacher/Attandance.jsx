import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Attandance = () => {

    const [student, setStudent] = useState();

    useEffect(() => {

        axios.get('http://localhost:5000/teacher/getstudentlist')
            .then(res => {
                setStudent(res.data.info);
                console.log(res.data.info);


            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        console.log("student", student);
    }, [])


    return (
        <div>
            <div>
                <h2>Student List</h2>
                {student.length > 0 ? (
                    student.map((val, index) => (
                        <div key={index} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd" }}>
                            <p><strong>Name:</strong> {val.name}</p>
                            <p><strong>Email:</strong> {val.email}</p>
                            <p><strong>Standard:</strong> {val.standard}</p>
                        </div>
                    ))
                ) : (
                    <p>No students found.</p>
                )}
            </div>

        </div>
    )
}

export default Attandance;