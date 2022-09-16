import React,{useState,useEffect} from 'react';
import "../styles/PostsStyles.css";
import { GoGlobe } from "react-icons/go";
import { BsEmojiSmile, BsFillCaretDownFill, BsThreeDots } from "react-icons/bs";
import ProfileImage from "../../../../assets/img/profile-image.png";
import LikeImage from "../../../../assets/img/like-image.svg"
import { RiShareForwardLine } from "react-icons/ri";
import { BiLike } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";
import { MdGif } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import ParentComment from '../../../../shared/widgets/jsx/ParentComment';
import axios from 'axios';
import {useParams} from "react-router-dom" 

const Posts = ({SinglePageInfo,callSinglePageInfo,profileInfo}) => {
  const [commentMsg, setCommentMsg] = useState("");

  const {id} = useParams();

  console.log(id)

  const changeCommentMsg = (e) => {
    setCommentMsg(e.target.value);
  }

  const submitCommentMsg = (pc_id) => {
    setCommentMsg("");
    axios.post(`${process.env.REACT_APP_BACKEND_PORT}comment/${id}/${pc_id}`,{commentMsg}).then(({data})=>{
      if(data){
        console.log("Calling ...")
        callSinglePageInfo();
        console.log("Calling After...")

      }
    })
  }

  return (
    <div>
      <div className='main_container_posts'>
          <div className='main_box_posts'>
            <div className='posts_container_posts'>
              <div className='posts_box_posts'>
              {SinglePageInfo.map((post) => (
                <div className='post_main_container_posts' key={post.id}>
                  <div className='post_upper_section_posts'>
                    <div className='post_upper_left_section_posts'>
                      <div className='post_upper_left_logo_section_posts'>
                        <img src={profileInfo.url} alt="profile-pic" />
                      </div>
                      <div className='post_upper_left_detail_section_posts'>
                        <div className='post_upper_left_top_section_posts'>
                          <h4>{profileInfo.name}</h4>
                        </div>
                        <div className='post_upper_left_bottom_section_posts'>
                          <p>{post.created_time}</p>
                          <GoGlobe className="globe_icon_posts" />
                        </div>
                      </div>
                    </div>
                    <div className='post_upper_right_section_posts'>
                      <div className='post_upper_right_dots_container_posts'>
                        <BsThreeDots className='three_dots_icon_posts' />
                      </div>
                    </div>
                  </div>
  
                  <div className='post_middle_section_posts'>
                    <div className='post_middle_top_section_posts'>
                      {post.message && (
                        <p>{post.message}</p>
                      )}
                      {/* <a href='https://www.amazon.in/b?ie=UTF8&node=976460031'>https://www.amazon.in/b?ie=UTF8&node=976460031</a> */}
                    </div>
                    <div className='post_middle_bottom_section_posts'>
                    {(post.full_picture === undefined)?"":<img src={post.full_picture} alt="post" />}
                    </div>
                  </div>

                  <div className='post_lower_section_posts'>
                  <div className='post_lower_top_section_posts'>
                    <div className='post_lower_top_first_section_posts'>
                      <div className='post_lower_top_first_left_section_posts'>
                        <img src={LikeImage} alt='like' />
                        <p>Divya Nayak and 56 others</p>
                      </div>
                      <div className='post_lower_top_first_right_section_posts'>
                        <p>73 Comments 1 Share</p>
                      </div>
                    </div>
                    <div className='line_posts'></div>
                    <div className='post_lower_top_second_section_posts'>
                      <button className='btn_social_container_posts'>
                        <BiLike className='btn_social_icons_posts' />
                        <p>Like</p>
                      </button>
                      <button className='btn_social_container_posts'>
                        <FaRegCommentAlt className='btn_social_icons_posts' />
                        <p>Comment</p>
                      </button>
                      <button className='btn_social_container_posts'>
                        <RiShareForwardLine className='btn_social_icons_posts' />
                        <p>Share</p>
                      </button>
                    </div>
                    <div className='line_posts'></div>
                  </div>

                  <div className='post_lower_bottom_section_posts'>
                    <div className='post_lower_bottom_first_section_posts'>
                      <p>Most Relevant</p>
                      <BsFillCaretDownFill className='click_down_icon_posts' />
                    </div>

                    <div className='post_lower_bottom_second_section_posts'>
                      <div className='comments_section_posts'>
                        {/* INPUT COMMENT */}
                        <div className='write_comment_container_posts'>
                          <div className='write_comment_left_section_posts'>
                            <img src={profileInfo.url} alt='person' />
                          </div>

                          <div className='write_comment_right_section_posts'>
                            <div className='type_comment_container_posts'>
                              <div className='type_comment_box_posts'>
                                <input type="text" placeholder='Write a comment...' value={commentMsg} onChange={changeCommentMsg} />
                                <div className='type_icon_container_posts'>
                                  <div className='type_icon_box_posts'>
                                    <BsEmojiSmile className="type_icon_posts" />
                                  </div>
                                  <div className='type_icon_box_posts'>
                                    <FiCamera className="type_icon_posts" />
                                  </div>
                                  <div className='type_icon_box_posts'>
                                    <MdGif className="type_icon_posts" />
                                  </div>
                                </div>
                              </div>

                              <IoSend onClick={()=>submitCommentMsg(post.id)} className="send_icon_posts" />
                            </div>
                            <p className='press_para_posts'>Press Enter to post.</p>
                          </div>
                        </div>


                        {/* COMMENT */}

                        {(post.comments === undefined) ? "" 
                        : (post.comments.data.map((comment)=>(
                          <ParentComment comment={comment} callSinglePageInfo={callSinglePageInfo} profileInfo={profileInfo}/>
                        )))}
                        
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              ))}
                

                
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Posts;
