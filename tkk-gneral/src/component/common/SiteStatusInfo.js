import React from 'react'

const SiteStatusInfo = () => {
    return (
        <div
        style={{
          background: "#000",
          position: "fixed",
          float: "right",
          right: 0,
          top: 100,
          opacity: 0.6,
          padding: 30,
          borderRadius: "30px",
        }}
      >
        <p style={{ fontSize: "20px", color: "#fff" }}>
          <span className="fa fa-info p-2"></span>
          Site under Development
        </p>
      </div>
    )
}

export default SiteStatusInfo
