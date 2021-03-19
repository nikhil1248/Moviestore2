const index=function(req,res){
    res.render('index',{title:'Movie Store'});
};
module.exports={
    index
};