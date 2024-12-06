const path = require('path');
const db = require('../../database/db_RequestPage');

async function GetNID(req, res) {
    const {NID} = req.params
    console.log(NID)
    //     res.sendFile('views/Device.html')
    // const parentDir = path.join(__dirname, '..', 'views', 'Device.html')
    // res.sendFile(parentDir)
    // console.log();
    res.redirect("/iot/device")
}

async function renderDevicePage(req,res ) {
    // const parentDir = path.join(__dirname, '..', 'views', 'Device.html')
    // console.log(parentDir);
    // res.render('Devices/devices')
    // // res.sendFile(parentDir)
}

async function RequestDevices(req, res) {
    console.log("OK TEST Devices")
}

// async function category(req, res) {
//     const result = await db.category();
//     res.send(result)
// }

// async function DeviceRemainTable(req, res) {
//     const result = await db.DeviceRemainTable();
//     res.send(result)
// }

// async function SelectCategory(req, res) {
//     const { keyword } = req.body
//     const result = await db.SelectCategory(keyword);
//     res.send(result)
// }

// async function GetDataModel(req, res) {
//     const { keyword } = req.body
//     const result = await db.inputModal(keyword);
//     res.send(result)
// }

// async function SearchInput(req, res) {
//     const { keyword, category } = req.body
//     const result = await db.SearchInput(keyword, category);
//     res.send(result)
// }

// async function SelectDepModal(req, res) {
//     const result = await db.SelectDepModal();
//     res.send(result)
// }

// async function SelectRequestModel(req, res) {
//     const result = await db.SelectRequestModel();
//     res.send(result)
// }

// async function SelectManagmentModel(req, res) {
//     const { Department } = req.body
//     const result = await db.SelectManagmentModel(Department);
//     res.send(result)
// }

// async function SelectInchageModel(req, res) {
//     const { Department } = req.body
//     const result = await db.SelectInchageModel(Department);
//     res.send(result)
// }

// async function InsertBorrowModel(req, res) {

//     const { Request, ItemCode, Qty, Remark, Duedate } = req.body
//     const result = await db.InsertBorrowModel(Request, ItemCode, Qty, Remark, Duedate);
//     res.send(result)
// }

// async function InsertSupportModel(req,res){
//     const {Request, ItemCode, Qty, Remark, Duedate }= req.body
//     const result = await db.InsertSupportModel(Request, ItemCode, Qty, Remark, Duedate);

// }

async function InsertTransferModel(req,res){
    const {Request, ItemCode, Qty, Remark, Duedate }= req.body
    const result = await db.InsertTransferModel(Request, ItemCode, Qty, Remark, Duedate);

}

// async function select_category(req, res) {
//     console.log("OK TEST Devices")
// }
//เพื่อเอาฟังชั่นออกไปใช่งาน
module.exports = {
    GetNID,
    renderDevicePage,
    RequestDevices,
    category,
    DeviceRemainTable,
    SelectCategory,
    GetDataModel,
    SearchInput,
    SelectDepModal,
    SelectRequestModel,
    SelectManagmentModel,
    SelectInchageModel,
    InsertBorrowModel,
    InsertSupportModel,
    InsertTransferModel
}

