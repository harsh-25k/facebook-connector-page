const axios = require("axios")

module.exports = {

    async senderInfo(req,res){

        const {id} = req.params;

        let info = [];

        const PageAccessToken = await axios.get(`${process.env.GRAPH_API_URL}/${id}?fields=access_token&access_token=${process.env.LONG_LIVE_ACCESS_TOKEN}`);

        const {data} = await axios.get(`${process.env.GRAPH_API_URL}/me/conversations?fields=participants,messages{message,from,to,created_time},snippet&access_token=${PageAccessToken.data.access_token}`)

        for(let i=0;i<data.data.length;i++){
            for(let j=0;j<data.data[i].participants.data.length;j++){
                if(data.data[i].participants.data[j].id !== id){
                    try{
                        const participant =  await axios.get(`${process.env.GRAPH_API_URL}/${data.data[i].participants.data[j].id}?access_token=${PageAccessToken.data.access_token}`)
                        participant.data["conversation_id"] = data.data[i].id;
                        participant.data["snippet"] = data.data[i].snippet;
                        participant.data["message"] = data.data[i].messages.data.reverse();
                        info.push(participant.data);
                    }catch(err){
                        if(err.code == "ERR_BAD_REQUEST"){
                            continue;
                        }else{
                            console.log(err)
                        }
                    }
            }
        }
    }
    res.send(info)
    },
    async postMessage(req,res){
        // const PageAccessToken = await axios.get(`${process.env.GRAPH_API_URL}/${id}?fields=access_token&access_token=${process.env.LONG_LIVE_ACCESS_TOKEN}`);

        // const data = await axios.get(`${process.env.GRAPH_API_URL}/${c_id}/messages?fields=message,from,to,created_time&access_token=${PageAccessToken.data.access_token}`);

        // console.log(data);
        try{

            // const {id,ps_id} = req.params;

            const {inputMessage,id,ps_id} = req.body;
            console.log(inputMessage,id,ps_id)

            const PageAccessToken = await axios.get(`${process.env.GRAPH_API_URL}/${id}?fields=access_token&access_token=${process.env.LONG_LIVE_ACCESS_TOKEN}`);
            // const messageposted = await axios.post(`${process.env.GRAPH_API_URL}/${id}/messages?recipient={'id':${ps_id}}&messaging_type=RESPONSE&message={'text':${inputMessage}}&access_token=${process.env.PAGE_ACCESS_TOKEN}`)

            const messageposted = await axios.post(
                `${process.env.GRAPH_API_URL}/${id}/messages`,
                '',
                {
                    params: {
                        'recipient': `{\'id\':${ps_id}}`,
                        'messaging_type': 'RESPONSE',
                        'message': `{\'text\':\'${inputMessage}\'}`,
                        'access_token': `${PageAccessToken.data.access_token}`
                    }
                }
            );

            console.log(messageposted.data)
            res.send(true)

        }catch(err){
            console.log(err)
        }
     
       
    },

}