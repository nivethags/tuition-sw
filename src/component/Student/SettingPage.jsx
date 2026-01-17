import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit, FaFileContract, FaKey, FaHeadset } from 'react-icons/fa';

const SettingPage = () => {
  const navigate = useNavigate();

  const settings = [
    {
      title: 'Edit Profile',
      description: 'Update your name, contact info, or photo.',
      icon: <FaUserEdit size={24} />,
      route: '/edit-profile',
    },
    {
      title: 'Terms & Conditions',
      description: 'Read the terms before using this app.',
      icon: <FaFileContract size={24} />,
      route: '/terms',
    },
    {
      title: 'Change Password',
      description: 'Keep your account secure by updating your password.',
      icon: <FaKey size={24} />,
      route: '/change-password',
    },
    {
      title: 'Contact Support',
      description: 'Need help? Get in touch with our support team.',
      icon: <FaHeadset size={24} />,
      route: '/support',
    },
  ];

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Settings</h2>

      <div className="space-y-4 max-w-xl mx-auto my-5">
        {settings.map((setting, idx) => (
          <div
            key={idx}
            onClick={() => navigate(setting.route)}
            className="flex items-center p-4 bg-white shadow-md rounded-xl cursor-pointer hover:shadow-lg transition duration-200 my-4"
          >
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full mr-4">
              {setting.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{setting.title}</h3>
              <p className="text-sm text-gray-500">{setting.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingPage;
