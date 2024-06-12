exports.getPageAbout=(req,res,next)=>{
    res.render('about',{verifUser: req.session.userId,role: req.session.role})
}