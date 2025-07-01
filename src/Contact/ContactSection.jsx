import React from 'react';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

const ContactSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 bg-white rounded-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Contact Me</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;