import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const Details = () => {
  const data = useLoaderData();
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const submission = {
      assignmentId: data._id,
      userEmail: data.email, 
      assignmentTitle:data.title,
      assignmentMarks:data.marks,
      googleDocsLink: form.link.value,
      quickNote: form.note.value,
      status: "pending",
      submittedAt: new Date().toISOString()
    };

    const res = await fetch('http://localhost:3500/submittedAssignment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission)
    });

    const result = await res.json();
    if (result.insertedId) {
      Swal.fire('Submitted!', 'Assignment submitted successfully!', 'success');
      setShowModal(false);
      form.reset();
    }
  };

  return (
    <div className="max-w-xl bg-amber-50 mx-auto mt-8  p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center italic underline text-blue-700">{data.title}</h2>
      <img src={data.thumbnail} alt={data.title} className="w-full h-48 object-cover rounded mb-4" />
      <p><strong>Description:</strong> {data.description}</p>
      <p><strong>Marks:</strong> {data.marks}</p>
      <p><strong>Difficulty:</strong> {data.difficulty}</p>
      <p><strong>Due Date:</strong> {data.dueDate}</p>
      <p><strong>Email:</strong> {data.email}</p>

      <button onClick={() => setShowModal(true)} className="btn btn-success mt-4">Take Assignment</button>

      {showModal && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Submit Assignment</h3>
            <form onSubmit={handleSubmit} className="space-y-3 mt-4">
              <input type="url" name="link" placeholder="Google Docs Link" className="input input-bordered w-full" required />
              <textarea name="note" placeholder="Quick Note" className="textarea textarea-bordered w-full" required></textarea>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" onClick={() => setShowModal(false)} className="btn">Close</button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Details;
