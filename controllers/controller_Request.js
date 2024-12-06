const path = require('path');
const db = require('../database/db_RequestPage');
const dbApprove = require('../database/db_Approved');
const dbstaff = require('../database/db_staff');
const dbPedding = require("../database/db_Pedding");

async function getNid(req, res) {
    const { nid } = req.params;

    if (nid) {
        console.log(nid)
        req.session.nid = nid;
        req.session.isLoggedIn = true;
        res.redirect("/devices/request")
    } else {
        console.log('NG')
        res.redirect("/devices/accessdenied")
    }
    // console.log(NID);
    // req.session.NID = NID;
    // res.redirect("/devices/request")
}

async function ShowRequestPage(req, res) {
    const objWaitConfirmRequest = await dbstaff.listNewrequest();
    const countOrderDevice = await dbstaff.OrderwaitSend();
    const countNewDevice = await dbstaff.listNewDevices();
    const objWaitApprove = await dbApprove.listNewApproved();
    const SumNumberRequestStaff = objWaitConfirmRequest.length + countNewDevice.length + countOrderDevice.length
    const objPending = await dbPedding.listStatus(req.session.nid);
    res.render('RequestPage', {
        userInfo: req.session.nid, countWaitApprove: objWaitApprove.length,
        countWaitConfirmRequest: objWaitConfirmRequest.length,
        countNewDevice: countNewDevice.length,
        SumNumberRequestStaff: SumNumberRequestStaff,
        countPending: objPending.length,
        userInfoRoleID: req.session.RoleID,
        countOrderDevice: countOrderDevice.length
    })
}

// ************** Search Category **********//
// เรียกชื่อ category มาโชว์
async function CategoryName(req, res) {
    try {
        const result = await db.CategoryName();
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

//รับค่าจาก Category มาค้นหา
async function SelectCategory(req, res) {
    try {
        const { keywords } = req.body
        const result = await db.SelectCategory(keywords);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

//  search ด้วยการพิม
async function SearchInput(req, res) {
    try {
        const { keywords, category } = req.body
        const result = await db.SearchInput(keywords, category);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}
// ************** End Search **********//


// ************** Show Data **********//
// โชว์ข้อมูลบนตาราง
async function DeviceRemainTable(req, res) {
    try {
        const result = await db.DeviceRemainTable();
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

// โชว์ข้อมูลบนModel
async function GetDataModel(req, res) {
    try {
        const { keyword } = req.body
        const result = await db.GetDataModel(keyword);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}


// แสดงข้อมูลรายชือ Dep
async function SelectDepModal(req, res) {
    try {
        const result = await db.SelectDepModal();
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

// แสดงข้อมูลรายชือ Request
async function SelectRequestModel(req, res) {
    try {
        const result = await db.SelectRequestModel();
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

//  แสดงข้อมูลรายชือ Managment
async function SelectManagmentModel(req, res) {
    try {
        const { Department } = req.body
        const result = await db.SelectManagmentModel(Department);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

//  แสดงข้อมูลรายชือ Inchage
async function SelectInchageModel(req, res) {
    try {
        const { Department } = req.body
        const result = await db.SelectInchageModel(Department);
        res.send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}

// //  รับต่า Borrow ไป Insert
async function InsertBorrowModel(req, res) {
    try {
        // return
        const { Request, ItemCode, Qty, Remark, Duedate, NID } = req.body
        const result = await db.InsertBorrowModel(Request, ItemCode, Qty, Remark, Duedate, NID);
        res.status(200).send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }

}


//  รับต่า Support ไป Insert
async function InsertSupportModel(req, res) {
    try {
        console.log("Support");
        return
        const { Request, ItemCode, Qty, Remark, NID, M_incharge, dept, nameIncharge } = req.body
        const result = await db.InsertSupportModel(Request, ItemCode, Qty, Remark, NID, M_incharge, dept, nameIncharge);
        res.status(200).send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }
}

// รับต่า Transfer ไป Insert
async function InsertTransferModel(req, res) {
    try {
        console.log("Transfer");
        return
        const { Request, ItemCode, Qty, Remark, NID, M_incharge, dept, nameIncharge } = req.body
        const result = await db.InsertTransferModel(Request, ItemCode, Qty, Remark, NID, M_incharge, dept, nameIncharge);
        res.status(200).send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }
}

async function InsertNG(req, res) {
    try {
        console.log("NG");
        const { Request, ItemCode, Qty, Remark, NID } = req.body
        const result = await db.InsertNG(Request, ItemCode, Qty, Remark, NID);
        res.status(200).send(result)
    } catch (error) {
        console.error(`Error : ${error}`)
        res.status(500).send({ msg: `Error : ${error}` })
    }


}
// ************** End Show  Data  **********//


module.exports = {
    getNid,
    ShowRequestPage,
    CategoryName,
    SelectCategory,
    SearchInput,
    DeviceRemainTable,
    GetDataModel,
    SelectDepModal,
    SelectRequestModel,
    SelectManagmentModel,
    SelectInchageModel,
    InsertBorrowModel,
    InsertSupportModel,
    InsertTransferModel,
    InsertNG
}