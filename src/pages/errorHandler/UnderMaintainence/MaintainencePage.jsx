import React from 'react'
import Style from './underMaintianence.module.css'
import underMaintainence from '../../../asset/error/20945825.jpg'
import { Flex, Spin } from 'antd'
import Header from '../../home/Header/Header'

const MaintainencePage = () => {
    return (
        <>
            {/* <Header /> */}
            <div className={Style.maintainencePage}>
                <div className={Style.container}>
                    <div className={Style.imageAndLoder}>
                        <img
                            className={Style.image}
                            src={underMaintainence}
                            alt=""
                        />
                        {/* <Flex align="center" gap="middle">
            <Spin size="large" />
          </Flex> */}
                    </div>

                    <div>
                        <h1>UNDER MAINTENANCE!</h1>
                        <p>We're sorry for the inconvenience.</p>
                        <p>Please check back later.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MaintainencePage
