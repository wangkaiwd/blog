let express = require("express");
let users = require("../model/users.js");

let posts = require("../model/posts");

let home = express.Router();

home.get("/", (req, res) => {
    // 分页查询的参数
    // 1. 当前页
    // 2. 每页显示文章数
    // 3. 文章总数
    posts.postsSum(function (err, rows) {
        if (!err) {
            let total = rows.total;
            let page = req.query.page || 1;
            let pageSize = 1;
            let pages = total/pageSize;
            posts.unionSelect(page,pageSize,function(err,rows){
                if(!err){
                    res.render("home/index",{
                        page:page,
                        pages:pages,
                        pageSize:pageSize,
                        rows:rows
                    });
                }
            });
        }
    });    
    // console.log(total);

});

home.get("/about", (req, res) => {
    res.render("home/about", {});
});
home.get("/article", (req, res) => {
    let id = req.query.pid;
    posts.findOne(id,(err,rows)=>{
        if(!err){
            let uid = rows.uid;
            users.personal(uid,(err,userinfo)=>{
                if(!err){
                    res.render("home/article",{
                        post:rows,
                        user:userinfo
                    });                    
                }
            });
        } 
    });
    
});
home.get("/center", (req, res) => {

    res.render("home/center", {});
});
home.get("/join", (req, res) => {

    res.render("home/join", {});
});
home.get("/login", (req, res) => {
    res.render("home/login", {});
});

home.get("/register", (req, res) => {
    res.render("home/register", {});
});


// 注册
home.post("/register", (req, res) => {
    // 将数据插入数据库
    // console.log(req.body);
    users.insert(req.body, (err) => {
        if (!err) {
            return res.json({
                code: 100,
                msg: "添加成功"
            })
        }
        res.send("数据库操作出错");
    });
});


// 登录逻辑
home.post("/login", (req, res) => {
    users.select(req.body.email,req.body.password, function (err,rows) {
        if (!err) {
            // 如果没有错误的话，将查询到的信息添加到session中
            // 如果先发送请求的话，会在前端直接跳转，不会设置响应头
            req.session.userinfo = rows;
            // 发送ajax请求
            res.json({
                code:100,
                msg:"登录成功"
            });  
        }
        else if(err=="没有查找到用户"){
            res.json({
                code: 99,
                msg: "没有查到用户"
            });
        }
        else if(err=="数据库操作失败"){
            res.json({
                code: 98,
                msg:"数据库操作失败"
            });
        }
        else {
            res.json({
                code:97,
                msg:"用户名或密码错误"
            })
        }
    });
});









module.exports = home;