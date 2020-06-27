import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import './Logout.scss';

export default function Logout() {
  useEffect(() => {
    axios.post('/api/user/logout')
			.then(res => {
        console.log('success',res)
			}).catch(error => 
        console.log('error',error)
			);
  }, [])

  return (
    <>LOGGED OUT</>
  )
}