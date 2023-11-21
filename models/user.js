const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    max: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    max: 50,
  },
  lastname: {
    type: String,
    max: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  }
});

userSchema.pre("save", function(next) {
  const user = this;

  // 비밀번호를 암호화한다.
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if( err ) return next(err);

    if( user.isModified("password")) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if( err ) return next(err);
  
        user.password = hash;
        next();
      });
    } else {
      next();
    }
  });
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
  // plainPassword : 1234567, 암호화된 비밀번호 : $2b$10$pDOq7TNyotvHD6yC8.KPiOF9RJflbB8jtzYrhn1uMtJjJHp3zEG5.
  bcrypt.compare(plainPassword, this.password ,function(err, isMatch) {
    if( err ) return cb(err);

    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function(cb) {
  // jsonwebtoken을 이용해서 토큰 생성
  const user = this;

  const token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;

  user.save()
  .then((user, err) => {
    if( err ) return cb(err);

    cb(null, user);
  });
};

userSchema.statics.findByToken = function(token, cb) {
  console.log("여기");
  // jsonwebtoken을 이용해서 토큰 생성
  const user = this;

  // 토큰을 decode한다.
  jwt.verify(token, "secretToken", function(err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

    user.findOne({ "_id": decoded, "token": token })
    .then((info, err) => {
      if( !info ) {
        return cb(err);
      }

      cb(null, info);
    })
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };