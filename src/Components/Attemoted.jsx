import React, { use } from 'react';
import { useLoaderData } from 'react-router';
import { ThemeContext } from '../Pages/Shear/ThemeProvider';

const Attemoted = () => {
  const assignments = useLoaderData();
  const {theme} = use(ThemeContext);
  return (
    <div className={`my-10 max-w-6xl bg-cyan-50 font-bold mx-auto p-4 ${
   theme === 'dark' 
        ? 'bg-gray-700 border  text-white' 
        : 'bg-gradient-to-r from-orange-200 via--500 to-sky-300 text-gray-800'
  
    }`}>

      <h2 className="text-2xl font-bold mb-6 italic text-purple-700 text-center">My Submitted Assignments</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
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
          <tbody>
            {
              assignments.map((a, idx) => (
                <tr key={a._id}>
                  <td>{idx + 1}</td>
                  <td>{a.assignmentTitle || "N/A"}</td>
                  <td>{a.status || "Pending"}</td>
                  <td>{a.assignmentMarks || "N/A"}</td>
                  <td>{a.obtainedMarks || "Waiting"}</td>
                  <td>{a.feedback || "Not yet given"}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attemoted;