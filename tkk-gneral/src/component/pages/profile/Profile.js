import React from "react";
import Sidebar from "../../common/Sidebar";

const Profile = () => {
  return (
    <>
      <section className="dashboard-section">
        <div className="container-fluid">
          <div className="row">
            {/* SIDE BAR HERE  */}
            <Sidebar />
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
