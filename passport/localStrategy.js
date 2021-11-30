const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const axios = require("axios");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          // 우리는 db서버를 따로 두기로 했으니까 여기서 비밀번호 해시처리에서 db서버로 쏴주자
          const result = await axios.post("http://localhost:7000/signin", {
            email: email,
            password: password,
          });
          if (result.data == 3) {
            done(null, false, { message: "가입되지 않은 회원입니다." });
          } else if (result.data == 2) {
            done(null, false, { message: "비밀번호가 일치하지 않습니다." });
          } else {
            done(null, result.data[0]);
          }
          // 여기 done이 index.js에서 serial부터 아래로 내려 간다.
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
