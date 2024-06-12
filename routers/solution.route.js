const route=require('express').Router()
const solutionController=require('../controllers/solution.controller')

route.get('/solution',solutionController.getPageSolution)


module.exports=route