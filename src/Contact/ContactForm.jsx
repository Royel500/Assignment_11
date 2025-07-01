import React from 'react';
import { FiSend } from 'react-icons/fi';

const ContactForm = () => {
  return (
    <div className="bg-sky-50
p-8 rounded-xl font-bold  shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send a Message</h3>
      <form className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Mr Marko"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="marko@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            className="w-full px-4 py-2 border border-gray-300 rounded-md
             focus:ring-blue-500 focus:border-blue-500"
            placeholder="Project Inquiry"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message *
          </label>
          <textarea
            id="message"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 
            rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your message here..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center w-full bg-blue-600  py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          <FiSend className="mr-2" />
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;