const db = require('../database/db_Approved')
const dbstaff = require('../database/db_staff')
const dbPedding = require("../database/db_Pedding");
// async function Approve(req,res){
//     console.log("OK TEST Approved")
// }

async function ApprovedPage(req, res) {
    // console.log('ok')
    // console.log(req.session.NID);
    const objWaitApprove = await db.listNewApproved();
    const countOrderDevice = await dbstaff.OrderwaitSend();
    const objWaitConfirmRequest = await dbstaff.listNewrequest();
    const countNewDevice = await dbstaff.listNewDevices();
    const SumNumberRequestStaff = objWaitConfirmRequest.length + countNewDevice.length + countOrderDevice.length
    const objPending = await dbPedding.listStatus(req.session.nid);
    res.render('Approved', {
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
async function HistoryApprovedPage(req, res) {
    // console.log('ok')
    // console.log(req.session.NID);
    const objWaitApprove = await db.listNewApproved();
    const countOrderDevice = await dbstaff.OrderwaitSend();
    const objWaitConfirmRequest = await dbstaff.listNewrequest();
    const countNewDevice = await dbstaff.listNewDevices();
    const SumNumberRequestStaff = objWaitConfirmRequest.length + countNewDevice.length + countOrderDevice.length
    const objPending = await dbPedding.listStatus(req.session.nid);
    res.render('History_Approved', {
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

async function listNewApproved(req, res) {
    try {
        const result = await db.listNewApproved();
        console.log(result.length);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }
}

async function listApproved(req, res) {
    try {
        const result = await db.listApproved();
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }
}

async function searchApproved(req, res) {
    try {
        const { keyword } = req.body
        const result = await db.searchApproved(keyword);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }
}

async function inputModalHistory(req, res) {
    try {
        const { keyword } = req.body
        const result = await db.inputModalHistory(keyword);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }
}
// ConfirmApproved
async function ApprovedManager(req, res) {
    try {
        const { ID, Remark } = req.body
        console.log(ID, Remark);
        // return
        const result = await db.ApprovedManager(ID, Remark);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }
}
async function ApprovedManagertransfer(req, res) {
    try {
        const { ID, Remark } = req.body
        console.log(ID, Remark);
        // return
        const result = await db.ApprovedManagertransfer(ID, Remark);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }
}
async function ApprovedManagerNG(req, res) {
    try {
        const { ID, Remark } = req.body
        console.log(ID, Remark);
        // return
        const result = await db.ApprovedManagerNG(ID, Remark);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }
}

async function RejectManager(req, res) {
    try {
        const { ID, Remark } = req.body
        console.log(ID, Remark);
        // return
        const result = await db.RejectManager(ID, Remark);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }
}


module.exports = {
    ApprovedPage,
    listNewApproved,
    listApproved,
    searchApproved,
    inputModalHistory,
    ApprovedManager,
    RejectManager,
    HistoryApprovedPage,
    ApprovedManagerNG,
    ApprovedManagertransfer
}
