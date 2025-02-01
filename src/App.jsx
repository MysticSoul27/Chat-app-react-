import { useRef, useState } from 'react'
import './App.css'
import Auth from './components/Auth'
import Cookies from 'universal-cookie'
import Chat from './components/Chat'
import { signOut } from 'firebase/auth'
import { auth } from './firebseConfig'
import { Col, Row } from 'react-bootstrap'


const cookies = new Cookies()


function App() {

  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null)

  const roomInputRef = useRef(null)

  const signuUserOut = async () => {
    await signOut(auth)
    cookies.remove("auth-token")
    setIsAuth(false)
    setRoom(null)
  }

  if (!isAuth) {
    return <Auth setIsAuth={setIsAuth} />
  }

  return (
    <>
      <>
        <div style={{ width: '100%', height: '100vh' }} className='d-flex flex-column justify-content-center align-items-center'>

          {

            room ?
              <div>
                <Chat room={room} />
              </div>
              :
              <div className='d-flex flex-column'>
                <label className='p-1 my-2 fw-bold'>
                  Enter Room Name:
                </label>
                <input ref={roomInputRef} type="text" className='from-control rounded p-1 my-2' placeholder='For example: room 1' />
                <div className='p-2 my-1'>
                  <button onClick={() => setRoom(roomInputRef.current.value)} className='btn'>Enter Chat</button>
                </div>
              </div>
          }




          <div className='my-5'>
            <h6 className='p-1'>Leave the room, click the sign out button.</h6>
            <button onClick={signuUserOut} className='btn bg-primary boder border-0 mt-1'>Sign out</button>
          </div>

        </div>
      </>


    </>
  )
}

export default App
