import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext'; // Adjust the path if needed

const CreateAssignment = () => {
  const { user } = useContext(AuthContext);
  const [dueDate, setDueDate] = useState(new Date());

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    marks: '',
    thumbnail: '',
    difficulty: 'easy',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAssignment = {
      ...formData,
      dueDate: dueDate.toISOString(),
      createdBy: {
        name: user.displayName,
        email: user.email
      }
    };

    try {
      const res = await fetch('https://your-api-endpoint.com/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAssignment),
      });

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Assignment Created!',
          text: 'Your assignment has been successfully created.',
        });
        // Reset form
        setFormData({
          title: '',
          description: '',
          marks: '',
          thumbnail: '',
          difficulty: 'easy',
        });
        setDueDate(new Date());
      } else {
        throw new Error('Failed to create assignment');
      }
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-base-100 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Create Assignment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Assignment Title"
          value={formData.title}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          required
        />

        <input
          type="number"
          name="marks"
          placeholder="Marks"
          value={formData.marks}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail Image URL"
          value={formData.thumbnail}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <div>
          <label className="block mb-1 font-semibold">Due Date</label>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            dateFormat="yyyy-MM-dd"
            className="input input-bordered w-full"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">Create Assignment</button>
      </form>
    </div>
  );
};

export default CreateAssignment;
