import { Router } from "express";
import signCtrl from "./sign.ctrl.js";
const router = Router();

router.post(
  "/up",
  signCtrl.post.sign_up
  /*
    #swagger.summary = "회원가입 API"
    #swagger.description = '
    ** 구글이메일 혹은 간편회원의 가입을 위한 API 입니다. ** <br/><br/>
    '
    #swagger.parameters['obj']= {

        in : 'body',
        name : 'body',
        description : '회정 정보',
        required : true,
        schema :{
            email : "회원이메일",
            password:"회원비밀번호",
            nickname : "닉네임",
            googleFlag : "google 회원 유무 : (true/false) bool값으로 주세요" 
        }

    }
    
    #swagger.responses[200] = {
        description : '회원가입 성공!',
        schema:{
            error:false,
            message:"SUCCESS_SIGN_UP"
        }
    }

    #swagger.responses[400] = {
        description: '잘못된 접근시',
        schema:{
            error: true,
            message: "VERIFY_EMAIL_FIRST",
        }
    }
*/
);
router.post(
  "/in",
  signCtrl.post.sing_in
  /*
    #swagger.summary = "로그인 API"
    #swagger.description = '
    ** 로그인 API 입니다. ** <br/><br/>
    '
    #swagger.parameters['obj']= {

        in : 'body',
        name : 'body',
        description : '회정 정보',
        required : true,
        schema :{
            email : "회원이메일",
            password:"회원비밀번호",
        }

    }
    
    #swagger.responses[200] = {
        description : '**서버와 통신은 정상이지만 오류가 발생할 수있습니다.**
        1. 존재하지 않는 유저일 경우\n
        ```
            error: true,
            message: "not found user info. pleas dublechecking.."
        ```\n\n

        2.아이디 또는 비밀번호가 올바르지 않은 경우\n
        ``` 
            error: true,
            message: "비밀번호 또는 이메일이 올바르지 않습니다.",

        ```\n\n
        ',
        schema:{
        error: false,
        data: {
            accessToken: "엑세스토큰",
            refeshToken: "리프레쉬토큰",
            },
        }
    }

    #swagger.responses[500] = {
        description: '잘못된 접근시',
        schema:{
            error: true,
            message: "Internal Server Error"
        }
    }
*/
);
router.delete(
  "/out",
  signCtrl.post.sing_out
  /*
      #swagger.summary = "로그아웃 API"
      #swagger.description = '
      ** 로그아웃 API 입니다. ** <br/><br/>
      '
      #swagger.parameters['obj']= {
  
          in : 'body',
          name : 'body',
          description : '회정 정보',
          required : true,
          schema :{
            refershToken : "반환할 리프레시 토큰 전송"
          }
  
      }
      
      #swagger.responses[200] = {
          description : '** 로그아웃 결과**',
          schema:{
            ok : true
          }
      }
  
      #swagger.responses[500] = {
          description: '잘못된 접근시',
          schema:{
              error: true,
          }
      }
  */
);

export default router;
