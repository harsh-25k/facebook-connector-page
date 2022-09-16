import React,{useState,useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import axios from "axios"

const AccountPages = () => {

  const [allPagesInfo,setAllPagesInfo] = useState([])

  useEffect(()=>{

    const allPagesInfo = ()=>{
      axios.get(`${process.env.REACT_APP_BACKEND_PORT}pageinfo`).then(({data})=>{
        setAllPagesInfo(data)
      })
    }
    allPagesInfo()
  },[])

  return (
    <div>
      <Sidebar allPagesInfo={(allPagesInfo === undefined)?"":allPagesInfo}/>
    </div>
  )
}

export default AccountPages
