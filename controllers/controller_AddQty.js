const db = require('../database/db_AddQty');
const dbApprove = require('../database/db_Approved');
const dbstaff = require('../database/db_staff');
const dbPedding = require("../database/db_Pedding");

async function AddQtyPage(req, res) {
    // console.log('ok')
    // console.log(req.session.NID);
    const objWaitConfirmRequest = await dbstaff.listNewrequest();
    const countOrderDevice = await dbstaff.OrderwaitSend();
    const countNewDevice = await dbstaff.listNewDevices();
    const objWaitApprove = await dbApprove.listNewApproved();
    const SumNumberRequestStaff = objWaitConfirmRequest.length + countNewDevice.length + countOrderDevice.length
    const objPending = await dbPedding.listStatus(req.session.nid);
    res.render('AddQtyDevices', {
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

async function listAddQty(req, res) {
    try {
        const result = await db.listAddQty();
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }
}

async function select_category(req, res) {
    try {
        const result = await db.select_category();
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

async function searchdevice(req, res) {
    try {
        const { keyword } = req.body
        const result = await db.searchdevice(keyword);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

async function inputModal(req, res) {
    try {
        const { keyword } = req.body
        const result = await db.inputModal(keyword);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

async function searchinput(req, res) {
    try {
        const { keyword, category } = req.body
        const result = await db.searchinput(keyword, category);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

async function AddQtyDevice(req, res) {
    try {
        const { ItemCode, Qty, Remark, NID } = req.body
        const result = await db.AddQtyDevice(ItemCode, Qty, Remark, NID);
        res.status(200).send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }


}
//เพื่อเอาฟังชั่นออกไปใช่งาน
module.exports = {
    AddQtyPage,
    listAddQty,
    select_category,
    searchdevice,
    inputModal,
    searchinput,
    AddQtyDevice
}
