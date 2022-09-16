import React from 'react';
import "../styles/PagesContainerStyles.css";
import { HiOutlineBell } from "react-icons/hi";
import { GoCommentDiscussion } from "react-icons/go";
import { AiOutlineUserSwitch } from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import ProfileImage from "../../../../assets/img/profile-image.png"

const PagesContainer = ({allPagesInfo}) => {

    const navigate = useNavigate();

  return (
    <div>
      <div className='main_container_pagescontainer'>
        <h3>Pages and profiles you manage</h3>
        <div className='main_box_pagescontainer'>
    {
        (allPagesInfo === undefined)?"":(
            allPagesInfo.map((page)=>(
             <div className='page_container_pagescontainer' key={page.id}>
        <div className='page_details_section_pagescontainer'>
        <div className='page_details_left_section_pagescontainer'>
            <img src={page.picture.data.url} alt="profile" />
        </div>

        <div className='page_details_right_section_pagescontainer'>
            <div className='page_details_right_top_section_pagescontainer'>
                <h3>{page.name}</h3>
            </div>

            <div className='page_details_right_bottom_section_pagescontainer'>
                <div className='page_details_icon_container_pagescontainer'>
                    <HiOutlineBell className="page_details_icon_pagescontainer" />
                    <p>{page.unread_notif_count} notification</p>
                    <div className='blue_dot_pagescontainer'></div>
                </div>

                <div className='page_details_icon_container_pagescontainer'>
                    <GoCommentDiscussion className="page_details_icon_pagescontainer" />
                    <p>Messages {page.unread_message_count}</p>
                </div>
            </div>
        </div>
    </div>
    <button className='btn_switch_pagescontainer' onClick={()=>navigate(`/page/${page.id}`)}>
                    <AiOutlineUserSwitch className="switch_icon_pagescontainer" />
                    <p>Switch Now</p>
                </button>
     </div>
    )))
    }
    </div>
      </div>
    </div>
  )
}

export default PagesContainer
