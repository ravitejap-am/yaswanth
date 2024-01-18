import React from 'react'
import './UserProfile.css'
import { Link } from 'react-router-dom'

const UserProfile = () => {
    const handleBackToChat = () => {
        console.log("back button clicked");
    }
    return (
        <div className='userprofile-screen'>
            <div className='userprofile-main'>
                <div className='userprofile-sidebar'>
                    <div className='sidebar-amchat'>
                        <h2>Am-Chat</h2>
                        <div className='back-button'>
                            <button onChange={handleBackToChat}>Back to Chat</button>
                        </div>
                    </div>
                </div>
                <div className='userprofile-pofilecontainer'>
                    <div className='userprofile-header'>
                        <div className=''>
                            <h2>Profile</h2>
                        </div>
                        <div className='userprofile-account'>
                            <div className='userprofile-pic'>
                                <img src="" alt="" />
                            </div>
                            <div className='userprofile-account-name'>
                                <h2>Clayton Santos</h2>
                            </div>
                        </div>
                    </div>

                    <div className='info-bar'>
                        <Link to={"/"} >Persenal Information</Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile