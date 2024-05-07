import React from 'react'
// import Style from "../InternalServerError/page505.module.css";
import Style from './Error405.module.css'
import Image505 from '../../../asset/405.png'
import GeneralButton from '../../../components/common/buttons/GeneralButton'

function Error405() {
    return (
        <div className={Style.page405}>
            <div className={Style.container}>
                <div>
                    <img className={Style.image} src={Image505} alt="" />
                </div>
                <div className={Style.internalServerErrorDiv}>
                    <div>
                        <h1>Uh-Ah</h1>
                        <p>Bad Request!</p>
                    </div>
                    <div>
                        {/* <button>Back to dashboard</button> */}
                        <GeneralButton
                            name={'Bad Request !'}
                            type={'submit'}
                            backgroundColor={'var(--Brand-500, #6366F1)'}
                            color={'#fff'}
                        />
                    </div>
                    <div>
                        <br />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginLeft: '-30px',
                            }}
                        >
                            --OR--
                        </div>
                        <p>Please try after some time</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error405
