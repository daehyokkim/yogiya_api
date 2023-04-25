import Router from "express";

const router = Router();

router.get(
  "/",
  () => {}
  /*
        #swagger.summary = "내정보 반환 API --> 내정보를 반환하는 API 필요할지.. 고민돼요.."
        #swagger.description = '
        ** 내정보를 반환하는 API 입니다. **'
        #swagger.parameters['obj']= {
          required : false,
        }
        
        #swagger.responses[200] = {
            description : '내정보 반환하기',
            schema:{
                error: false,
                data:{
                    nickName : '짱구',
                    profile : 'https://cloudinary.com/xxxxxxx..',
                    info : '필요한거..???',
                }
            }
        }
        #swagger.responses[400] = {
            description : '잘못된 접근..',
            schema :{
                error: true,
                message : "잘못된 접근입니다."
            }
        }
        #swagger.responses[500] = {
            description : '서버 문제.. ',
            schema :{
                error:true,
                message : "잘못된 접근입니다."
            }
        }
  */
);

router.put(
  "/password",
  () => {}
  /*
            #swagger.summary =  비밀번호 변경 API (미완)"
            #swagger.description = '
            ** 내 비밀번호 정보를 변경하는 API 입니다. **'
            #swagger.parameters['obj']= {
                in : 'body',
                name : 'body',
                discription: '변경할 비밀번호 데이터 전송',
                required : true,
                schema:{
                    password : '변경할 비밀번호'
                }
            }
            
            #swagger.responses[200] = {
                description : '정상적으로 비밀번호 변경 완료',
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

router.get(
  "/log-out",
  () => {}
  /*
                #swagger.summary = "로그아웃 API (미완)"
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
  "/",
  () => {}
  /*
          #swagger.summary = "회원 탈퇴 API (미완)"
          #swagger.description = '
          ** 회원탈퇴 API 입니다. **'
          #swagger.parameters['obj']= {
            required : false,
          }
          
          #swagger.responses[200] = {
              description : '탈퇴 성공... DB제거',
              schema:{
                  error: false,
                  message : "SUCCESS"
              }
          }
          #swagger.responses[400] = {
              description : '잘못된 접근..',
              schema :{
                  error: true,
                  message : "잘못된 접근입니다."
              }
          }
          #swagger.responses[500] = {
              description : '서버 문제.. ',
              schema :{
                  error:true,
                  message : "잘못된 접근입니다."
              }
          }
    */
);
export default router;
