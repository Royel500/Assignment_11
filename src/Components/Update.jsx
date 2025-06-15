import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import Swal from 'sweetalert2';
const Update = () => {

    const {_id,title,description,marks,thumbnail,difficulty,email,} = useLoaderData();
    console.log(title);

      const [dueDate, setDueDate] = useState(null);


    const UpdateAssignment = e =>{
          e.preventDefault();
        
          const form = e.target ;
          const formData = new FormData(form) ;
          const update  = Object.fromEntries(formData.entries());
           update.dueDate = dueDate ? dueDate.toISOString().split('T')[0] : '';


        //    ----update --
         // POST request
            fetch(`http://localhost:3500/assignment/${_id}`, {
              method: 'PUT',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(update)
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.modifiedCount) {
                 Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Assignment Updated successfully",
                    showConfirmButton: false,
                    timer: 1500
                    });
                  form.reset();
                  setDueDate(null);
                }
              });

    }
    return (
         <div className="max-w-xl mx-auto mt-8 bg-purple-200 p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6 italic text-green-500 underline text-center " >Update Your Assignment</h2>
            <form onSubmit={UpdateAssignment} className="space-y-4">
      
              <input
                type="text"
                name="title"
                defaultValue={title}
                placeholder="Assignment Title"
                className="input input-bordered w-full"
                required
              />
      
              <textarea
                name="description"
                defaultValue={description}
                placeholder="Description"
                className="textarea textarea-bordered w-full"
                required
              />
      
              <input
                type="number"
                defaultValue={marks}
                name="marks"
                placeholder="Marks"
                className="input input-bordered w-full"
                required
              />
      
              <input
                type="text"
                name="thumbnail"
                defaultValue={thumbnail}
                placeholder="Thumbnail Image URL"
                className="input input-bordered w-full"
                required
              />
      
              <select
                name="difficulty"
                defaultValue={difficulty}
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
                defaultValue={email? email : 'webdev.royelali@gmail.com'}
                className="input input-bordered w-full"
                required
              />
      
              <div>
                <label className="block mb-1 font-semibold">Due Date</label>
                <DatePicker
                  selected={dueDate}
                  name='dueDate'
                  defaultValue={dueDate}
                  onChange={(date) => setDueDate(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select due date"
                  className="input input-bordered w-full"
                  required
                />
              </div>
      
              <button type="submit" className="btn btn-primary w-full">
                Update Your Assignment
              </button>
            </form>
          </div>
    );
};

export default Update;