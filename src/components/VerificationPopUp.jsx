// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';

// import { useRouter } from "next/navigation";

// const VerificationPopUp = () => {
//   const router = useRouter();
//   const { token } = router.query; // Get the token from the query params
//   const [status, setStatus] = useState('Verifying...');
//   const [isOpen, setIsOpen] = useState(false); // Control the popup visibility

//   useEffect(() => {
//     if (token) {
//       // Make the API call to verify the token
//       axios
//         .post('http://localhost:8000/api/account/verify', { token })
//         .then((response) => {
//           setStatus(response.data.message); // Update status on success
//         })
//         .catch((error) => {
//           setStatus(
//             error.response?.data?.message || 'Verification failed.' // Update status on failure
//           );
//         });
//     }
//   }, [token]);

//   return (
//     <div>
//       {/* Trigger Button */}
//       <button onClick={() => setIsOpen(true)}>Verify Account</button>

//       {/* Popup Component */}
//       <Popup
//         open={isOpen}
//         onClose={() => setIsOpen(false)}
//         modal
//         nested
//         className="popup-content"
//         overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
//       >
//         {(close) => (
//           <div>
//             <h2>Account Verification</h2>
//             <p>{status}</p>
//             <button onClick={close}>Close</button>
//           </div>
//         )}
//       </Popup>
//     </div>
//   );
// };

// export default VerificationPopUp;
