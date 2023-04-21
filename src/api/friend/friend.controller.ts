import Router from "express";
import friendCtrl from "./friend.ctrl";
const router = Router();

router.get(
  "/list",
  friendCtrl.get.friendList

  /*
      #swagger.summary = "친구 리스트 불러오기 API (테스팅)"
      #swagger.description = '
      ** 친구리스트를 전송해주는 API 입니다. **'
      #swagger.parameters['obj']= {
        required : false,
      }
      
      #swagger.responses[200] = {
        description : '친구 리스트를 반환합니다.',
        schema:{
            friendList : [{email:'친구 이메일','nickName':"별명" },{email:'친구이메일2',"nickName":"닉네임"}]
        }
    
    }

*/
);

router.get(
  "/request-list",
  friendCtrl.get.requestList
  /*
        #swagger.summary = "친구요청대기 리스트 불러오기 API (테스팅)"
        #swagger.description = '
        ** 친구요청대기 리스트를 전송해주는 API 입니다. **'
        #swagger.parameters['obj']= {
          required : false,
        }
        
        #swagger.responses[200] = {
          description : '친구요청대기 리스트를 반환합니다.',
          schema:{
              requestList : [{email:'친구 이메일', } ]
          }
      
      }
  
  */
);

router.post(
  "/request",
  friendCtrl.post.request
  /*
    #swagger.summary = "친구 신청 API (테스팅)"
    #swagger.description = '
    ** 친구 신청을 담당하는 API입니다 **<br/><br/>
    1. 친구요청 방법은 링크,QR 코드로 초대 가능합니다.
    '
    #swagger.parameters['obj']= {
        in : 'body',
        name : 'body',
        description : '친구 신청 타입',
        required: true,
        schema:{
            type : "QR OR link"
        }
    }

    #swagger.responses[200] ={
        description : 'QR/link로 해당 친구를 찾아 정상적인지 아닌지를 반환한다.
        1. 정상적인 유저\n
        ```
            {
                error: false,
                message : "SUCCESS"
            }
        ```/n/n
        2. 존재하지 않는 유저\n
        ```
            {
                error:true,
                message :"존재하지 않는 친구입니다."
            }
        ```
        ',
    }
    #swagger.responses[400] ={
        description : '잘못된 QR 또는 링크 전송시 에러 반한합니다.',
        schema:{
            error: true,
            message : "잘못된 QR 또는 링크입니다. 확인 후 다시 시도바랍니다."
        }

    }
*/
);

router.delete(
  "/",
  () => {}
  /*
    #swagger.summary = "친구 삭제 API (미완) ㅣ socket 통신으로 로직 예상중" 
    #swagger.description = '
    ** 친구리스트에서 친구 삭제를 담당하는 API입니다 **
    '
    #swagger.parameters['obj']= {
        in : 'body',
        name : 'body',
        description : '친구 email',
        required: true,
        schema:{
            friendEmail : "친구 email"
        }
    }
    #swagger.responses[200] ={
        description : '친구 삭제 완료',
        schema:{
        error: false,
        message :"SUCCESS"
        }
    }
    #swagger.responses[400] ={
        description : '잘못된 접근',
        schema:{
            error: true,
            message : "잘못된 접근입니다."
        }

    }
    #swagger.responses[500] ={
        description : '서버 내부 문제',
        schema:{
            error: true,
            message : "잘못된 접근입니다."
        }
    }
    */
);

router.put(
  "/request-list",
  () => {}
  /*
    #swagger.summary = "요청 대기중인 친구 수락/거절 API (미완) | socket통신으로 로직 예상즁.."
    #swagger.description = '
    ** 요청 대기중인 친구를 수락/거절을 결정하는 API입니다 **
    '
    #swagger.parameters['obj']= {
        in : 'body',
        name : 'body',
        description : '친구 email, 수락(true)/거절(false)',
        required: true,
        schema:{
            friendEmail : "친구 email",
            isDecision : true
        }
    }

    #swagger.responses[200] ={
        description : '친구 삭제 완료',
        schema:{
        error: false,
        message :"SUCCESS"
        }
    }
    #swagger.responses[400] ={
        description : '잘못된 접근',
        schema:{
            error: true,
            message : "잘못된 접근입니다."
        }

    }
    #swagger.responses[500] ={
        description : '서버 내부 문제',
        schema:{
            error: true,
            message : "잘못된 접근입니다."
        }
    }
    */
);

export default router;
