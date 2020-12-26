import React, { useEffect, useContext, useState } from "react";
import { AlertContext } from "../context/alertContext/AlertState";

const AlertResponse = () => {
  const { alertState } = useContext(AlertContext);
  return (
    <div style={{
      bottom: 40,
      padding: 10,
      left: 10,
      position: "fixed",
    }}>
      {alertState.map((alerts) => (
        <div
          key={alerts.id}
          style={{
            marginTop:10,
            padding:10,
            background: "#000",
            minHeight: "50px",
            minWidth: "280px",
            textAlign: "center",
            borderRadius: 5,
            opacity: 0.8,
            color: "#fff",
          }}
        >
          <span style={{padding:10}}>
          <i className={`fa fa-info text-${alerts.type}`}></i>
          </span>
          <span>
            {alerts.message}
          </span>
        </div>
      ))}
    </div>
  );
};

const styles = {
  alertRow: {
    borderRadius: 7,
    marginBottom: 10,
    marginLeft: 12,
    marginRight: 12,
  },
};
export default AlertResponse;
// const AlertResponse = () => {
//   const { alertState } = useContext(AlertContext);
//   return (
//     <>
//       {alertState.map((alerts) => (
//         <div style={styles.alertRow} key={alerts.id}>
//           <div className={`"bg bg-${alerts.type} p-3"`}>
//             <i className="fa fa-info"></i>
//             <span
//               style={{
//                 color: "#333",
//                 fontSize: 20,
//                 padding: 12,
//                 paddingBottom: 20,
//                 paddingTop: 20,
//               }}
//             >
//               {alerts.message}
//             </span>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// const styles = {
//   alertRow: {
//     borderRadius: 7,
//     marginBottom: 10,
//     marginLeft: 12,
//     marginRight: 12,
//   },
// };
// export default AlertResponse;
