import React from 'react';
import "../styles/PageBannerStyles.css";
import { BsSearch, BsMessenger, BsThreeDots } from "react-icons/bs";
import { IoMdThumbsUp } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';

const PageBanner = ({profileInfo}) => {

    const navigate = useNavigate();
    const {id} = useParams()
 
  return (
    <div>
      <div className='main_container_pagebanner'>
        <div className='main_box_main_pagebanner'>
          <div className='main_box_top_section_pagebanner'>
            <div className='page_detail_upper_section_pagebanner'>
            </div>

            <div className='page_detail_lower_section_pagebanner'>
                <div className='page_detail_lower_left_section_pagebanner'>
                {profileInfo && <img src={profileInfo.url} alt="profile" />}
                </div>

                <div className='page_detail_lower_right_section_pagebanner'>
                    <div className='page_info_section_pagebanner'>
                        <div className='page_info_top_section_pagebanner'>
                            <h3>{profileInfo.name}</h3>
                        </div>

                        <div className='page_info_top_section_pagebanner'>
                            <p>2 likes</p>
                            <div className='dot_pagebanner'></div>
                            <p>{profileInfo.followers} followers</p>
                        </div>
                    </div>

                    <div className='page_button_section_pagebanner'>
                        <button className='btn_light_pagebanner'>
                            <IoMdThumbsUp className="thumbs_up_icon_pagebanner" />
                            <p>Like</p>
                        </button>
                        <button className='btn_dark_pagebanner' onClick={() => navigate(`/message/${id}`)}>
                            <BsMessenger className="message_icon_pagebanner" />
                            <p>Message</p>
                        </button>
                        <button className='btn_light_pagebanner'>
                            <BsSearch className="search_icon_pagebanner" />
                            <p>Search</p>
                        </button>
                    </div>
                </div>
            </div>
          </div> 

          <div className='main_box_bottom_section_pagebanner'>
            <div className='line_pagebanner'></div>

            <div className='tabs_container_pagebanner'>
                <div className='tabs_left_section_pagebanner'>
                    <div className='tab_box_pagebanner active_tab_pagebanner'>
                        <p>Posts</p>
                    </div>
                    <div className='tab_box_pagebanner'>
                        <p>About</p>
                    </div>
                    <div className='tab_box_pagebanner'>
                        <p>Mentions</p>
                    </div>
                    <div className='tab_box_pagebanner'>
                        <p>Reviews</p>
                    </div>
                    <div className='tab_box_pagebanner'>
                        <p>Followers</p>
                    </div>
                    <div className='tab_box_pagebanner'>
                        <p>Photos</p>
                    </div>
                </div>

                <div className='three_dots_container_pagebanner'>
                    <BsThreeDots className='three_dots_icon_pagebanner' />
                </div>
            </div>
          </div>  
        </div>
      </div>
    </div>
  )
}

export default PageBanner
