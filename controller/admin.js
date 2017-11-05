
let express = require("express");
// 引入上传文件的第三方模块
let multer = require("multer");

// 对上传的文件进行默认配置的修改
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/admin/images');
    },
    filename: function (req, file, cb) {
        var extname = file.originalname.slice(file.originalname.lastIndexOf("."));
        cb(null, file.fieldname + '-' + Date.now()+extname)
    }
})

var upload = multer({ storage: storage })

let users = require("../model/users.js");
let posts = require("../model/posts");

let admin = express.Router();


// 前面的路由已经进入了"/admin"这个路径
admin.get("/",(req,res)=>{
    res.render("admin/index",{});    
});
admin.get("/add", (req, res) => {
    res.render("admin/blog_add", {});
});


admin.get("/list", (req, res) => {
    posts.select(function (err, rows) {
        if (!err) {
            res.render("admin/blog_list", { lists: rows });
        }
    });
});
admin.get("/repass", (req, res) => {
    res.render("admin/repass", {});
});

// 个人中心
admin.get("/settings", (req, res) => {
    let uid = req.session.userinfo.id;
    users.personal(uid,function(err,rows){
        if(!err){
            // 模板引擎为什么不能直接传对象？
            return res.render("admin/settings", {rows:rows});
        }
        res.send("数据库操作出错");
    }); 
});

// 更新用户数据
admin.post("/settings",(req,res)=>{
    let userinfo = req.body;
    console.log(userinfo);
    let uid = req.session.userinfo.id;
    users.update(userinfo,uid,function(err){
        if(!err){
            res.json({
                code:100,
                msg:"更新成功"
            })
        }
    });
});

// 退出登录
admin.get("/quit",(req,res)=>{
    // 清空session，跳到登录页面
    req.session.userinfo = null;
    // 相当于设置了请求头为location:地址（重定向）
    res.redirect("/login");
});

// 添加文章
admin.post("/add", (req, res) => {
    req.body.uid = req.session.userinfo.id;
    posts.insert(req.body, (err) => {
        if (!err) {
            res.json({
                code: 100,
                msg: "添加文章成功"
            });
        }
    });
});

// 删除文章
admin.post("/remove",function(req,res){
    let id = req.body.id;
    posts.remove(id,(err)=>{
        if(!err){
            res.json({
                code:100,
                msg:"删除成功"
            });
        }
    });
});

// 编辑文章页面
admin.get("/edit",function(req,res){
    posts.findOne(req.query.id,function(err,rows){
        if(!err){
            res.render("admin/blog_add", {
                posts:rows,
                action:"/admin/edit"
            });
        }
    });
});

// 编辑逻辑
admin.post("/edit",function(req,res){
    // console.log(req.body);
    let id = req.body.id;
    delete req.body.id;
    posts.update(req.body,id,(err)=>{
        if(!err){
            res.json({
                code:100,
                msg:"更新成功"
            });
        }
    });
});

// 文件上传
admin.post("/upfile",upload.single("avatar"),(req,res)=>{
    res.json({
        code:100,
        msg:"上传成功",
        path:req.file.path
    });
});


module.exports = admin;
