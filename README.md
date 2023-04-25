# yogita API 서버 관련 프젝입니다~~🍀

> 이용방법, 변경사항 등 관련 내용들은 이곳에 기록해두겠습니다. 미비한게 있으면 피드백 부탁해요~

- 현재 클라우드 서버에 API서버를 오픈해두지 안아서 로컬로 접속해야돼요!
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
- open server URL http://ec2-13-113-183-40.ap-northeast-1.compute.amazonaws.com:3000 으로 접속하면 api,socket 통시 사용 가능
- http://ec2-13-113-183-40.ap-northeast-1.compute.amazonaws.com:3000/doc 으로 api document 볼 수 있음

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

```json
{
  //리턴 데이터 규약 정해지면 추가 예정
}
```
