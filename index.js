const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { MongoURI } = require("./config/key");
const { auth } = require("./middleware/auth");
const { User } = require("./models/user");

// application/x-www-form/urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose.connect(MongoURI, {
  autoIndex: true,
  })
  .then(() => {
  console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log(err);
});

app.get("/", (req, res) => res.send("Hellow, World!"));

app.post("/api/users/register", (req, res) => {
  console.log("/api/users/register");

  // 회원 가입 시 필요한 정보들을 client에서 가져오면 해당 정보를 DB에 저장한다.
  const user = new User(req.body);
  
  // 이전 코드 (mongoose 6.0 version 이하)
  // user.save((err, userInfo) => {
  //   if( err ) {
  //     return res.json({ success: false, err });
  //   }

  //   return res.status(200).json({
  //     success: true,
  //   });
  // });

  // mongoose 6.0 버전 이상
  // mongoose 라이브러리가 더 이상 콜백을 허용하지 않는다.
  // https://stackoverflow.com/questions/75586474/mongoose-stopped-accepting-callbacks-for-some-of-its-functions
  user.save()
    .then(() => {
      res.status(200).json({
        success: true
      });
    })
    .catch((err) => {
      res.json({ success:  false });
    });
});

app.post("/api/users/login", (req, res) => {
  console.log("/api/users/login");

  // 요청된 이메일을 DB에서 존재하는지 확인
  User.findOne({ email: req.body.email })
    .then((user) => {
      if( !user ) {
        return res.json({
          loginSuccess: false,
          message: "해당 이메일 정보가 없습니다.",
        });
      }

      // 요청된 이메일이 DB에 있다면 비밀번호가 일치하는지 확인
      user.comparePassword(req.body.password, (err, isMatch) => {
        if(!isMatch) {
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 일치하지 않습니다.",
          });
        }
  
      // 비밀번호까지 맞다면 토큰 생성
      user.generateToken((err, user) => {
        if(err) {
          return res.status(400).send(err);
        }

        // 토큰 저장 -> 쿠키
        res.cookie("x_auth", user.token)
          .status(200)
          .json({
            loginSuccess: true,
            userId: user._id,
          });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  console.log("/api/users/auth");

  // 여기까지 미들웨어를 통과했다는 얘기는 Authentication 이 true라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  })
});

app.get("/api/users/logout", auth, (req, res) => {
  console.log("/api/users/logout");

  User.findOneAndUpdate({ _id: req.user._id }, { token: "" })
  .then((user, err) => {
    if( err ) {
      return res.json({
        logoutSuccess: false,
        err,
      });
    }

    return res.status(200).json({
      logoutSuccess: true,
    })
  })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));