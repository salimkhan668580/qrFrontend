
import React, { useState } from 'react'
import axios from 'axios';
import QRCode from 'qrcode'; 
import { useNavigate } from 'react-router';


function AddUser() {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const nevigate=useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "",
    emergencyContactNo: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res=await axios.post('http://localhost:3000/addUser', formData)
    if(res.status===200){
      const qrText = `Name: ${formData.name}\nCompany: ${formData.company}\nRole: ${formData.role}\nEmergency Contact: ${formData.emergencyContactNo}`;

    console.log(qrText)
    const url = await QRCode.toDataURL(qrText);
console.log("Your QR code URL:", url)
    setQrCodeUrl(url);
    
      // alert('User added successfully')
      setFormData({
        name: "",
        company: "",
        role: "",
        emergencyContactNo: ""
      })

    }

  };
  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">🚀 Add New User</h2>
      <form onSubmit={handleSubmit} className='text-start'> 
        {/* Name */}
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            id="name"
            type="text"
            placeholder="Enter full name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        {/* Company */}
        <div className="mb-5">
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            id="company"
            type="text"
            placeholder="Enter company name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        {/* Role */}
        <div className="mb-5">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <input
            name="role"
            value={formData.role}
            onChange={handleChange}
            id="role"
            type="text"
            placeholder="Enter user role"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        {/* Emergency Contact No */}
        <div className="mb-6">
          <label htmlFor="emergencyContactNo" className="block text-sm font-medium text-gray-700 mb-1">
            Emergency Contact No
          </label>
          <input
            name="emergencyContactNo"
            value={formData.emergencyContactNo}
            onChange={handleChange}
            id="emergencyContactNo"
            type="text"
            placeholder="Enter emergency number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200"
        >
          ➕ Add User
        </button>
      </form>
      {qrCodeUrl && (
        <>
          <h3 className='text-center'>QR Code:</h3>
          <img src={qrCodeUrl} alt="QR Code" className='mx-auto' />
          <a href={qrCodeUrl} download="qrcode.png">
          <button 
           className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200"
          >DownloadQR</button>
           </a>
        </>
      )}
    </div>
  )
}

export default AddUser
