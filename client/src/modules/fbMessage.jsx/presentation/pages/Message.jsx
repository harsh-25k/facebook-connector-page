import React,{useEffect,useState} from "react";
import "../styles/MessageStyles.css";
import { AiFillMessage, AiFillSetting, AiOutlineSearch } from "react-icons/ai";
import { BsBarChartFill, BsClock, BsCalendarDateFill, BsMegaphoneFill, BsFillQuestionCircleFill, BsSliders, BsThreeDots, BsTable, BsEmojiSmile } from "react-icons/bs";
import { FaBars, FaBell, FaReact } from "react-icons/fa";
import { TbBrandMeta, TbMessageDots } from "react-icons/tb";
import { HiHome } from "react-icons/hi";
import { IoDocuments, IoSearchOutline, IoSend } from "react-icons/io5";
import { MdFeedback } from "react-icons/md";
import { FcCheckmark } from "react-icons/fc";
import ProfileImage from "../../../../assets/img/profile-image.png";
import { FiCheck } from "react-icons/fi";
import { BiCheck } from "react-icons/bi";
import { IoMdThumbsUp } from "react-icons/io";
import { ImAttachment } from "react-icons/im";

import axios from "axios";
import {useParams} from "react-router-dom";


const Message = () => {


    const {id} = useParams();
    
     const [SenderProfile,setSenderProfile] = useState([])

     const [conversationId,setConversationId] = useState()

    const getSenderProfile = ()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_PORT}sender/${id}`)
        .then(({data})=>{
          console.log(data);
          setSenderProfile(data);
          setConversationId(data[0].conversation_id);
        }).catch(err=>console.log(err));
      }
    
      const setConversations = (id)=>{
        setConversationId(id)
      }

      const [inputMessage, setInputMessage] = useState("")

      let ps_id;

      const handleMessage = (e) => {
        setInputMessage(e.target.value);
      }

      const submitMessage = (ps_id) => {
        console.log(ps_id, inputMessage)
        axios.post(`${process.env.REACT_APP_BACKEND_PORT}message`, {id, ps_id, inputMessage}).then(({data}) => {
            if(data){
                console.log("REACHED")
            }
        }      
        ).catch(err => console.log(err));
      }

    //   const [selectedConversation, setSelectedConversation] = useState();
    let selectedConversation;

      useEffect(()=>{ 
        getSenderProfile();
      },[])

  return (
    <div>
      <div className="main_container_message">
        <div className="first_section_message">
            <TbBrandMeta className="meta_icon_message" />
            <div className="logo_container_message">D</div>
            <div className="sidebar_icons_container_message">
                <HiHome className="sidebar_icon_message" />
                <FaBell className="sidebar_icon_message" />
                <AiFillMessage className="sidebar_icon_message" />
                <BsCalendarDateFill className="sidebar_icon_message" />
                <BsMegaphoneFill className="sidebar_icon_message" />
                <BsBarChartFill className="sidebar_icon_message" />
                <FaBars className="sidebar_icon_message" />
                <IoDocuments className="sidebar_icon_message" />
            </div>
            <div className="sidebar_bottom_icons_container_message">
                <BsFillQuestionCircleFill className="sidebar_icon_message" />
                <MdFeedback className="sidebar_icon_message" />
            </div>
        </div>

        <div className="second_section_message">
          <div className="second_top_section_message">
            <div className="second_top_left_section_message">
                <h3>Inbox</h3>
            </div>

            <div className="second_top_right_section_message">
                <button className="btn_primary_message">
                    <BsClock className="clock_icon_message" />
                    <p>Available</p>
                </button>

                <button className="btn_primary_message">
                    <FaReact className="react_icon_message" />
                    <p>Automations</p>
                </button>

                <button className="btn2_primary_message">
                    <AiFillSetting className="settings_icon_message" />
                </button>
            </div>
          </div>

          <div className="chat_container_message">
            <div className="chat_header_section_message">
                <div className="header_item_box_message active_header_item_box">
                    <p>All Messages</p>
                </div>

                <div className="header_item_box_message">
                    <p>Messenger</p>
                </div>

                <div className="header_item_box_message">
                    <p>Instagram Direct</p>
                </div>

                <div className="header_item_box_message">
                    <p>Facebook comments</p>
                </div>

                <div className="header_item_box_message">
                    <p>Instagram comments</p>
                </div>

                <div className="header_item_box_message">
                    <p>Chat Plugin</p>
                </div>
            </div>

            <div className="chat_main_box_message">

                {/* CHAT LIST */}
                <div className="chat_list_container_message">
                    <div className="chat_list_top_section_message">
                        <div className="chat_search_container_message">
                            <div className="chat_search_icon_container_message">
                                <IoSearchOutline className="chat_search_icon_message" />
                            </div>
                            <input type="text" placeholder="Search" />
                            <div className="chat_filter_icon_container_message">
                                <BsSliders className="chat_filter_icon_message" />
                            </div>
                        </div>
                        <p>Manage</p>
                    </div>

                    <div className="chat_list_bottom_section_message">
                                {
                                    SenderProfile.map((sender)=>(
                        <div className={conversationId === sender.conversation_id ? "chat_list_user_item_container_message active_user_item_message" : "chat_list_user_item_container_message"} key={sender.id} onClick={()=>setConversations(sender.conversation_id)}>
                                        
                            <div className="chat_list_user_item_left_section_message">
                                        <div className="chat_list_user_item_avatar_container_message">
                                        <img src={sender.profile_pic} alt="avatar" />
                                    </div>
    
                                    <div className="chat_list_user_item_details_section_message">
                                        <h4>{sender.first_name} {sender.last_name}</h4>
                                        <p>{sender.snippet}</p>
                                    </div>
                                 </div>
                                 <div className="chat_list_user_item_right_section_message">

                                <p>2:50 AM</p>
                                <BiCheck className="tick_icon_message" />
                            </div>
                        </div>
                                    ))
                                    }
                    </div>
                </div>

                
                {/* CHAT WINDOW */}
                {SenderProfile.forEach((element) => {
                    if(element.conversation_id === conversationId){
                        selectedConversation = element;
                        ps_id = element.id;
                    }
                })}

                {selectedConversation && (
                    <div className="chat_window_container_message">
                    <div className="chat_window_top_section_message">
                        <div className="chat_window_top_left_section_message">
                            <img src={selectedConversation.profile_pic} alt="profile" />
                            <h3>{selectedConversation.first_name}&nbsp;{selectedConversation.last_name}</h3>
                        </div>

                        <div className="chat_window_top_right_section_message">
                            <div className="chat_window_three_dots_container_message">
                                <BsThreeDots className="three_dots_icon_message" />
                            </div>
                        </div>
                    </div>

                    <div className="message_section_message">
                        <div className="message_top_section_message">
                            <p>1:50 AM</p>
                        </div>

                        <div className="message_middle_section_message">
                            {selectedConversation && selectedConversation.message.map((msg) => (
                                <>
                                {msg.from.id === id ? (
                                    <div className="message_container_type2_message" key={msg.id}>
                                        <div className="message_box_type2_message">
                                            <p>{msg.message}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="message_container_type1_message" key={msg.id}>
                                        <div className="message_box_type1_message">
                                            <p>{msg.message}</p>
                                        </div>
                                    </div>
                                )}
                                </>
                            ))}
                           
                        </div>

                        <div className="message_bottom_section_message">
                            <div className="input_container_message">
                                <div className="input_top_section">
                                    
                                    <input onChange={handleMessage} value={inputMessage} type="text" placeholder="Reply in Messenger..." />
                                    <IoSend onClick={() => submitMessage(ps_id)} className="send_icon_message" />
                                </div>

                                <div className="input_bottom_section">
                                    <div className="input_bottom_icon_container_message">
                                        <ImAttachment className="attach_icon_message" />
                                    </div>
                                    <div className="input_bottom_icon_container_message">
                                        <TbMessageDots className="attach_icon_message" />
                                    </div>
                                    <div className="input_bottom_icon_container_message">
                                        <BsEmojiSmile className="attach_icon_message" />
                                    </div>
                                    <div className="input_bottom_icon_container_message">
                                        <BsTable className="attach_icon_message" />
                                    </div>
                                    <div className="input_bottom_icon_container_message">
                                        <IoMdThumbsUp className="attach_icon_message" />
                                    </div>
                                </div>
                            </div>
                        </div>
                                
 
                    </div>
                </div>
                )}
                

            </div>
          </div>
        </div>

        <div className="third_section_message">
            <div className="third_section_box_message">
                
            </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
