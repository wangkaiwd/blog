let express = require("express");
let bodyParser = require("body-parser");
let session = require("express-session");

let db = require("./model/db.js");

let app = express();

app.listen(3000,function(err){
    if(!err){
        console.log("服务器已启动，监听3000端口");
    }
});

// 设置模板引擎的默认配置
    // 配置模板的根目录
app.set("views","./views");
    // 引入模板，模板后缀
app.set("view engine","xtpl");

// 加载静态资源(前后端的路径不同，可以在html中书写路径时进行区分)
app.use(express.static("./public"));

// 为所有路径解析post方式传递的地址
app.use(bodyParser.urlencoded({ extended: false }));

// 配置session
app.use(session({
    secret:"keyboard cat",
    resave:false,
    saveUninitialized:false,
}));

// 设置主路由(主路由也相当于中间件)
let admin = require("./controller/admin");
let home = require("./controller/home");

// /admin路径下面交给后台路由处理
// 这里相当于已经进入了这个路径

// 进入后台主路由之后先判断用户是否登录过，如果没有，强制跳转登录页面

app.use("/admin",(req,res,next)=>{
    // 这里的req.url="/";
    if(!req.session.userinfo){
        res.redirect("/login");
        return;
    }
    next();
});
// 根路径下面的交给前台去处理
app.use("/", home);
app.use("/admin",admin);
