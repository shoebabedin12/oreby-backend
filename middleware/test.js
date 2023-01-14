module.exports = function test(req, res, next){
    let id = true;
    if(id){
        res.send("Done")
        next()
    }else{
        res.send("Failed")
    }
}