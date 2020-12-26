import React from 'react'
import Sidebar from '../../common/Sidebar'
import productImg from '../../../images/product-image.PNG'
import { useEffect } from 'react'
import getFavorites from '../../utils/getFavorites'
import { useState } from 'react'
import removeFromFavorite from '../../utils/removeFromFavorite'

const Favorites = () => {

   const [faves, setFaves] =  useState([])
    useEffect(()=>{
        if (getFavorites()) {
            setFaves(getFavorites().favoritesItems)
        }
    }, [])
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
                            <h4>My Favourites</h4>
                        </div>

                        <div className="my-favourites">
                            {
                                faves && faves.map((f, key)=>(
                                    <div className="favourite-item" key={key}>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <img className="img-fluid" src={f.image} alt="" />
                                        </div>
                                        <div className="col-lg-8">
                                            <div className="item-information">
                                                <div
                                                    className="item-title-and-remove d-flex justify-content-between flex-lg-row flex-md-row flex-sm-column">
                                                    <h5>{f.title}</h5>
                                                    <a href="#!" onClick={(e)=>{
                                                        removeFromFavorite(f.id)
                                                    }}><i className="fa fa-times"></i></a>
                                                </div>
                                                <div className="item-price">
                                <p>&#8358; {f.price}</p>
                                                </div>
                                                <div
                                                    className="other-item-information d-flex justify-content-between flex-lg-row flex-md-row flex-sm-row">
                                                    <div className="created-date-and-category">
                                <p className="created">Created at {f.date}</p>
                                                        <p className="category">Cereal Crops <span className="buy-now"><i
                                                                    className="fa fa-shipping-fast"></i> Buy Now</span></p>
                                                    </div>
                                                    <div className="actions">
                                                        <a href={`/buyer/t-messenger?pid=${f.id}`} className="chat">Chat</a>
                                                        <a href="#" className="show-phone">Show Phone</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</>
    )
}

export default Favorites
