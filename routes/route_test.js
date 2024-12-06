const express =require('express')
const router =express.Router();

const bodyParser =require('body-parser')
// const cookieSession =require("cookie-session")

const controller =require("../controllers/controller_test")

router.use(express.urlencoded({extended:false}))
router.use(bodyParser.json())

router.get("/nid/:nid",controller.getNid)
router.get("/render",controller.render)

module.exports=router;