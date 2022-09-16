const axios = require("axios")

module.exports = {

    async pageProfile(req,res){

        const {id} = req.params;
      
       const PageAccessToken = await axios.get(`${process.env.GRAPH_API_URL}/${id}?fields=access_token&access_token=${process.env.LONG_LIVE_ACCESS_TOKEN}`);

      
       const data = await axios.get(`${process.env.GRAPH_API_URL}/me?fields=picture%2Cname%2Cfollowers_count&access_token=${PageAccessToken.data.access_token}`);

       res.send(data.data);

    },
    async allPagesInfo(req, res) {
        try {

            let allpagesInfo = []
            
            const allPagesInfo = await axios.get(`${process.env.ALL_PAGES_INFO}&access_token=${process.env.LONG_LIVE_ACCESS_TOKEN}`)

            for(let i=0;i<allPagesInfo.data.data.length;i++){
                try{

                    const allPostInfo = await axios.get(`${process.env.GRAPH_API_URL}/${allPagesInfo.data.data[i].id}?fields=name,unread_notif_count,unread_message_count,category,picture&access_token=${allPagesInfo.data.data[i].access_token}`)

                    allpagesInfo = [...allpagesInfo,allPostInfo.data];

                }
                catch(err){
                    console.log(err)
                }  
            }

            res.send(allpagesInfo)

        } catch (err) {
            console.log(err)
        }

    },
    async allPostInfo(req, res) {
        try {

            const PageAccessToken = await axios.get(`${process.env.GRAPH_API_URL}/${id}?fields=access_token&access_token=${process.env.LONG_LIVE_ACCESS_TOKEN}`);

            const allPostInfo = await axios.get(`${process.env.GRAPH_API_URL}?fields=full_picture,message,comments,likes,shares&access_token=${PageAccessToken.data.access_token}`)

            res.send(allPostInfo.data)

        } catch (err) {
            console.log(err)
        }

    },
    async singlePagesInfo(req,res){
        try{

            const {id} = req.params;

            const PageAccessToken = await axios.get(`${process.env.GRAPH_API_URL}/${id}?fields=access_token&access_token=${process.env.LONG_LIVE_ACCESS_TOKEN}`);

            const singlepageinfo = await axios.get(`${process.env.GRAPH_API_URL}/${id}/feed?fields=full_picture,created_time,message,comments{created_time,from,message}
            &access_token=${PageAccessToken.data.access_token}`)

           res.send(singlepageinfo.data.data)

        }catch(err){
           console.log(err)
        }
    },
    async postComment(req,res){
        try{

            const {id,pc_id} = req.params;

            const {commentMsg} = req.body;
            
            const PageAccessToken = await axios.get(`${process.env.GRAPH_API_URL}/${id}?fields=access_token&access_token=${process.env.LONG_LIVE_ACCESS_TOKEN}`);

            const singlepageinfo = await axios.post(`${process.env.GRAPH_API_URL}/${pc_id}/comments/?access_token=${PageAccessToken.data.access_token}&message=${commentMsg}`)

            res.send(true)

        }catch(err){
           console.log(err)
        }
    },
    async deleteComment(req, res){
         
        try{
        
            const {id,pc_id} = req.params;

            const PageAccessToken = await axios.get(`${process.env.GRAPH_API_URL}/${id}?fields=access_token&access_token=${process.env.LONG_LIVE_ACCESS_TOKEN}`);
        
            await axios.delete(`${process.env.GRAPH_API_URL}/${pc_id}?access_token=${PageAccessToken.data.access_token}`);
            
            res.send({message : "true"});
        }catch(err){
            console.log(err)
        }
    }
}


