let db = require("./db");

let insert = function(data,cb){
    let sql = "INSERT INTO posts SET ?";
    db.query(sql,data,(err,results)=>{
        if(err){
            return cb(err);
        }
        cb(null);
    });
}

// 显示页面内容
let select = function(cb){
    let sql = "SELECT * FROM posts";
    db.query(sql,(err,results)=>{
        if(err){
            return cb(err);
        }
        cb(null,results);
    });
}

// 删除文章
let remove = function(id,cb){
    let sql = "DELETE FROM posts WHERE id=?";
    db.query(sql,id,function(err){
        if(err){
            return cb(err);
        }
        cb(null);
    });
}

// 查询单个文章内容
let findOne = function(id,cb){
    let sql = "SELECT * FROM posts WHERE id=?";
    db.query(sql,id,(err,results)=>{
        if(err){
           return cb(err);
        }
        cb(null,results[0]);
    });
}

// 更新文章内容
let update = function(postsinfo,id,cb){
    let sql = "UPDATE posts SET ? where id=?";
    db.query(sql,[postsinfo,id],function(err){
        if(err){
            return cb(err);
        }
        cb(null);
    });
}

// 连表查询（posts和users）
let unionSelect = function(page, pageSize,cb){
    let offset = (page-1)*pageSize;
    let sql = "select posts.id,posts.title,posts.brief,posts.content,posts.`status`,posts.time,users.name,users.pass,users.email,users.avatar,users.company,users.gender,users.phone,users.homepage,users.alt from posts left join users on posts.uid=users.id limit ?,?";
    db.query(sql,[offset,pageSize],(err,results)=>{
        if(err){
            return cb(err);
        }
        cb(null,results);
    });
}

// 查询文章总数
let postsSum = function(cb){
    let sql = "SELECT COUNT(*) AS total FROM posts";
    db.query(sql,(err,results)=>{
        if(err){
            return cb(err);
        }
        cb(null,results[0]);
    });
}



module.exports = {
    insert:insert,
    select:select,
    remove:remove,
    findOne:findOne,
    update:update,
    unionSelect:unionSelect,
    postsSum:postsSum
}