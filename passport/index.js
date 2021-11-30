const passport = require("passport");
const local = require("./localStrategy");
const axios = require("axios");

// const User = require("../");

// 세션 저장하는 곳
module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  // 사용자 정보에 대한 어떠한 처리를 할 때, 즉, req.user 생성하는 곳
  // 쉽게 말해서 inNotLoggedIn이나 isLoggedin을 매개변수로 적으면 여기로 옴
  // 한번 session을 f12로 확인하면서 분석을 해야겠음
  // 굳이 serial과 deserial을 나누는 이유를 모르겠음. 첫 로그인 할 때 정보 저장해놓는게 그렇게 무겁나?
  // 처음에 해놓는 것과 매개변수로 불러올 때랑 뭔 부하차이가 있지?
  // 세션 등을 실제 배포에선 이렇게 변수에 저장하지 않고 (서버 재시작 등으로 초기화 되거나 하면 안되기 때문에)
  // 세션또한 db에 저장한다. 대신 mysql이 아닌 메모리기반 redis에 저장을 많이 한다

  // passport.deserializeUser(async (email, done) => {
  //   try {
  //     // 일단 여기에 db로 부터 세션 확인을 써주는데
  //     // 일단 routers/index에 userSession으로 써놨는데,
  //     // 최종적으로 redis 내용을 써줘야한다

  //     // console.log(req.session);

  //     const user1 = await axios.get("http://localhost:7000/userSession", {
  //       params: {
  //         ID: email,
  //       },
  //     });
  //     done(null, user1.data);
  //   } catch {
  //     (err) => done(err);
  //   }
  // });

  passport.deserializeUser(async (email, done) => {
    try {
      const user1 = await axios.get("http://localhost:7000/userSession", {
        params: {
          ID: email,
        },
      });
      done(null, user1.data);
    } catch {
      console.log("안댄다 씨발");
    }
  });

  local();
};
