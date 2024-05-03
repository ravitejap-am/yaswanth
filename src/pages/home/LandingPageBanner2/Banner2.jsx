import React from 'react'
import Style from './banner2.module.css'

const Banner2 = () => {
    return (
        <div className={Style.banner2}>
            <div className={Style.box1}>
                <h1>Built for businesses, by ex-CEOs.</h1>
            </div>
            <div className={Style.box2}>
                <p>
                    {' '}
                    TrueReach is an AI built by people who've been in your
                    shoes. Designed to help you manage your business more
                    efficiently, freeing up your time to focus on what truly
                    matters. ​It's like having a smart assistant that knows your
                    business inside and out, ready to tackle tasks big and
                    small.
                </p>
                <p>
                    TrueReach is all about doing more with less: less stress,
                    less time, less complexity.​
                </p>
                <p>
                    With TrueReach you're not just surviving in the business
                    world, you're thriving!
                </p>
            </div>
        </div>
    )
}

export default Banner2
