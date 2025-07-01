import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../Pages/Shear/ThemeProvider';
import { AuthContext } from '../Context/AuthContext';
import AllAssignments from './AllAssignments';

const Attemoted = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext) || {}; // Fallback safe
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use email from context or localStorage
  const email = user?.email || JSON.parse(localStorage.getItem("user"))?.email;

  useEffect(() => {
    const fetchSubmittedAssignments = async () => {
      if (!email) {
        console.warn("No email available, skipping fetch.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://assignment-server-11-roan.vercel.app/submittedAssignments/${encodeURIComponent(email)}`);
        const data = await res.json();
       
        setAssignments(data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmittedAssignments();
  }, [email]);

  return (
    <div
      className={`my-10 max-w-6xl font-bold mx-auto p-4 ${
        theme === 'dark'
          ? 'bg-gray-700 border text-white'
          : 'bg-gradient-to-r from-orange-100 via-blue-300 to-sky-200 text-gray-800'
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 italic text-purple-700 text-center">
        My Submitted Assignments
      </h2>

      {loading ? (
        <p className="text-center text-blue-600">Loading...</p>
      ) : assignments.length === 0 ? (
        <div className="text-center py-10 text-lg text-red-600">
          You haven't submitted any assignments yet.  <br />
          <span> Please Create an AllAssignments and take it then show it in 
            your My submitted page</span> <br />
           Please submit your assignment.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table border table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Assignment Title</th>
                <th>Status</th>
                <th>Assignment Marks</th>
                <th>Obtained Marks</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody className='border'>
              {assignments.map((a, idx) => (
                <tr  key={a._id}>
                  <td>{idx + 1}</td>
                  <td>{a.assignmentTitle || 'N/A'}</td>
                  <td>{a.status || 'Pending'}</td>
                  <td>{a.assignmentMarks || 'N/A'}</td>
                  <td>{a.obtainedMarks || 'Waiting'}</td>
                  <td>{a.feedback || 'Not yet given'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Attemoted;
