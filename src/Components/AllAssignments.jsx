import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { FaRegEdit, FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthContext';
import { ThemeContext } from '../Pages/Shear/ThemeProvider';

const AllAssignments = () => {
    const { user } = useContext(AuthContext);
    const loadedAssignments = useLoaderData() || [];
    console.log(loadedAssignments);
    const [assignments, setAssignments] = useState(loadedAssignments); // Displayed assignments
    const { theme } = useContext(ThemeContext);
    const [searchText, setSearchText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('');
    const navigate = useNavigate();

    // Filtering logic: triggers when searchQuery or difficultyFilter changes
    useEffect(() => {
        let filtered = [...loadedAssignments];

        if (searchQuery) {
            filtered = filtered.filter(a =>
                a.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (difficultyFilter) {
            filtered = filtered.filter(a => a.difficulty === difficultyFilter);
        }

        setAssignments(filtered);
    }, [searchQuery, difficultyFilter, loadedAssignments]);

    const handleSearchClick = () => {
        setSearchQuery(searchText);
    };

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
                fetch(`https://assignment-server-11-roan.vercel.app/assignment/${assart._id}`, {
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
        <div className={`my-10 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-amber-50'}`}>
            <h1 className='font-bold text-3xl text-center italic my-5 text-fuchsia-800'>
                All the Assignments here
            </h1>

            {/* Filter UI */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mx-5 mb-6">
                <div className="flex gap-2 w-full lg:w-full">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="input input-bordered w-full"
                    />
                    <button onClick={handleSearchClick} className="btn btn-primary">Search</button>
                </div>

                <select
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                    className="select select-bordered"
                >
                    <option value="">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

            {/* Assignments Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 mx-5'>
                {assignments.map(assart => (
                    <div className={`card grid lg:grid-cols-2 grid-cols-1 bg-gradient-to-r from-cyan-500 to-red-300 mx-2 py-3 gap-5 shadow-2xl${theme === 'dark' ? ' bg-gray-900 text-white' : ''}`} key={assart._id}>
                        <figure>
                            <img
                                className='w-50 h-30 rounded-2xl'
                                src={assart.thumbnail}
                                alt="Thumbnail"
                            />
                        </figure>
                        <div className='grid grid-cols-2 px-3'>
                            <div className="card-body">
                                <h2 className="card-title flex flex-row">Title: {assart.title}</h2>
                                <p>Difficulty: {assart.difficulty}</p>
                                <p>Marks: {assart.marks}</p>
                            </div>
                            <div className="grid justify-end lg:pr-10 gap-2">
                                <button onClick={() => handleUpdateClick(assart)} className="btn">
                                    <FaRegEdit size={25} />
                                </button>
                                <button onClick={() => navigate(`/details/${assart._id}`)} className="btn">
                                    <FaEye size={25} />
                                </button>
                                <button onClick={() => handleDelete(assart)} className="btn">
                                    <MdDeleteForever size={25} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllAssignments;