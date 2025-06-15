
import React from 'react';
import { useLoaderData } from 'react-router';

const Details = () => {
    const data = useLoaderData();
    console.log(data)
    return (
         <div className="max-w-xl font-bold bg-indigo-50 shadow-2xl mx-auto mt-8  p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center  text-blue-600  italic underline">{data.title}</h2>
            <img src={data.thumbnail} alt={data.title} className="w-full h-48 object-cover rounded mb-4" />
            <p className="mb-2"><span className="text-xl text-fuchsia-600 font-bold italic underline">Description:</span> {data.description}</p>
            <p className="mb-2"><span className=" text-fuchsia-600 font-bold italic underline">Marks:</span> {data.marks}</p>
            <p className="mb-2"><span className=" text-fuchsia-600 font-bold italic underline">Difficulty:</span> {data.difficulty}</p>
            <p className="mb-2"><span className=" text-fuchsia-600 font-bold italic underline">Due Date:</span> {data.dueDate}</p>
            <p className="mb-2"><span className=" text-fuchsia-600 font-bold italic underline">Email:</span> {data.email}</p>
        </div>
    );
};

export default Details;