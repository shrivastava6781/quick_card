// import React, { useState } from 'react';
// import axios from 'axios';

// const PaymentForm = ({ onClose, onUpdate }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     image: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       image: e.target.files[0],
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataObj = new FormData();
//     formDataObj.append('title', formData.title);
//     formDataObj.append('description', formData.description);
//     if (formData.image) {
//       formDataObj.append('image', formData.image);
//     }

//     try {
//       const response = await axios.post('/api/payments', formDataObj, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       if (response.status === 200) {
//         onUpdate(response.data); // Update the parent component with the new data
//         onClose(); // Close the modal
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   return (
//     <div className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Add New Payment Method</h5>
//             <button type="button" className="close" onClick={onClose}>
//               <span>&times;</span>
//             </button>
//           </div>
//           <form onSubmit={handleSubmit}acceptCharset="UTF-8">
//             <div className="modal-body">
//               <div className="mb-4">
//                 <label className="form-label required" htmlFor="title">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   className="form-control custom-placeholder"
//                   id="title"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="form-label required" htmlFor="description">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   className="form-control custom-placeholder"
//                   id="description"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="form-label required" htmlFor="image">
//                   Image
//                 </label>
//                 <input
//                   type="file"
//                   name="image"
//                   onChange={handleFileChange}
//                   className="form-control custom-placeholder"
//                   id="image"
//                 />
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
//                 Close
//               </button>
//               <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentForm;




import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = ({ onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    image: null,
  });
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateDescription = (description) => {
    if (!description) {
      return 'Description is required';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the description
    const descriptionError = validateDescription(formData.description);
    if (descriptionError) {
      setErrors({ description: descriptionError });
      return;
    } else {
      setErrors({});
    }

    const formDataObj = new FormData();
    formDataObj.append('description', formData.description);
    if (formData.image) {
      formDataObj.append('image', formData.image);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/payment-methods', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        onUpdate(response.data); // Update the parent component with the new data
        onClose(); // Close the modal
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: 'Failed to submit. Please try again later.' });
    }
  };

  return (
    <div className="modal fade show" role="dialog" style={{ display: "block", paddingRight: "17px" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Payment Method</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit} acceptCharset="UTF-8">
            <div className="modal-body">
              <div className="mb-4">
                <label className="form-label required" htmlFor="image">
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="form-control custom-placeholder"
                  id="image"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
                Close
              </button>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
