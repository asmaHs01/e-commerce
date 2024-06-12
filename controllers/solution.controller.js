exports.getPageSolution=(req,res,next)=>{
    res.render('solution',{verifUser: req.session.userId, role: req.session.role})
}