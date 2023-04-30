import { Router } from "express";

const router = Router();

router.get(
  "/login",
  () => {}

  /*
 #swagger.summary = "로그인 socket 통신"
 #swagger.description = '**socket connection 연결 및 친구리스트를 리턴 받습니다** <br/> flutter endpoint는 미정입니다.
 '
 #swagger.responses[200] ={
    description : '정상적으로 connection 연결시.. 단,fornt에서 endPoint 가 정해지면 가능함',
   schema :{
      data :{
         friendList :[
            {
               nickName : '철수',
               email : "이메일",
               profile : "URL",
               latitude : "위도",
               longitude : "경도",
               battery : "베터리",
               speed : "속도"

            }
         ]
      }
   }

 }
*/
);

router.get(
  "/log-out",
  () => {}
  /*
                  #swagger.summary = "로그아웃 API"
                  #swagger.description = '
                  ** 로그아웃 api ** <br/>
                  로그아웃시 강제로 socket connection이 끊김'
                  #swagger.responses[200] = {
                      schema:{
                          error : false,
                          message : 'SUCCESS'
                      }
                  } 
          
                  #swagger.responses[400] = {
                      description : '잘못된 데이터 전송 또는 접근으로 인한 오류 반환',
                      schema:{
                          error: true,
                          message : "잘못된 접근입니다."
                      }
                  }
                  #swagger.responses[500] = {
                      description : '서버 내부의 문제 발생',
                      schema:{
                          error : true,
                          message : "알수없은 문제 발생. 잠시후 다시 실행해주세요."
                      }
                  }
            
            */
);
router.delete(
  "/deleteFriend",
  () => {}
  /*
     #swagger.summary = "친구 삭제 기능" 
     #swagger.description = '
     ** 친구리스트에서 친구 삭제를 담당하는 API입니다 ** <br/>
     친구 삭제시 내룸,친구룸 모두 퇴장됩니다.
     '
     #swagger.parameters['obj']= {
         in : 'body',
         name : 'body',
         description : '친구 email',
         required: true,
         schema:{
             email : "친구 email"
         }
     }
     #swagger.responses[200] ={
         description : '친구 삭제 완료',
         schema:{
         error: false,
         message :"SUCCESS"
         }
     }
     */
);

router.post(
  "/setRequest",
  () => {}
  /*
     #swagger.summary = "요청 대기중인 친구 수락/거절 API"
     #swagger.description = '
     ** 요청 대기중인 친구를 수락/거절을 결정하는 API입니다 ** <br/>
     친구 수락시 나에게 친구 정보를 보내는 endPoint 필요합니다.(미완)
     '
     #swagger.parameters['obj']= {
         in : 'body',
         name : 'body',
         description : '친구 email, 수락(true)/거절(false)',
         required: true,
         schema:{
             email : "친구 email",
             answer : true
            }
        }
     #swagger.responses[200] = {
            description : "
            친구 수락시\n
                ```
                data:{
                    nickName : '철수',
                    email : '이메일',
                    profile : 'URL',
                    latitude : '위도',
                    longitude : '경도',
                    battery : '베터리',
                    speed : '속도',
                }
                ```\n\n
            거절시\n
                ```
                data:{
                ....음 이부분은 어떻게 보내주는게 편한지 회의해보기
                }
                ```
         ",
        }
     */
);

router.put(
  "/sendLocation",
  () => {}

  /*
     #swagger.summary = "내위치 전송 통신"
     #swagger.description = '**내 정보를 전송하고, 내 룸에 있는 친구들에게 브로드케스트 통신을 전송합니다.**
     '
    #swagger.parameters['obj']= {
                in : 'body',
                name : 'body',
                discription: '변경할 비밀번호 데이터 전송',
                required : true,
                schema:{
                    data :{
                        latitude : '위도',
                        longitude : '경도',
                        battery : '베터리',
                        speed : '속도',
                    }
                    
                }
        }
     #swagger.responses[200] =  {
        description : ' fornt에서 endPoint 가 정해지면 가능함',
        schema :{
               data :{
                        latitude : '위도',
                        longitude : '경도',
                        battery : '베터리',
                        speed : '속도',
                    } 
            }
    
        }
    */
);

export default router;
