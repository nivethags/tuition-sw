import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Terms & Conditions</h1>

        <section className="space-y-4 text-sm sm:text-base">
          <p>
            Welcome to our Tuition Management App. By accessing or using this app, you agree to be bound by these terms and conditions. Please read them carefully.
          </p>

          <h2 className="text-lg font-semibold mt-4">1. User Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>You must provide accurate student and parent information.</li>
            <li>You agree not to misuse or disrupt the system intentionally.</li>
            <li>You are responsible for maintaining confidentiality of your login credentials.</li>
          </ul>

          <h2 className="text-lg font-semibold mt-4">2. Data Usage</h2>
          <p>
            We use the data you provide solely for tuition and student management purposes. We do not sell or share your personal information with third parties.
          </p>

          <h2 className="text-lg font-semibold mt-4">3. Fee Payments</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>All payments must be made as per the schedule communicated.</li>
            <li>Late fees may apply for delayed payments.</li>
          </ul>

          <h2 className="text-lg font-semibold mt-4">4. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account if any activity is found to be in violation of our terms or local laws.
          </p>

          <h2 className="text-lg font-semibold mt-4">5. Changes to Terms</h2>
          <p>
            These terms may be updated from time to time. Continued use of the app after changes implies acceptance of the revised terms.
          </p>

          <p className="mt-6 text-center text-sm text-gray-500">
            If you have any questions, please <Link to="/support" className="text-blue-500 hover:underline">contact our support team</Link>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
