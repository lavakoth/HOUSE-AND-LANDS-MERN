// src/components/DetailBox.jsx
import React from 'react';

const DetailBox = ({ icon: Icon, label, value }) => (
  <div className="text-center p-4 bg-gray-50 rounded-lg border">
    <Icon className="w-8 h-8 mx-auto text-blue-600 mb-2" />
    <p className="text-2xl font-bold text-gray-800">{value}</p>
    <p className="text-sm text-gray-600">{label}</p>
  </div>
);

export default DetailBox;