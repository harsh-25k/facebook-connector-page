import './App.css';
import axios from 'axios';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState } from 'react';
import AccountPages from './modules/fbPage/presentation/pages/AccountPages';
import SinglePage from './modules/fbPage/presentation/pages/SinglePage';
import Register from './modules/user/presentation/pages/Register';
import Login from './modules/user/presentation/pages/Login';
import Message from './modules/fbMessage.jsx/presentation/pages/Message';
import Navbar from './shared/widgets/jsx/Navbar';

const App = () => {

  const [allcomments,setAllComments] = useState([])

  const [allmessages,setPostMessages] = useState([])

  const postMessages = ()=>{
    axios.post(`${process.env.REACT_APP_BACKEND_PORT}message/108046888706313/8628821597129716`,{
      message:"Demo Message !"
    }).then(({data})=>{
      setAllComments(data)
    })
  }


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Register />} />
        <Route exact path="/login" element={<Login />} /> 
        <Route exact path='/pages' element={<AccountPages />} />
        <Route exact path='/page/:id' element={<SinglePage />} />
        <Route exact path="/message/:id" element={<Message />} />
      </Routes>
    </BrowserRouter>

    {/* <Navbar /> */}
    {/* <button onClick={getComments}> Get Message </button> */}

    {/* <button onClick={postMessages}> Post Message </button> */}

    {/* <button onClick={printComment}> Single Comments </button> */} 
    {/* {
         (allcomments === undefined)?"":(
        allcomments.map((comment)=>(
          // console.log(comment.id)
          <>
          <div key={comment.id}>
          <img src={comment.full_picture}/>
          <p>{comment.message}</p>
          </div>
         
          </>
        )))
    } */}

    </>
  )
}

export default App;
