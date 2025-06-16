import React from 'react';
import { useLoaderData } from 'react-router';

const Attemoted = () => {
  const assignments = useLoaderData();

console.log(assignments);
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">My Submitted Assignments</h2>
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
                  <td>{a.quickNote || "Not yet given"}</td>
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
