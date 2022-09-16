
module.exports = {
    ROUTES :{
        POST:{
            FEED :'/feed',
            INFO:"/allpostinfo",
            PAGE:"/pageinfo",
            SINGLEPAGE:"/singlepageinfo/:id",
            COMMENT:"/comment/:id/:pc_id",
            DELETECOMMENT:"/deletecomment/:id/:pc_id",
            PROFILE:"/pageprofile/:id"
        },
        USER:{
            SIGNUP:"/signup",
            LOGIN:"/login"

        },
        MESSAGES:{
            MESSAGE:"/message/:id",
            POSTMESSAGE:"/message",
            SENDER:"/sender/:id",
            CONVERSATIONS:"/conversations/:id/:c_id"
        }
    }
}