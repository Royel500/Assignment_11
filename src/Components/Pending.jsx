import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';

const Pending = () => {
  const { user } = useContext(AuthContext);
  const [submissions, setSubmissions] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3500/submissions?status=pending')
      .then(res => res.json())
      .then(data => {
        // Exclude self-submitted assignments
        const filtered = data.filter(sub => sub.submittedBy.email !== user?.email);
        setSubmissions(filtered);
      });
  }, [user]);

  const handleGiveMark = (submission) => {
    setSelected(submission);
    document.getElementById('mark_modal').showModal();
  };

  const handleSubmitMark = async (e) => {
    e.preventDefault();
    const form = e.target;
    const marks = form.marks.value;
    const feedback = form.feedback.value;

    const res = await fetch(`http://localhost:3500/mark-assignment/${selected._id}`, {
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
      document.getElementById('mark_modal').close();
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-center mb-6">Pending Assignments</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Marks</th>
              <th>Examinee</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map(sub => (
              <tr key={sub._id}>
                <td>{sub.assignmentTitle}</td>
                <td>{sub.assignmentMarks}</td>
                <td>{sub.submittedBy.name}</td>
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

      {/* Modal */}
      {selected && (
        <dialog id="mark_modal" className="modal">
          <form method="dialog" className="modal-box" onSubmit={handleSubmitMark}>
            <h3 className="font-bold text-lg">Mark Assignment</h3>
            <p className="mb-2">
              <a href={selected.docLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                View Google Doc
              </a>
            </p>
            <p><strong>Notes:</strong> {selected.notes}</p>
            <div className="mt-4">
              <input name="marks" type="number" placeholder="Give Marks" className="input input-bordered w-full mb-2" required />
              <textarea name="feedback" placeholder="Feedback" className="textarea textarea-bordered w-full mb-2" required />
              <button type="submit" className="btn btn-success w-full">Submit</button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default Pending;
