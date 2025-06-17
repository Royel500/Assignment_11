import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';

const Pending = () => {
  const { user } = useContext(AuthContext);
  const [submissions, setSubmissions] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('https://assignment-server-11-roan.vercel.app/pending-submissions')
      .then(res => res.json())
      .then(data => {
        setSubmissions(data);
      });
  }, [user]);

const handleGiveMark = (submission) => {


  if (user?.email == submission.userEmail) {
    Swal.fire({
      icon: 'error',
      title: 'Not Allowed!',
      text: 'You cannot mark your own assignment.',
    });
    return;
  }

  setSelected(submission);
  document.getElementById('markmodal').showModal();
};

  const handleSubmitMark = async (e) => {
    e.preventDefault();
    const form = e.target;
    const marks = form.marks.value;
    const feedback = form.feedback.value;

    const res = await fetch(`https://assignment-server-11-roan.vercel.app/mark-assignment/${selected._id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        obtainedMarks: marks,
        feedback,
        status: 'completed',
        markedBy: user.email
      })
    });

    const data = await res.json();
    if (data.modifiedCount) {
      Swal.fire('Marked!', 'Assignment has been marked.', 'success');
      setSubmissions(prev => prev.filter(sub => sub._id !== selected._id));
      setSelected(null);
      document.getElementById('markmodal').close();
    }
  };

  return (
    <div className="p-5 my-10 mx-3 border">
      <h2 className="text-2xl font-bold text-center mb-6">Pending Assignments</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="border border-red-300">
              <th># Title</th>
              <th>Assignment Marks</th>
              <th>Examinee</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub, idx) => (
              <tr key={sub._id} className="border border-red-300">
                <td>{idx + 1}. {sub.assignmentTitle}</td>
                <td>{sub.assignmentMarks}</td>
                <td>{sub.userName || 'Undefined'}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => handleGiveMark(sub)}
                  >
                    Give Mark
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Always render the dialog */}
      <dialog id="markmodal" className="modal">
        {selected && (
          <form method="dialog" className="modal-box" onSubmit={handleSubmitMark}>
            <h3 className="font-bold italic text-fuchsia-600 text-lg">Mark Assignment</h3>
            <p className="mb-2">
              <a
                href="https://docs.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Google Doc
              </a>
            </p>
            <p><span className='text-sm font-bold'>Examiee Note:</span> {selected.quickNote}</p>
            <p><span className='text-sm font-bold'>Assignment Marks:</span> {selected.assignmentMarks}</p>

            <div className="mt-4">
              <input
                name="marks"
                type="number"
                placeholder="Give Marks for the Assignment"
                className="input input-bordered w-full mb-2"
                required
              />
              <textarea
                name="feedback"
                placeholder="Feedback"
                className="textarea textarea-bordered w-full mb-2"
                required
              />
              <button type="submit" className="btn btn-success w-full">Submit</button>
            </div>
          </form>
        )}
      </dialog>
    </div>
  );
};

export default Pending;
