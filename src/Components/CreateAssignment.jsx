import React, { use, useState } from 'react';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css'; 
import { AuthContext } from '../Context/AuthContext';

const CreateAssignment = () => {
  const [dueDate, setDueDate] = useState(null);
 const {user} = use(AuthContext);

  const AddAssignment = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const assignment = Object.fromEntries(formData.entries());

    // Add formatted dueDate
    assignment.dueDate = dueDate ? dueDate.toISOString().split('T')[0] : '';

  

    // POST request
    fetch('https://assignment-server-11-roan.vercel.app/assignment', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(assignment)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: 'Success!',
            text: 'Assignment added successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          form.reset();
          setDueDate(null);
        }
      });
  };

  return (
    <div className="max-w-xl  mx-auto my-8 bg-base-300 p-6 rounded shadow">
      <h2 className="text-2xl font-bold italic text-center mb-6">Create Assignment</h2>
      <form onSubmit={AddAssignment} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Assignment Title"
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          required
        />

        <input
          type="number"
          name="marks"
          placeholder="Marks"
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail Image URL"
          className="input input-bordered w-full"
          required
        />

        <select
          name="difficulty"
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

                <input
          type="email"
          name="email"
          defaultValue={user?.email}
          className="input input-bordered w-full"
          required
        />

        <div>
          <label className="block mb-1 font-semibold">Due Date</label>
          <DatePicker
            selected={dueDate}
            name='dueDate'
            onChange={(date) => setDueDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select due date"
            className="input input-bordered w-full"
            required
          />
        </div>

        <button type="submit" className="btn bg-green-400
      text-gray-800 w-full">
          Create Assignment
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment;
