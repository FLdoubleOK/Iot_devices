const db = require('../database/db_staff');
const dbApprove = require('../database/db_Approved')
const dbPedding = require("../database/db_Pedding");

// async function getNid (req,res){
//     const {NID} = req.params;
// console.log(NID);
// req.session.NID = NID;
//     res.redirect("/devices/StaffPage")
// }

async function NewDevicesPage(req, res) {
    // console.log('ok')
    // console.log(req.session.NID);
    const objWaitConfirmRequest = await db.listNewrequest();
    const countOrderDevice = await db.OrderwaitSend();
    const countNewDevice = await db.listNewDevices();
    const objWaitApprove = await dbApprove.listNewApproved();
    const SumNumberRequestStaff = objWaitConfirmRequest.length + countNewDevice.length + countOrderDevice.length
    const objPending = await dbPedding.listStatus(req.session.nid);
    res.render('NewDevice', {
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
async function NewRequestPage(req, res) {
    // console.log('ok')
    // console.log(req.session.NID);

    const objWaitConfirmRequest = await db.listNewrequest();
    const countOrderDevice = await db.OrderwaitSend();
    const countNewDevice = await db.listNewDevices();
    const objWaitApprove = await dbApprove.listNewApproved();
    const SumNumberRequestStaff = objWaitConfirmRequest.length + countNewDevice.length + countOrderDevice.length
    const objPending = await dbPedding.listStatus(req.session.nid);
    res.render('NewRequest', {
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

async function History_Addall(req, res) {
    // console.log('ok')
    // console.log(req.session.NID);
    const objWaitConfirmRequest = await db.listNewrequest();
    const countOrderDevice = await db.OrderwaitSend();
    const countNewDevice = await db.listNewDevices();
    const objWaitApprove = await dbApprove.listNewApproved();
    const SumNumberRequestStaff = objWaitConfirmRequest.length + countNewDevice.length + countOrderDevice.length
    const objPending = await dbPedding.listStatus(req.session.nid);
    res.render('History_Devices', {
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

async function History_RequestAll(req, res) {
    // console.log('ok')
    // console.log(req.session.NID);
    const objWaitConfirmRequest = await db.listNewrequest();
    const countOrderDevice = await db.OrderwaitSend();
    const countNewDevice = await db.listNewDevices();
    const objWaitApprove = await dbApprove.listNewApproved();
    const SumNumberRequestStaff = objWaitConfirmRequest.length + countNewDevice.length + countOrderDevice.length
    const objPending = await dbPedding.listStatus(req.session.nid);
    res.render('Histrory_request', {
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
async function listOrderwaitsend(req, res) {
    // console.log('ok')
    // console.log(req.session.NID);
    const objWaitConfirmRequest = await db.listNewrequest();
    const countOrderDevice = await db.OrderwaitSend();
    const countNewDevice = await db.listNewDevices();
    const objWaitApprove = await dbApprove.listNewApproved();
    const SumNumberRequestStaff = objWaitConfirmRequest.length + countNewDevice.length + countOrderDevice.length
    const objPending = await dbPedding.listStatus(req.session.nid);
    res.render('orderforsend', {
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
// -----------------New Request -----------//

async function listNewrequest(req, res) {
    try {
        const result = await db.listNewrequest();
        console.log(result.length);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

async function HistoryRequest(req, res) {
    try {
        const result = await db.HistoryRequest();
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}
async function selectlistRequest(req, res) {
    try {
        const result = await db.selectlistRequest();
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

async function searchlistNewRequest(req, res) {
    try {
        const { keyword } = req.body
        const result = await db.searchlistNewRequest(keyword);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}
async function inputModal(req, res) {
    try {
        const { keywords } = req.body
        const result = await db.inputModal(keywords);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

// /------------ History Request -------------/
async function HistoryRequestInModal(req, res) {
    try {
        const { keywords } = req.body
        const result = await db.HistoryRequestInModal(keywords);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}
async function searchistoryRequest(req, res) {
    try {
        const { keywords } = req.body
        const result = await db.searchistoryRequest(keywords);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

// ----------- New Device ---------------------//


async function listNewDevices(req, res) {
    try {
        const result = await db.listNewDevices();
        console.log(result.length);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

async function selectlistDevice(req, res) {
    try {
        const result = await db.selectlistRequest();
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

async function searchlistNewDevice(req, res) {
    try {
        const { keyword } = req.body
        const result = await db.searchlistNewDevice(keyword);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

async function inputModalDevice(req, res) {
    try {
        const { keyword } = req.body
        const result = await db.inputModalDevice(keyword);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

// /------------ History Add all -------------/
async function listAddallDevice(req, res) {
    try {
        const result = await db.listAddallDevice();
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

async function searchhistory(req, res) {
    try {
        const { keywords } = req.body
        const result = await db.searchistory(keywords);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}
async function itemModel(req, res) {
    try {
        const { keywords } = req.body
        const result = await db.itemmodel(keywords);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}
async function Update_Position(req, res) {
    try {
        const { ID, Position } = req.body
        console.log(ID, Position);
        const result = await db.Update_Position(ID, Position);
        res.status(200).send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}



// ----------- STAFF Confirm Request---------------------//
async function ConfrimBorrow(req, res) {
    try {
        const { ID, Remark } = req.body
        console.log(ID, Remark);
        // return
        const result = await db.ConfrimBorrow(ID, Remark);
        res.status(200).send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }


}

async function ConfrimReturn(req, res) {
    try {
        const { ID, Remark } = req.body
        console.log(ID, Remark);
        // return
        const result = await db.ConfrimReturn(ID, Remark);
        res.status(200).send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }


}
async function ConfrimNG(req, res) {
    try {
        const { ID, Remark } = req.body
        console.log(ID, Remark);
        // return
        const result = await db.ConfrimNG(ID, Remark);
        res.status(200).send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }


}


async function ButtonReject(req, res) {
    try {
        const { ID, Remark } = req.body
        console.log(ID, Remark);
        // return
        const result = await db.ButtonReject(ID, Remark);
        res.status(200).send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }


}

// ----------- STAFF Confirm Request---------------------//
async function ConfirmADD(req, res) {
    try {
        const { ID, Position, Remark } = req.body
        console.log(ID, Position, Remark);
        // return
        const result = await db.ConfirmADD(ID, Position, Remark);
        res.status(200).send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

async function RejectADD(req, res) {
    try {
        const { ID, Remark } = req.body
        console.log(ID, Remark);
        // return
        const result = await db.RejectADD(ID, Remark);
        res.status(200).send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }


}

// -------------- waitSendOrder-----------------/

async function OrderwaitSend(req, res) {
    try {
        const result = await db.OrderwaitSend();
        console.log(result.length);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

async function Update_InChargeStatus(req, res) {
    try {
        const { ID} = req.body
        console.log(ID);
        // return
        const result = await db.UpdateStatusOrder(ID);
        res.status(200).send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

async function Where_itemOrder(req, res) {
    try {
        const {keywords} = req.body
        const result = await db.Where_itemOrder(keywords);
        res.status(200).send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

//เพื่อเอาฟังชั่นออกไปใช่งาน
module.exports = {
    // getNid,
    NewDevicesPage,
    NewRequestPage,
    listNewrequest,
    listNewDevices,
    listAddallDevice,
    selectlistRequest,
    selectlistDevice,
    searchlistNewRequest,
    searchlistNewDevice,
    searchhistory,
    inputModal,
    inputModalDevice,
    ConfrimBorrow,
    ConfrimReturn,
    ButtonReject,
    ConfirmADD,
    RejectADD,
    History_Addall,
    History_RequestAll,
    HistoryRequest,
    HistoryRequestInModal,
    searchistoryRequest,
    ConfrimNG,
    itemModel,
    Update_Position,
    OrderwaitSend,
    Update_InChargeStatus,
    Where_itemOrder,
    listOrderwaitsend
}
