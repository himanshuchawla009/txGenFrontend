const express=require('express')
var path=require('path');

const app=express();
app.use(express.static(path.join(__dirname,'build')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'build/index.html'));

});
const port ='4041';
app.set('port',port);
app.listen(port,()=>console.log("running"));
