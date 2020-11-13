const jwt = require("jsonwebtoken");

module.exports = (ctx, next) => {
    if(ctx.request.path === "/user/login" || ctx.request.path === "/user/register"){
        return next();
      }
    
      const token = ctx.header.authorization;
    
      try{
        jwt.verify(token, process.env.JWT_SECRET);
      }catch(err){
        return ctx.body = {
          status: 401,
          msg: "No valid token"
        };
      }
    
      return next();
};