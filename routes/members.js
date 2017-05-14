var express= require('express');
var router=express.Router();


var mysql=require('mysql');
 var pool=mysql.createPool({
    connectionLimit:1000,
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'mytaskslist',
    debug: false
});
/*var pool=mysql.createPool({
    connectionLimit:1000,
    host     : 'us-cdbr-iron-east-03.cleardb.net',
    user     : 'bab2331e12f0d8',
    password : 'a2030da8',
    database : 'heroku_0ed83a93931eb6b',
    debug: false
});*/
/*var pool=mysql.createPool({
    connectionLimit:1000,
    host     : 'sql11.freemysqlhosting.net',
    user     : 'sql11169780',
    password : 'dACIk8J2Tr',
    database : 'sql11169780',
    debug: false
});*/
/*var pool=mysql.createPool({
    connectionLimit:1000,
    host     : 'db4free.net',
    user     : 'formula2017',
    password : 'formula2017',
    database : 'formula2017',
    debug: false
});*/
/*===============================================*/


var totalRec = 0,

    pageSize  = 50,

    pageCount = 0;

var start       = 0;

var currentPage = 1;

/* GET member listing. */
router.get('/members', function(req, res) {
    pool.getConnection(function(err, connection) {
        if (err) {
            console.error("An error occurred: " + err);
        }
        connection.query('select * from user LIMIT 0,100', function(err, rows) {
            if (err) {
                throw err;
            } else {
                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                var result = {
                    success: true,
                    rows: rows.length,
                }
              res.write(JSON.stringify(rows));

                res.end();
            }
           connection.release();
        });
    });
});

/*router.get('/members/id/:id', function(req, res) {
    console.log(req.params);
    pool.getConnection(function(err, connection) {
        if (err) {
            console.error("An error occurred: " + err);
        }
        /!*  connection.query('select * from members where fullname=?', [req.params.term], function(err, rows) {*!/
        connection.query('select * from members where id=?', [req.params.id], function(err, rows) {
            if (err) {
                throw err;
            } else {
                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                var result = {
                    success: true,
                    rows: rows.length,
                }
                console.log(JSON.stringify(result)+' way');
                console.log(req.params+' way');
                console.log('select * from members where id='+req.params.id+ ' way');
                res.write(JSON.stringify(rows));

                res.end();
            }
            connection.release();
        });
    });
});*/




router.get('/members/count', function(req, res) {
    pool.getConnection(function(err, connection) {
        if (err) {
            console.error("An error occurred: " + err);
        }
        connection.query('select * from user ', function(err, rows) {
            if (err) {
                throw err;
            } else {
                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                var result = {
                    success: true,
                    rows: rows.length,
                }
                res.write(JSON.stringify(rows));

                res.end();
            }
            connection.release();
        });
    });
});
router.get('/members/:param', function(req, res) {
    console.log(req.params);
    console.log([req.params.param]);
    var r='select * from user ORDER BY '+req.params.param +' DESC LIMIT 0,100'
    pool.getConnection(function(err, connection) {
        if (err) {
            console.error("An error occurred: " + err);
        }
        console.log([req.params.param]+" this is par "+(typeof [req.params.par]==='string'));
       /* connection.query('select * from user ORDER BY ? DESC LIMIT 0,100', ['id'], function(err, rows) {*/
        connection.query(r,  function(err, rows) {
            if (err) {
                throw err;
            } else {
                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                var result = {
                    success: true,
                    rows: rows.length,
                }
                res.write(JSON.stringify(rows));

                res.end();
            }
            connection.release();
        });
    });
});
router.get('/members/up/:paramup', function(req, res) {
    console.log(req.params);
    console.log([req.params.paramup]+' UP');
    var r='select * from user ORDER BY '+req.params.paramup +'   LIMIT 0,100'
    pool.getConnection(function(err, connection) {
        if (err) {
            console.error("An error occurred: " + err);
        }

        /* connection.query('select * from user ORDER BY ? DESC LIMIT 0,100', ['id'], function(err, rows) {*/
        connection.query(r,  function(err, rows) {
            if (err) {
                throw err;
            } else {
                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                var result = {
                    success: true,
                    rows: rows.length,
                }
                res.write(JSON.stringify(rows));

                res.end();
            }
            connection.release();
        });
    });
});

router.post('/members/add', function(req, res) {

    pool.getConnection(function(err, connection) {
        if (err) {
            console.error("An error occurred: " + err);
        }

        connection.query('insert into user set ?', req.body,
            function(err, rows) {
                if (err) {
                    throw err;
                } else {
                    res.writeHead(200, {
                        "Content-Type": "application/json"
                    });
                    var result = {
                        success: true,
                        detail: rows,

                        id: rows.insertId

                    }

                    res.write(JSON.stringify(result));
                    res.end();
                }

                connection.release();
            });

    });

});


/*
router.get('/members/:item', function(req, res) {
    console.log(req.params);
    console.log([req.params.item]+' search');
    var r='select * from user where first_name like '+[req.params.item+'%']+' LIMIT 0,100';

    pool.getConnection(function(err, connection) {
        if (err) {
            console.error("An error occurred: " + err);
        }

        /!* connection.query('select * from user ORDER BY ? DESC LIMIT 0,100', ['id'], function(err, rows) {*!/
        connection.query('select * from user where first_name like ?  LIMIT 0,100', [req.params.item+'%'], function(err, rows) {
            if (err) {
                throw err;
            } else {
                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                var result = {
                    success: true,
                    rows: rows.length,
                }
                res.write(JSON.stringify(rows));

                res.end();
            }
            connection.release();
        });
    });
});
*/

router.get('/members/search/:term', function(req, res) {


  /*  var r=req.params.term+'%\' LIMIT 0,100';*/
    var re=req.params.term.replace(/F/g, '%\'');
    var f=re.replace(/0/g,' ');
    var t=f.slice(0,-3);
    var r="select * from user where "+t+" LIMIT 0,100";

   console.log(r+' What');



    pool.getConnection(function(err, connection) {
        if (err) {
            console.error("An error occurred: " + err);
        }


        /*connection.query('select * from members where fullname=?', [req.params.term], function(err, rows) {*/
        /*connection.query('select * from user where first_name like ?', [req.params.term+'%'], function(err, rows) {*/
        connection.query(r, function(err, rows) {
            console.log(r+' query');
            if (err) {
                throw err;
            } else {
                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                var result = {
                    success: true,
                    rows: rows.length,
                }
                console.log(JSON.stringify(result)+' way');
                console.log(req.params+' way');

                res.write(JSON.stringify(rows));

                res.end();
            }
            connection.release();
        });
    });
});

router.get('/members/pages',function(req,res){
    pool.getConnection(function(err, connection){
        console.log("jad jad");
        if (err) {
            console.error("An error occurred: " + err);
        }
        connection.query('SELECT COUNT(*) as numrows FROM `user`', function(err, rows) {
            if (err) {
                throw err;
            } else {

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                var result = {
                    success: true,
                    rows: rows.length,
                }
                totalRec = rows[0]['numrows'];

                pageCount = Math.ceil(totalRec / pageSize);
                console.log(totalRec+"ja ja "+pageCount);
                console.log(JSON.stringify(rows));
                /* if (typeof req.query.page !== 'undefined') {

                 currentPage = req.query.page;

                 }
                 if(currentPage >1){

                 start = (currentPage - 1) * pageSize;
                 }

                 var sql  = 'SELECT * from user LIMIT '+start+' ,'+pageSize+' ';
                 console.log(sql+'   sssssssssssssssss');
                 connection.query( sql, function(err, data, fields) {

                 if (err) throw err;

                 res.render('index', { data: data, pageSize: pageSize, pageCount: pageCount,currentPage: currentPage});
                 console.log(res.render);
                 console.log(res);
                 });*/
                res.write(JSON.stringify(rows));

                res.end();
            }

        connection.release();
    });

    });
});
router.delete('/members/:id', function(req, res) {
    console.log(req.params.id+'this is Params id');
    pool.getConnection(function(err, connection) {
        if (err) {
            console.error("An error occurred: " + err);
        }
        console.log(req.params.id+' ffff');
        connection.query('SET FOREIGN_KEY_CHECKS=0',function(){ /*connection.release();*/});
        connection.query('delete from user where id=?', [req.params.id], function(err, rows) {

            if (err) {
                throw err;
            } else {

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                var result = {
                    success: true,
                    rows: rows.length,
                    detail: rows

                }
                console.log(req.params.id+' del');
                console.log('delete from members where id=?', [req.params.id]+' del');
                res.write(JSON.stringify(result));
                res.end();

            }

            /*connection.release();*/
        });
        connection.query('SET FOREIGN_KEY_CHECKS=1',function(){ connection.release();});

    });

});

module.exports = router;

