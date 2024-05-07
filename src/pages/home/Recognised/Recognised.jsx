import React from 'react'
import Style from './recognised.module.css'
import Google from '../../../asset/google-startups-1__1_-removebg-preview.webp'
import Indian from '../../../asset/image-removebg-preview (1) copy.webp'
import StartUp from '../../../asset/image-removebg-preview (1).webp'
import Goverment from '../../../asset/download.webp'
const Recognised = () => {
    return (
        <div className={Style.recognised}>
            <div className={Style.recognisedHeading}>
                <h1>Recognised By</h1>
            </div>
            <div className={Style.recognisedCompany}>
                <div>
                    <img src={Google} className={Style.recognisedImg} alt="" />
                </div>
                <div>
                    <img src={Indian} className={Style.recognisedImg} alt="" />
                </div>
                <div>
                    <img src={StartUp} className={Style.recognisedImg} alt="" />
                </div>
                <div>
                    <img
                        src={Goverment}
                        className={Style.recognisedImg}
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}

export default Recognised
