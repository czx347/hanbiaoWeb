import axios from 'axios'

function hanbiao(hanma, password, r, that){
    // const that = this;
    let msg;
    let access_token;
    let promise = new Promise(function(resolve){
        that.$axios.get('/hanbiao/cgi-bin/token?grant_type=client_credential&appid=wx9cd72b9af9832da4&secret=8f4b6bdf77812948bcafa65f955e39b6')
            .then(res =>  {
                access_token = res.data.access_token;
                // console.log(res)
                // console.log(access_token)
                resolve()

            })
            .catch(e => console.log(e))
    });
    promise.then(() => {
        that.$axios.post(
            '/hanbiao/tcb/invokecloudfunction?access_token='+ access_token +'&env=hanbiao-1gw0ey627f4805b5&name=getAllRequest',
            {
                // access_token: access_token,
                // env:'hanbiao-1gw0ey627f4805b5',
                // name:'getAllRequest',
                hanma:hanma,
                password:password
            })
            .then(res =>  {
                let resp_data = res.data.resp_data
                // console.log(res.data)
                // console.log(resp_data)
                let obj = JSON.parse(resp_data);
                // msg = obj;
                // console.log(obj)
                r(obj)
                // return obj;
            })
            .catch(e => console.log(e))
    });

}

export default hanbiao;