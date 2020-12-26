import React from 'react'
import Sidebar from '../../common/Sidebar'

const VoucherCredits = () => {
    return (
<>
    <section className="dashboard-section">
        <div className="container-fluid">
            <div className="row">
               {/* SIDE BAR HERE  */}
               <Sidebar />
               <div className="col-md-9">
                    <div className="dashboard-main-content">
                        <div className="content-header">
                            <h4 className="yellow-text">Voucher Credits</h4>
                        </div>
                        <div className="voucher-container">
                            <i className="fa fa-gift icon"></i>
                            <h6 className="no-voucher">You currently have no available Voucher Credits</h6>
                            <p className="no-voucher-text">All your available voucher credits and coupons will be displayed here</p>
                            <a href="#" className="continue-shopping-button">Continue Shopping</a>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>

</>
    )
}

export default VoucherCredits

