import React from 'react'
import { useSelector } from 'react-redux'

export default function Login() {
    const host = useSelector(state => state.State.host)
  return (
    <div className='flex h-screen w-full'>
        <div className='bg-gray-800 flex flex-col justify-center p-3 w-[30vw]'>
            <form className='max-w-[400px] w-full mx-auto rounded-lg bg-darkslateblue p-8 px-8'>
                <div className='flex items-center justify-center'>
                    <img src={`${host}/uploads/logo_e4ee97606d.png`} alt=''></img>
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>نام کاربری</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" />
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>رمز عبور</label>
                    <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" />
                </div>
                <div className='flex justify-between text-gray-400 py-2'>
                    <p className='flex items-center'><input className='mr-2' type="checkbox" /> مرا به خاطر بسپار</p>
                </div>
                <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>ورود</button>
                
            </form>
        </div>
        <div className='sm:hidden sm:block w-[70vw]'>
            <img className=' h-full object-cover' src={`${host}/uploads/5172658_dab0e2e822.jpg`} alt="" />
        </div>
    </div>
  )
}
