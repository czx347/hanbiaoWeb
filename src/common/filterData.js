import {timeStamp} from "assets/js/base.js"
function filterData(data, startTime, endTime, state, versions)
{

    startTime = startTime || new Date(2021,1,1,0,0,0);
    endTime = endTime || new Date();
    state = state|| [2,3,4];
    versions = versions === undefined ? data.list.length - 1: versions

    let result = {
        userNumb: 0,
        requestNumb: 0,
        question: [],
        versionsNumber: 0,
    }

    result.versionsNumber = data.list.length;

    data = data.list[versions];
    const detail = data.detail.filter((e) => {
        let time = new Date(e.request[0].req_time);
        let isState = state.indexOf(e.req_state);
        if(time >= startTime && time <= endTime && e.req_state && isState > -1)
        {
            return true
        }
    })

    result.requestNumb = detail.length;

    let answer = [];
    data.formS_style.forEach((e) => {
        if(e.formS_type == '单选' || e.formS_type == '多选'){
            let tempOption = {};
            e.formS_detail.forEach((eD) =>{
                tempOption[eD] = 0;
            })
            answer.push(tempOption);
        }else {
            answer.push([]);
        }
        let tempQuestion = {
            title: e.formS_title,
            type: e.formS_type,
        }
        result.question.push(tempQuestion)
    })

    let user = [];
    detail.forEach((e, i) => {
        user.push(e.request[0].user_id);
        e.reqD_inform.forEach((eI, iI) => {
            let tempAnswer;
            if(eI.reqD_type == '短文本(主标题)'){
                tempAnswer = {
                    detail: eI.reqD_detail,
                    user: e.request[0].user[0].user_name,
                    time: timeStamp(true, new Date(e.request[0].req_time)),
                    state: changeState(e.req_state),
                }
                answer[iI][i] = tempAnswer;
            }else if (eI.reqD_type == '短文本' ||eI.reqD_type == '长文本' ){
                tempAnswer = {
                    detail: eI.reqD_detail,
                    user: e.request[0].user[0].user_name,
                }
                answer[iI][i] = tempAnswer;
            }else if(eI.reqD_type == '单选') {
                eI.reqD_detail.some((eD) => {
                    if(eD.checked === true){
                        answer[iI][eD.value] ++;
                        return true;
                    }
                })
            } else if(eI.reqD_type == '多选') {
                eI.reqD_detail.forEach((eD) => {
                    if(eD.checked === true){
                        answer[iI][eD.value] ++;
                    }
                })
            }else {
                tempAnswer = eI.reqD_detail;
                answer[iI][i] = tempAnswer;
            }
        })
    })

    answer.forEach((e, i) => {
        result.question[i].detail = e;
    })


    user = uniq(user)

    result.userNumb = user.length;
    return result;
}

function changeState(state){
    if(state === 3){
        return "驳回"
    }else if(state === 4){
        return "通过"
    }else {
        return "未审核"
    }
}

function uniq(array){
    let temp = [];
    array.forEach((e, i, a) => {
        if(a.indexOf(e) == i){
            temp.push(e)
        }
    })
    return temp;
}

export default filterData;