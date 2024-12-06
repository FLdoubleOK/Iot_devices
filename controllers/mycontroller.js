async function test(req,res){
    console.log("OK TEST")
}

async function RequestDevices(req,res){
    console.log("OK TEST Devices")
}
//เพื่อเอาฟังชั่นออกไปใช่งาน
module.exports = {
    test,
    RequestDevices
}

