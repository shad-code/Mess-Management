import React from "react";
import Navbar from "../components/Navbar";
import { useGetMyAttendanceDuesQuery } from "../../apis/duesApi";
// import { useGetMyAttendanceDuesQuery } from "../api/apiSlice"; // ✅ Import RTK query hook

const AttendanceDues = () => {
  const { data, isLoading, error } = useGetMyAttendanceDuesQuery();
  console.log(data)
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg mx-auto mt-6">
        <h2 className="text-2xl font-bold text-teal-400 text-center mb-4">
          Attendance and Dues
        </h2>

        {isLoading && <p className="text-center text-teal-300">Loading...</p>}
        {error && (
          <p className="text-center text-red-400">Error loading dues data.</p>
        )}

        {!isLoading && data && (
          <table className="w-full border-collapse border border-teal-500">
            <thead className="bg-gray-700 text-teal-300">
              <tr>
                <th className="border border-teal-500 p-2">Sr. No.</th>
                <th className="border border-teal-500 p-2">Month</th>
                <th className="border border-teal-500 p-2">Attendance</th>
                <th className="border border-teal-500 p-2">Charges</th>
                <th className="border border-teal-500 p-2">Paid</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={row.id}
                  className={`text-center ${
                    index === 4 ? "bg-teal-700" : "bg-gray-800"
                  } hover:bg-gray-700 transition`}
                >
                  <td className="border border-teal-500 p-2">{index + 1}</td>
                  <td className="border border-teal-500 p-2">{row.month}</td>
                  <td className="border border-teal-500 p-2">
                    {row.attendance}
                  </td>
                  <td className="border border-teal-500 p-2">{row.charges}</td>
                  <td className="border border-teal-500 p-2">{row.paid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AttendanceDues;


// import React from "react";
// import Navbar from "../components/Navbar"; // ✅ Import Navbar component

// const AttendanceDues = () => {
//   const data = [
//     { id: 1, month: "January", attendance: 65, charges: 1950, paid: "Yes" },
//     { id: 2, month: "February", attendance: 76, charges: 2280, paid: "Yes" },
//     { id: 3, month: "March", attendance: 90, charges: 2700, paid: "Yes" },
//     { id: 4, month: "April", attendance: 75, charges: 2250, paid: "No" },
//     { id: 5, month: "May", attendance: 48, charges: 1440, paid: "-" },
//     { id: 6, month: "June", attendance: 0, charges: 0, paid: "-" },
//     { id: 7, month: "July", attendance: 0, charges: 0, paid: "-" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* ✅ Navbar Added Here */}
//       <Navbar />

//       <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg mx-auto mt-6">
//         <h2 className="text-2xl font-bold text-teal-400 text-center mb-4">
//           Attendance and Dues
//         </h2>

//         <table className="w-full border-collapse border border-teal-500">
//           <thead className="bg-gray-700 text-teal-300">
//             <tr>
//               <th className="border border-teal-500 p-2">Sr. No.</th>
//               <th className="border border-teal-500 p-2">Month</th>
//               <th className="border border-teal-500 p-2">Attendance</th>
//               <th className="border border-teal-500 p-2">Charges</th>
//               <th className="border border-teal-500 p-2">Paid</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, index) => (
//               <tr
//                 key={row.id}
//                 className={`text-center ${
//                   index === 4 ? "bg-teal-700" : "bg-gray-800"
//                 } hover:bg-gray-700 transition`}
//               >
//                 <td className="border border-teal-500 p-2">{row.id}</td>
//                 <td className="border border-teal-500 p-2">{row.month}</td>
//                 <td className="border border-teal-500 p-2">{row.attendance}</td>
//                 <td className="border border-teal-500 p-2">{row.charges}</td>
//                 <td className="border border-teal-500 p-2">{row.paid}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AttendanceDues;
