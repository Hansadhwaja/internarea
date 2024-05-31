import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Feature/Userslice'
import axios from 'axios';
import { Link } from 'react-router-dom';
import profileImage from '../../Assets/org.png'

const History = () => {
  const user = useSelector(selectUser);
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(`https://internarea.onrender.com/api/history`, {

    })
      .then((response) => {
        const result = response.data;
        setData(result)
      })
      .catch(error => console.error('Error:', error));
  }, [])

  return (
    <div className='m-3 p-3 border-2  rounded-xl'>
      <div>
        <h1 className='text-4xl font-bold text-center'>Login History</h1>
      </div>
      <Link to={'/profile'} className='w-12'>
        <img src={user?.photo || profileImage} alt='' className='rounded-full' />
      </Link>
      <div>
        {data.map((item,index) => (user.uid === item.uid) ? (
          <div className='w-fit flex flex-col gap-3 rounded-xl border-2 p-2 shadow-xl mt-5' key={index}>
            <p>UID: {item.uid}</p>
            <p>IP Address: {item.IPAddress}</p>
            <p>Browser: {item.browser}</p>
            <p>OS: {item.os}</p>
            <p>Loggedin At: {item.createdAt}</p>
          </div>

        ) : (
          ''
        ))}
      </div>
    </div>
  )
}

export default History