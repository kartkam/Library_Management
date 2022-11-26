var async = require('async');

//series
async.series({
        one: function(callback){
            setTimeout(function(){
                callback(null,1)
            },2000)
        },
        two: function(callback){
            setTimeout(function(){
                callback(null,2)
            }, 3000)
        }
    },
    function(err,results){
        console.log(results);
    }

)

//parallel
async.parallel([
        function(callback){
            callback(null,3)
        },
        function(callback){
            callback(null,4)
        }
    ],
    function(err,results){
        console.log(results);
    }
)