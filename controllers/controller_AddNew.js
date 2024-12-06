const db = require('../database/db_AddNew');
const dbApprove = require('../database/db_Approved');
const dbstaff = require('../database/db_staff');
const dbPedding = require("../database/db_Pedding");

async function AddNewPage(req, res) {
    // console.log('ok')
    // console.log(req.session.NID);
    const objWaitConfirmRequest = await dbstaff.listNewrequest();
    const countOrderDevice = await dbstaff.OrderwaitSend();
    const countNewDevice = await dbstaff.listNewDevices();
    const objWaitApprove = await dbApprove.listNewApproved();
    const SumNumberRequestStaff = objWaitConfirmRequest.length + countNewDevice.length + countOrderDevice.length
    const objPending = await dbPedding.listStatus(req.session.nid);
    res.render('AddNewPage', {
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

async function listAddNew(req, res) {
    try {
        const result = await db.listAddNew();
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

async function RunItemCode(req, res) {
    try {
        const result = await db.RunItemCode();
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

async function SearchType(req, res) {
    try {
        const { Category, keywords } = req.body
        console.log(Category, keywords);
        // return
        const result = await db.SearchType(Category, keywords)
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}
async function SearchTypekeywords(req, res) {
    try {
        const { keywords } = req.body
        console.log(keywords);
        const result = await db.SearchTypekeywords(keywords)
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

async function select_Vender(req, res) {
    try {
        const result = await db.select_Vender();
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


async function UploadFile(req, res) {
    try {
        const { RegisterNo, Category, Type, Description, Price, Qty, VendorName, Remark, NID } = req.body
        // console.log(RegisterNo,Category,Type,Description,Price,Qty,VendorName,Remark,NID);
        // const result = await db.(RegisterNo);
        res.send(RegisterNo)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

async function AddNewDevice(req, res) {
    try {
        const { Category, Type, Qty, Description, Price, VendorName, NID, Remark } = req.body
        console.log(Category, Type, Qty, Description, Price, VendorName, NID, Remark);
        // return
        const result = await db.AddNewDevice(Category, Type, Qty, Description, Price, VendorName, NID, Remark);
        res.status(200).send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}
//เพื่อเอาฟังชั่นออกไปใช่งาน
module.exports = {
    AddNewPage,
    listAddNew,
    select_category,
    searchdevice,
    AddNewDevice,
    select_Vender,
    RunItemCode,
    UploadFile,
    SearchType,
    SearchTypekeywords
}
