let access_token;
const env = 'hanbiao-1gw0ey627f4805b5'
const appid = 'wx9cd72b9af9832da4'
const secret = '8f4b6bdf77812948bcafa65f955e39b6'

function hanbiao(hanma, password, r, that){
    let promise = new Promise(function(resolve){
        that.$axios.get('/hanbiao/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret='+secret)
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
            '/hanbiao/tcb/invokecloudfunction?access_token='+ access_token +'&env=' + env + '&name=getAllRequest',
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

function getImages(images, r, that) {
  const max_age = 7200;
  let fileid = [];
  images.forEach((e) => {
    fileid.push({
      "fileid": e,
      "max_age":max_age
    })
  })
  let promise = new Promise(function(resolve){
    that.$axios.get('/hanbiao/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret='+secret)
      .then(res =>  {
        access_token = res.data.access_token;
        resolve()
      })
      .catch(e => console.log(e))
  });
  promise.then(() => {
    that.$axios.post(
      '/hanbiao/tcb/batchdownloadfile?access_token='+ access_token,
      {
        "env": env,
        "file_list": fileid,
  })
      .then(res =>  {
        // console.log(res)
        let file_list = res.data.file_list
        // let obj = JSON.parse(resp_data);
        r(file_list)
      })
      .catch(e => console.log(e))
  });
}

export {hanbiao, getImages} ;