import React, { use, useContext, useState } from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthContext';
import { ThemeContext } from '../Pages/Shear/ThemeProvider';

const Details = () => {
  const {theme} =use(ThemeContext);
  const data = useLoaderData();
   const { user } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const submission = {
      assignmentId: data._id,
      userEmail: user?.email, 
      userName:user?.displayName,
      assignmentTitle:data.title,
      assignmentMarks:data.marks,
      googleDocsLink: form.link.value,
      quickNote: form.note.value,
      status: "pending",
      submittedAt: new Date().toISOString()
    };

    const res = await fetch('https://assignment-server-11-roan.vercel.app/submittedAssignment', {
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
     <> 
    <h1 className='text-3xl text-fuchsia-800
     font-bold text-center my-2 italic underline'> This is Details Page Of the Assignment</h1>
    <div className={`max-w-xl bg-gradient-to-r
     font-bold from-amber-200 to-cyan-500  mx-auto mt-8 
      p-6 rounded shadow${
        theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : ''
    }`}>


                
      <h2 className="text-2xl font-bold mb-4 text-center italic
       underline text-blue-700"> {data.title}</h2>
      <img src={data.thumbnail} alt={data.title} className="w-full h-48 object-cover rounded mb-4" />
      <p><strong className='underline text-fuchsia-600 italic'>Description:</strong> {data.description}</p>
      <p><strong className='underline text-fuchsia-600 italic'>Marks:</strong> {data.marks}</p>
      <p><strong className='underline text-fuchsia-600 italic'>Difficulty:</strong> {data.difficulty}</p>
      <p><strong className='underline text-fuchsia-600 italic'>Due Date:</strong> {data.dueDate}</p>
      <p><strong className='underline text-fuchsia-600 italic'>Email:</strong> {data.email}</p>

      <button onClick={() => setShowModal(true)} className="btn btn-success mt-4">Take Assignment</button>

      {showModal && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg italic text-fuchsia-700">Submit Assignment</h3>
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
      </>
  );
};

export default Details;
