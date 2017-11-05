let db = require("./db");


let insert = function(data,cb){
    let sql = "INSERT INTO users SET ?";
    db.query(sql, data, (err) => {
        if(err){
            // 数据库操作错误的话，将错误信息返回
            return cb(err);
        }
        cb(null);
    })
}

// 验证用户登录
let select = function(email,pass,cb){
    let sql = "SELECT * FROM users where email=?";
    db.query(sql, email, (err,results)=>{
        if(err){
            // 为了减少逻辑的嵌套，切断代码的作用
            return cb(err);
        }
        // err只能判断sql语句是否正确，不能判断有没有查找到用户
        // results是根据sql语句查找出的内容
        // console.log(results);
        else if(results==[]){
            cb("没有查找到用户");
        }
        else if(results[0].email == email){
            if(results[0].pass==pass){
                return cb(null,results[0]);
            }
            return cb("用户名或密码错误");
        }
        cb("数据库操作错误");
    });
}

// 查询个人信息
let personal = function(uid,cb){
    let sql = "SELECT * FROM users WHERE id=?";
    db.query(sql,uid,(err,results)=>{
        if(err){
            return cb(err);
        }
        cb(null,results[0]);
    });
}

// 更新数据
let update = function(userinfo,id,cb){
    let sql = "UPDATE users SET ? WHERE id=?";
    db.query(sql,[userinfo,id],(err)=>{
        if(err){
            return cb(err);
        }
        cb(null);
    });
}





module.exports = {
    insert: insert,
    select: select,
    personal:personal,
    update:update
}


