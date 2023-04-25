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
   
      #swagger.responses[200] = {
        description : '친구 리스트를 반환합니다.',
        schema:{
            friendList : [{email:'친구 이메일',nickName:"별명" ,profil:"URL"},{email:'친구이메일2',nickName:"닉네임",profile:"URL"}]
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
       
        #swagger.responses[200] = {
          description : '친구요청대기 리스트를 반환합니다.',
          schema:{
              requestList : [{email:'친구 이메일',nickName:"별명" ,profil:"URL"},{email:'친구이메일2',nickName:"닉네임",profile:"URL"}]
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
            email : "유저 이메일"
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

export default router;
