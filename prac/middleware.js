var router = express.Router()

//app-based middleware
app.use(function (req,res,next){
  console.log('Time: ',Date.now())
  next();
},
function (req,res,next){
  console.log('Wakt: ',Date.now())
  next('route')
},
function (req,res,next){
  console.log('Samay: ',Date.now())
})

//router based middleware
router.get('/user',function (req,res,next){
  console.log('Time: ',Date.now())
  next('router');
},
function (req,res,next){
  console.log('Wakt: ',Date.now())
  next('route')
})


app.get('/user',function (req,res,next){
  res.send('special')
})

app.use(router);

// error based middleware
app.use(function(err,req,res,next){
  console.error(err.stack);
  res.status(500).send('Something broke')
})