# yogita API 서버 관련 프젝입니다~~🍀

> 이용방법, 변경사항 등 관련 내용들은 이곳에 기록해두겠습니다. 미비한게 있으면 피드백 부탁해요~

- 현재 클라우드 서버에 API서버를 오픈해두지 안아서 로컬로 접속합니다.
- DB는 MariaDB엔진을 사용하고 Prisma로 관리하고있습니다.

## 사용법

1. 해당 프로젝트를 클론 후 VsCode로 열기
2. node 모듈 불러오기
   - npm i OR yarn
3. .env 다운받기 -> .env 파일은 노션에 올려두겠습니다.
4. prisma 적용시키기
   - prisma에 기록된 DB 적용 - npm run gen OR yarn gen
5. 실행
   - npm run start OR yarn start

## 부가정보

- 로컬로 API 테스트를 수행할 시 http://localost:3000/doc 로 들어가면 API 명새서가 기로되어 있습니다.
- 
- open server URL http://ec2-52-194-192-69.ap-northeast-1.compute.amazonaws.com:3000/ 으로 접속하면 api,socket 통시 사용 가능
- http://ec2-52-194-192-69.ap-northeast-1.compute.amazonaws.com:3000/doc 으로 api document 볼 수 있음

## URL 호출시

- accessToken을 받은 시점부터 모든 통신에 accessToKen 전송하기
- api,socket 통신시 headers에 토큰 전송
  ```json
  {
    "authorization": "Bearer ACCESSTOKEN"
  }
  ```

## return data 규정

- API

```json
{
  "error": true, //true or false
  "message": "error message", //에러 메세지를 리턴해줍니다.
  "data": {} // 클라이언트에 필요한 데이터를 전송하는 변수
}
```

- socket 통신
  > Handshake path Name은 /yogiya로 변경후 전송해야돼요.(defalt값은 /socket.io 일거야)

```json
{
  //리턴 데이터 규약 정해지면 추가 예정
}
```

### 각 기능별 사용 api/socket 로직 설명

> flutter에서 호출할 API 설명입니다. <br>
> 각 api 명세서는 위에 swagger URL에서 참고해주세요.

1. 회원가입

   - 로직
     1. v1/auth/send-code
        - 이메일에 인증코드를 전송하는 api입니다.
     2. v1/auth/verify-code
        - 전송받은 이메일 코드를 판단하는 api입니다.
     3. v1/sign/up
        - 최종 회원가입을 위한 api입니다.

2. 로그인

   - 로직

     1. v1/sign/in
        - 로그인 api / (JWT 토큰을 만들고 전송시켜줍니다.)
     2. (sokcet) login

        - flutter와 server간에 socket connection을 맺는 소캣 URL

     3. vi/setting

3. 친구요청
   - 로직
     1. v1/friends/list
        - 친구 리스트를 불러오는 api입니다.
     2. v1/friends/request
        - 친구요청 내역을 전송하는 api입니다.
        - 여기서 push 알림 전송해줘야되는데 이부분은 알려주면 적용하게습니다.
4. 친구 수락/거절
   > 가정 : "A"가 "B"에게 친구 요청한 상황이라고 가정할께
   - 로직
     1. (B의 앱) v1/friends/list -> v1/friends/request-list
        - 친구리스트 -> 친구요청 리스트 내역 불러오기
     2. (B의 앱 socket) setRequest
        - 수락시
          - "A"룸에 "B" 추가, "B"룸에 "A"추가
          - "A"에게 push 알림 전송
          - "B"에게 "A"의 디바이스 데이터 전송 end-point가 필요함
          - "A"에게 "B"의 디바이스 데이터 전송 end-point가 필요함
5. 친구 삭제
   - 로직
     1. (socket) deleteFriend
        - 친구 삭제 socket end-point
6. 프로필 재설정
   > 기존에 socket end-point로 변경하려했지만 api로 변경
   - 로직
     1. v1/my-page/profile
        - 변경할 프로필 파일을 전송하면 db에 변경하고, 내룸에 접속한 소켓에 브로드 케스팅을 통해 변경된 프로필URL을 전송 합니당.(2023.05.03)
7. 닉네임 재설정
   > 기존에 socket end-point로 변경하려했지만 api로 변경
   - 로직
     1. v1/my-page/nick-name
        - 닉네임 변경 후, 내룸에 접속한 소켓에 브로드 케스트 합니당.(2023.05.03)
8. 내위치 전송

   1. (socket) sendLocation
      - 내위치를 저장 후, 내룸에 접속한 소켓에 브로드 케스팅으로 내 디바이스 정보를 전송합니다.

9. etc...
   - 회원탈퇴 v1/my-page/
   - 로그아웃 (soket) logOut
