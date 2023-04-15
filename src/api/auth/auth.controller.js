import { Router } from "express";
import authCtrl from "./auth.ctrl.js";
const router = Router();
router.post(
  "/sendCode",
  authCtrl.post.sendCode
  /*
  #swagger.summary = "이메일인 인증 코드 전송 API"
  #swagger.description = '
  ** 유저에게 이메일 인증 코드를 전송하는 api입니다. ** <br/><br/>
  '
  #swagger.parameters['obj'] = {
      in : 'body',
      name : 'body',
      description : '유저 이메일 정보',
      required : true,
      schema:{
          email : "전송 받을 이메일"
      }
  }
  #swagger.responses[200] = {
      description : '정상적으로 서버와 통신된 경우\n\n
      retrun 형식은 임시로 정해두겠습니다.
      1. 정상적으로 이메일이 보내진 경우\n
      ```
          error : false,
          message : "SUCCESS"
      ```
      '
  }
  #swagger.responses[400] = {
      description : '올바르지 않은 이메일 형식을 보낸경우\n\n',
      schema:{
          error: false,
          message : "VALIDATION_ERROR"
      }
       
  }
  */
);
router.post(
  "/verifyCode",
  authCtrl.post.verifyCode
  /*
      #swagger.summary = "인증코드 유효성 검사 API"
      #swagger.description = '
      ** 전송받은 인증코드가 올바른 인증코드인지 확인하는 API 입니다. ** <br/><br/>
      1. 인증코드는 최대 5분까지 사용가능합니다.<br/>
      2. 새로운 인증코드를 전송받았다면 이전 인종코드는 사용이 불가능합니다.<br/>
      3. 인증코드 입력 횟수는 5회로 제한합니다.
      '
      #swagger.parameters['obj']= {
  
          in : 'body',
          name : 'body',
          description : '인증코드',
          required : true,
          schema :{
              verifyCode : "인증코드"
          }
  
      }
      
      #swagger.responses[200] = {
          description : '정상적으로 서버와 통신에 성공하였으나 오류가 발생할 수 있습니다.\n\n
          1. 성공\n
          ```
              error:false,
              message:"VERIFY_SECCESS"
          ```\n\n
          2. 인증코드 유효시간이 만기된 경우.\n
          ```
              error: true,
              message : "TO_LATE_CODE",
          ```\n\n
          3. 잘못된 인증번호 전송한 경우.\n
          ```
              error: true,
              message : "WRONG_CODE",
          ```\n\n
  
          4. 최대 입력횟수를 초과한 경우.\n
          ```
              error: true,
              message : "TOO_MAMY_REQUEST",
          ```\n\n
          '
      }
  */
);

export default router;
