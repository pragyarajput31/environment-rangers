import React,{useState} from 'react'
import { Wrapper } from '../Components'
import { useContext, useEffect } from 'react'
import Context from '../context/Context'
import { useNavigate } from 'react-router-dom'
import admin from "../assets/profile.png";
import profile from "../assets/man.png"
import { set } from 'mongoose'

const Profile = () => {

    const {User} = useContext(Context);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userName , setUserName] = useState("");
    const [email , setEmail] = useState("");
    const credit = localStorage.getItem("credit");
    const [recycledItems , setRecycledItems] = useState(0);

    const userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData);

    useEffect(() => {
        setUserName(userData?.userName);
        setEmail(userData?.user?.email);
    }, [])





    const navigate = useNavigate();

    const logout = () => {
       localStorage.removeItem("user");
        navigate("/")
    }

    useEffect(() => {
        
        console.log(User)
        console.log(userData?.isAdmin)

    }, [])

  return (
    <Wrapper>
    <div className='flex justify-center  my-[10vh] md:mx-0 mx-[5vw]'>
        <div className='h-fit w-fit shadow-3xl flex flex-col md:flex-row gap-[10vh] justify-center items-center px-10 py-10'>
            
            <div className='shadow-3xl w-fit p-4 rounded-lg'>
            {User?.isAdmin ? (<img src={admin} alt="" className='h-[20vh] md:h-[30vh]' />) : (<img src={profile} alt="" className='h-[20vh] md:h-[30vh]' />)}
                
            </div>
            <div className='flex flex-col gap-5 '>
                <div className='flex flex-col gap-5 mb-5 '>
                <div className='flex gap-5'>
                    <h2 className='text-xl text-[#F9F6EE] font-poppins font-semibold'>Profile </h2>
                    {userData?.isAdmin ? (<h2 className='text-xl font-poppins font-medium text-[#F9F6EE]'>Admin</h2>) : (<h2 className='text-xl text-[#F9F6EE] font-poppins font-medium'>User</h2>)}
                    
                </div>
                <div className='flex gap-5'>
                    <h2 className='text-xl text-[#F9F6EE] font-poppins font-semibold'>Name </h2>
                    <h2 className='text-xl text-[#F9F6EE] font-poppins font-medium'> {userName} </h2>
                </div>
                <div className='flex gap-5'>
                    <h2 className='text-xl text-[#F9F6EE] font-poppins font-semibold'>Email </h2>
                    <h2 className='text-xl text-[#F9F6EE] font-poppins font-medium'>{email}</h2>
                </div>
                <div className='flex gap-5'>
                    <h2 className='text-xl text-[#F9F6EE] font-poppins font-semibold'>Credit Points </h2>
                    <h2 className='text-xl text-[#F9F6EE] font-poppins font-medium'>{credit} </h2>
                </div>

                </div>
                <button
              className="shadow-3xl font-medium border-2 font-poppins px-4 py-2 bg-[#222222] rounded-md hover:bg-[#01796f]  transition-transform nav"
              onClick={() => logout()}
            >
              Logout
            </button>
            </div>
            
        </div>
    </div>
    </Wrapper>
  )
}

export default Profile