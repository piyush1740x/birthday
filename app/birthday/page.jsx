// pages/birthday.js (or any other page name you prefer)
import React from 'react';

const BirthdayPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-100">
      <div className="bg-white rounded-lg p-8 shadow-md w-fit"> {/* w-fit for content width */}
        {/* Happy Birthday */}
        <div className="flex items-center justify-center mb-4">
          <span className="text-4xl font-bold mr-2">Happy</span>
          <div className="rounded-full bg-gray-300 w-6 h-6"></div>
          <span className="text-4xl font-bold ml-2">Birthday</span>
        </div>

        {/* Payal */}
        <div className="text-center text-3xl font-semibold mb-6">Payal</div>

        {/* Message Box */}
        <div className="bg-yellow-50 rounded-lg p-4 mb-6">
          <p className="text-lg">
            With 10000 of fights and breakup, patchup we are still together. (Love you so much)
          </p>
        </div>

        {/* Wishes */}
        <div className="mb-6">
          <p className="text-lg">
            I wish you'll always be happy with your life. Happy Birthday!
          </p>
        </div>

        {/* Cake Cutting */}
        <div className="text-center">
          <p className="text-xl font-medium">Let's go to cake cutting!</p>
        </div>
      </div>
    </div>
  );
};

export default BirthdayPage;