
import React from 'react';
import { useLoaderData } from 'react-router';

const Details = () => {
    const data = useLoaderData();
    console.log(data)
    return (
         <div className="max-w-xl bg-indigo-100 mx-auto mt-8  p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">{data.title}</h2>
            <img src={data.thumbnail} alt={data.title} className="w-full h-48 object-cover rounded mb-4" />
            <p className="mb-2"><span className="font-semibold">Description:</span> {data.description}</p>
            <p className="mb-2"><span className="font-semibold">Marks:</span> {data.marks}</p>
            <p className="mb-2"><span className="font-semibold">Difficulty:</span> {data.difficulty}</p>
            <p className="mb-2"><span className="font-semibold">Due Date:</span> {data.dueDate}</p>
            <p className="mb-2"><span className="font-semibold">Email:</span> {data.email}</p>
        </div>
    );
};

export default Details;