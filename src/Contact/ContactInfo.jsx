import React from 'react';
import { FiMail, FiLinkedin, FiPhone, FiMessageSquare, FiMapPin } from 'react-icons/fi';

const ContactInfo = () => {
  const contactItems = [
    {
      icon: <FiMail className="text-blue-600 text-xl" />,
      title: "Email",
      value: "webdev.royelali@gmail.com"
    },
    {
      icon: <FiLinkedin className="text-blue-600 text-xl" />,
      title: "LinkedIn",
      value: "Connect with me",
      link: "#" // Add your LinkedIn URL
    },
    {
      icon: <FiPhone className="text-blue-600 text-xl" />,
      title: "Phone",
      value: "+88 01907226353"
    },
    {
      icon: <FiMessageSquare className="text-blue-600 text-xl" />,
      title: "WhatsApp",
      value: "+88 01907226353",
      link: "https://wa.me/8801902264311"
    },
    {
      icon: <FiMapPin className="text-blue-600 text-xl" />,
      title: "Location",
      value: "Mouchak, Gazipur, Bangladesh"
    }
  ];

  return (
    <div className="
     bg-green-50 
 p-8 rounded-xl font-bold shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h3>
      <div className="space-y-5">
        {contactItems.map((item, index) => (
          <div key={index} className="flex items-start">
            <div className="mr-4 mt-1">{item.icon}</div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">{item.title}</h4>
              {item.link ? (
                <a href={item.link} className="text-blue-600 hover:underline">
                  {item.value}
                </a>
              ) : (
                <p className="text-gray-800">{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;