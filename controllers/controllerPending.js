const dbPedding = require("../database/db_Pedding");
const dbApprove = require("../database/db_Approved");
const dbstaff = require("../database/db_staff");

async function StatusPage(req, res) {
    // console.log('ok')
    // console.log(req.session.NID);
    const objWaitConfirmRequest = await dbstaff.listNewrequest();
    const countOrderDevice = await dbstaff.OrderwaitSend();
    const countNewDevice = await dbstaff.listNewDevices();
    const objWaitApprove = await dbApprove.listNewApproved();
    const SumNumberRequestStaff = objWaitConfirmRequest.length + countNewDevice.length + countOrderDevice.length
    const objPending = await dbPedding.listStatus(req.session.nid);
    res.render("pending", {
        userInfo: req.session.nid,
        countWaitApprove: objWaitApprove.length,
        countWaitConfirmRequest: objWaitConfirmRequest.length,
        countNewDevice: countNewDevice.length,
        SumNumberRequestStaff: SumNumberRequestStaff,
        countPending: objPending.length,
        userInfoRoleID: req.session.RoleID,
        countOrderDevice : countOrderDevice.length
    });
}

async function listStatus(req, res) {
    try {
        const { NID } = req.body;
        const result = await dbPedding.listStatus(NID);
        res.status(200).send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

async function inputModal(req, res) {
    try {
        const { keywords } = req.body;
        const result = await dbPedding.inputModal(keywords);
        res.status(200).send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

async function DeleteRequestAdd(req, res) {
    try {
        const { ID } = req.body;
        const result = await dbPedding.DeleteRequestAdd(ID);
        res.status(200).send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}
async function DeleteRequestPending(req, res) {
    try {
        const { ID } = req.body;
        const result = await dbPedding.DeleteRequestPending(ID);
        res.status(200).send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

//เพื่อเอาฟังชั่นออกไปใช่งาน
module.exports = {
    listStatus,
    StatusPage,
    inputModal,
    DeleteRequestPending,
    DeleteRequestAdd
};
