import React from 'react'
import Style from './fqBanner.module.css'

const FQBanner = () => {
    return (
        <div className={Style.FQBanner}>
            <div className={Style.FQBannerDetails}>
                <h2>Frequently asked questions</h2>
                <div>
                    <div className={Style.FQ}>
                        <div className={Style.number}>01</div>
                        <div>
                            <p>
                                How to implement TrueReach AI for Internal teams
                                ?{' '}
                            </p>
                        </div>
                    </div>
                    <div className={Style.number}>01</div>
                    <div>
                        <p>
                            How to implement TrueReach AI for Internal teams ?{' '}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FQBanner
