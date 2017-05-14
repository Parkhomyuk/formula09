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
/*var pool=mysql.createPool({
    connectionLimit:1000,
    host     : 'sql11.freemysqlhosting.net',
    user     : 'sql11171565',
    password : 'WHVURKuasw',
    database : 'sql11171565',
    debug: false
})*/
/*===============================================*/



/* GET member listing. */
router.get('/tasks', function(req, res) {
    pool.getConnection(function(err, connection) {
        if (err) {
            console.error("An error occurred: " + err);
        }
        connection.query('select * from members', function(err, rows) {
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

router.get('/tasks/:term', function(req, res) {
console.log(req.params);
    pool.getConnection(function(err, connection) {
        if (err) {
            console.error("An error occurred: " + err);
        }
      /*  connection.query('select * from members where fullname=?', [req.params.term], function(err, rows) {*/
        connection.query('select * from members where fullname like ?', [req.params.term+'%'], function(err, rows) {
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
                console.log('select * from members where '+ ' way');
                res.write(JSON.stringify(rows));

                res.end();
            }
            connection.release();
        });
    });
});



router.delete('/tasks/:id', function(req, res) {
    console.log(req.params.id+'this is Params id');
    pool.getConnection(function(err, connection) {
        if (err) {
            console.error("An error occurred: " + err);
        }
        console.log(req.params.id+' ffff');
        connection.query('delete from members where id=?', [req.params.id], function(err, rows) {

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

            connection.release();
        });

    });

});
router.post('/tasks', function(req, res) {

    pool.getConnection(function(err, connection) {
        if (err) {
            console.error("An error occurred: " + err);
        }

        connection.query('insert into members set ?', req.body,
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

router.put('/tasks/:id', function(req, res) {
  /*  req.assert('lastName', 'Last Name is required').notEmpty();*/

    pool.getConnection(function(err, connection) {
        if (err) {
            console.error("An error occurred: " + err);
        }

        connection.query('update members set ? where id = ?', [req.body, req.params.id],
            function(err, rows) {
                if (err) {
                    throw err;
                } else {
                    res.writeHead(200, {
                        "Content-Type": "application/json"
                    });
                    var result = {
                        success: true,
                        detail: rows

                    }
                    console.log(JSON.stringify(result));
                    res.write(JSON.stringify(result));
                    res.end();
                }

                connection.release();
            });

    });

});

/*
router.get('/tasks/:par', function(req, res) {
    pool.getConnection(function(err, connection) {
        if (err) {
            console.error("An error occurred: " + err);
        }
        connection.query('select * from members ORDER BY ? DESC',[req.params.id], function(err, rows) {
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



module.exports = router;

