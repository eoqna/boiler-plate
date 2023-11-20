const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const { User } = require("./models/user");
const url = "";

// application/x-www-form/urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect(url, {
  autoIndex: true,
  })
  .then(() => {
  console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log(err);
});

app.get("/", (req, res) => res.send("Hellow, World!"));

app.post("/register", async (req, res) => {
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
  await user.save()
  .then(() => {
    res.status(200).json({
      success: true
    })
  })
  .catch((err) => {
    res.json({ success:  false, err });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));