import React, {useEffect, useState} from 'react'

const TrackOrder = (props) => {

    const [trackingNumber, setTrackingNumber] = useState("")
    const [orderId, setOrderId] = useState("")
    useEffect(() => {
        setOrderId(props.match.params.orderid)
        setTrackingNumber(props.match.params.trackingnumber)
console.log(props.match.params," this is the tracking number here")
    }, [])
    return (
        <div className="dashboard-main-content">
        <div className="content-header">
            <h4 className="yellow-text"><a href="buyer-order-details.html"><i
                className="fa fa-arrow-alt-circle-left"></i>
                Tracking History</a></h4>
        </div>
        
        <div className="tracking-history">
            <div id="timeline">
                <div className="timeline-item">
                    <div className="timeline-icon">
                        <i className="fa fa-check"></i>
                    </div>
                    <div className="timeline-content">
                        <p>
                           Pending Confirmation - Friday, 14-02-2020
                        </p>
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-icon">
                        <i className="fa fa-check"></i>
                    </div>
                    <div className="timeline-content">
                        <p>
                           Pending Confirmation - Friday, 14-02-2020
                        </p>
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-icon">
                        <i className="fa fa-check"></i>
                    </div>
                    <div className="timeline-content">
                        <p>
                           Waiting to be shipped - Friday, 14-02-2020                                     
                        </p>
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-icon">
                        <i className="fa fa-check"></i>
                    </div>
                    <div className="timeline-content">
                        <p>
                           Shipped - Monday, 17-02-2020                                     
                        </p>
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-icon">
                        <i className="fa fa-check"></i>
                    </div>
                    <div className="timeline-content">
                        <p>
                           Delivered - Tuesday, 17-02-2020                                     
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default TrackOrder
