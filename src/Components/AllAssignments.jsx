import React, { useContext } from 'react';
import { useLoaderData, NavLink } from 'react-router';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthContext';

const AllAssignments = () => {
    const { user } = useContext(AuthContext); 
    const assignment = useLoaderData();

    const handleDelete = (assart) => {
        // Check user email matches assignment email
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
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    return (
        <div className='bg-amber-50'>
            <h1 className='font-bold text-3xl text-center italic my-5 text-fuchsia-800'> All the Assignments here</h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 mx-5'>
                {
                    assignment.map(assart => (
                        <div className="card grid grid-cols-3 mx-2 py-3  bg-fuchsia-100 gap-5   shadow-2xl" key={assart._id}>
                            <figure>
                                <img
                                    className='w-50 h-30 rounded-2xl '
                                    src={assart.thumbnail}
                                    alt="Movie" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title flex flex-row"> Title: {assart.title}</h2>
                                <p>Defficulty: {assart.difficulty}</p>
                            </div>
                            <div className=" grid justify-end lg:pr-10">
                                <h1 className="btn">
                                    <NavLink to={`/update/${assart._id}`}><button ><FaRegEdit size={25} /></button></NavLink>
                                </h1>
                                <NavLink to={`/details/${assart._id}`} className="btn">
                                    <FaEye size={25} />
                                </NavLink>
                                <h1 className='btn '>
                                    <NavLink>
                                        <button onClick={() => handleDelete(assart)}>
                                            <MdDeleteForever size={25} />
                                        </button>
                                    </NavLink>
                                </h1>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default AllAssignments;