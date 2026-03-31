import React, { useState } from 'react'
import UsersList from '../../components/UserList/UsersList'
import './Home.css'
import ChatBox from '../../components/ChatBox/ChatBox'
import UserMedia from '../../components/UserMedia/UserMedia'
import { useChatContext } from '../../context/ChatContext'
function Home() {
    const [clickedUser, setClickedUser] = useState(false)
    const { selectedUser, setSelectedUser } = useChatContext()
    return (
        <div className='Home '>
            <div className="HomeData row">
                <div className="Box col-md-3 col-12">
                    <UsersList setClickedUser={setClickedUser} selectedUser={selectedUser}  />
                </div>
                {
                    clickedUser ?
                        <>

                            <div className=" Box col-md-6 col-12">
                                <ChatBox selectedUser={selectedUser} />
                            </div>
                            <div className="Box col-md-3 col-12">
                                <UserMedia selectedUser={selectedUser} />
                            </div>
                        </> :
                        <div className="col-9 d-flex justify-content-center align-items-center flex-column" style={{ color: 'white' }}>
                            <img src="https://www.icons101.com/icon_png/size_512/id_83977/Messages_Purple.png" height='30%' alt="" srcset="" />
                            <h4>UserSelected Please</h4>
                        </div>
                }
            </div>
        </div>
    )
}

export default Home