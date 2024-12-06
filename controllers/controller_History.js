const path = require('path');
const db = require('../database/db_History');
const dbApprove = require('../database/db_Approved')
const dbstaff = require('../database/db_staff')
const dbPedding = require("../database/db_Pedding");

// async function getNid (req,res){
//     const {NID} = req.params;
// console.log(NID);
// req.session.NID = NID;
//     res.redirect("/devices/hisroty")
// }

async function ShowHistoryPage(req, res) {
    // console.log('ok')
    // console.log(req.session.NID);
    const objWaitApprove = await dbApprove.listNewApproved();
    const countOrderDevice = await dbstaff.OrderwaitSend();
    const objWaitConfirmRequest = await dbstaff.listNewrequest();
    const countNewDevice = await dbstaff.listNewDevices();
    const SumNumberRequestStaff = objWaitConfirmRequest.length + countNewDevice.length + countOrderDevice.length
    const objPending = await dbPedding.listStatus(req.session.nid);
    res.render('HistoryPage', {
        userInfo: req.session.nid,
        countWaitApprove: objWaitApprove.length,
        countWaitConfirmRequest: objWaitConfirmRequest.length,
        countNewDevice: countNewDevice.length,
        SumNumberRequestStaff: SumNumberRequestStaff,
        countPending: objPending.length,
        userInfoRoleID: req.session.RoleID,
        countOrderDevice : countOrderDevice.length
    })
}





// โชว์ข้อมูลบนตาราง
async function listHistory(req, res) {
    try {
        const { NID } = req.body
        console.log(NID);
        const result = await db.listHistory(NID);
        // console.log(result);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

// โชว์ข้อมูลบนModel
async function GetDataModel(req, res) {
    try {
        const { ID } = req.body
        console.log(ID);
        const result = await db.GetDataModel(ID);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

async function GetHistoryRequestBykeyword(req, res) {
    try {
        const { keywords, NID } = req.body
        console.log(req.body);
        const result = await db.GetHistoryRequestBykeyword(keywords, NID);
        // console.log(result);
        res.send(result)
    } catch (error) {
        console.error(`Error :${error}`)
        res.status(500).send({ msg: `Error:${error}` })
    }

}

// แสดงข้อมูลรายชือ Request
async function selectReturn(req, res) {
    try {
        const result = await db.selectReturn();
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error:${error}` })
    }

}



// async function InsertReturn(req, res) {
//     const { Request, ItemCode, Qty, Remark, NID,ID2 } = req.body
//     const result = await db.InsertReturn(Request, ItemCode, Qty, Remark, NID,ID2);

// }

async function UpdateReturn(req, res) {
    try {
        const { ID, Remark } = req.body
        const result = await db.UpdateReturn(ID, Remark);
        res.status(200).send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }
}



//เพื่อเอาฟังชั่นออกไปใช่งาน
module.exports = {
    // getNid,
    ShowHistoryPage,
    listHistory,
    GetDataModel,
    selectReturn,
    UpdateReturn,
    GetHistoryRequestBykeyword
}

