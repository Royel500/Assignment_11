import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthContext';

const AllAssignments = () => {
    const { user } = useContext(AuthContext); 
    const loadedAssignments = useLoaderData();
    const [assignments, setAssignments] = useState(loadedAssignments); 
    const navigate = useNavigate();

    const handleDelete = (assart) => {
        if (user?.email !== assart.email) {
            Swal.fire({
                icon: 'error',
                title: 'Unauthorized',
                text: 'You can only delete your own assignments!',
            });
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3500/assignment/${assart._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your assignment has been deleted.",
                                icon: "success"
                            });
                            setAssignments(assignments.filter(a => a._id !== assart._id));
                        }
                    });
            }
        });
    };

    const handleUpdateClick = (assart) => {
        if (user?.email === assart.email) {
            navigate(`/update/${assart._id}`);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Unauthorized',
                text: 'You can only update your own assignments!',
            });
        }
    };

    return (
        <div className='bg-amber-50 my-10 '>
            <h1 className='font-bold text-3xl text-center italic my-5 text-fuchsia-800'>
                All the Assignments here
            </h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 mx-5'>
                {assignments.map(assart => (
                    <div className="card grid grid-cols-3 mx-2 py-3 bg-fuchsia-100 gap-5 shadow-2xl" key={assart._id}>
                        <figure>
                            <img
                                className='w-50 h-30 rounded-2xl'
                                src={assart.thumbnail}
                                alt="Thumbnail"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title flex flex-row">Title: {assart.title}</h2>
                            <p>Difficulty: {assart.difficulty}</p>
                            <p> MArks: {assart.marks}</p>
                        </div>
                        <div className="grid justify-end lg:pr-10 gap-2">
                            {/* Update button with email check */}
                            <button onClick={() => handleUpdateClick(assart)} className="btn">
                                <FaRegEdit size={25} />
                            </button>

                            {/* View button (no check) */}
                            <button onClick={() => navigate(`/details/${assart._id}`)} className="btn">
                                <FaEye size={25} />
                            </button>

                            {/* Delete button with email check */}
                            <button onClick={() => handleDelete(assart)} className="btn">
                                <MdDeleteForever size={25} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllAssignments;
