
//express ตัว run server
const express = require('express');
const cookieSession = require('cookie-session');
const myController = require('../controllers/mycontroller');
const controller_Request = require('../controllers/controller_Request');
const controller_History = require('../controllers/controller_History');
const controller_Staff = require('../controllers/controller_Staff');
const controller_Approve = require('../controllers/controller_Approve');
const controllerPending = require('../controllers/controllerPending');
const controller_AddNew = require('../controllers/controller_AddNew');
const controller_AddQty = require('../controllers/controller_AddQty');
const fileController = require('../controllers/fileController');
const controller_login = require('../controllers/controller_login');
const { ifNotLoggedin, ifLoggedin } = require('../middleware/LoginMiddleware');
const controllerAccessDenied = require('../controllers/controllerAccessDenied');
const UploadsFile = require('../middleware/UploadsFile');

const router = express.Router();
router.use(
  cookieSession({
    name: 'session',
    keys: [
      'key1',
      'key2',
      'key3',
      'key4',
    ],

    // Cookie Options
    maxAge: 1 * 60 * 60 * 1000, // 1hr
  })
);
//ใช้แปลงข้อมูลที่ส่งมา ให้เป็น Json จาก body
const bodyParser = require('body-parser')
router.use(express.urlencoded({ extended: false })); //ถ้าจะเรียกใช้ pobyparser กำหนด defule ของ bodyparser
router.use(bodyParser.json());
router.post('/files', fileController.func_GetAttachedFileInRegisterNo)


// router.get('/nid/:nid',controller_Request.getNid);  

//----------------------------------- Access Denied Page ---------------------------------------//
router.get('/accessdenied', controllerAccessDenied.funcAccessDenied);
// login
router.get('/request', ifNotLoggedin, controller_Request.ShowRequestPage);
router.post('/UploadFileSaveAddNewDevices', UploadsFile.any(), controller_AddNew.UploadFile);
router.get('/nid/:nid', controller_login.getNid)
router.get('/login', ifNotLoggedin, controller_login.renderLoginPage);


//---------------------Request---------------------------//

// router.get('/request',controller_Request.ShowRequestPage);
router.get('/CategoryName', controller_Request.CategoryName);
router.get('/DeviceRemainTable', controller_Request.DeviceRemainTable);
router.post('/SelectCategory', controller_Request.SelectCategory);
router.post('/GetDataModel', controller_Request.GetDataModel);
router.get('/SelectDepModal', controller_Request.SelectDepModal);
router.get('/SelectRequestModel', controller_Request.SelectRequestModel);
router.post('/SearchInputRequest', controller_Request.SearchInput);
router.post('/SelectManagmentModel', controller_Request.SelectManagmentModel);
router.post('/SelectInchageModel', controller_Request.SelectInchageModel);
router.post('/InsertRequestBorrow', controller_Request.InsertBorrowModel);
router.post('/InsertRequestSupport', controller_Request.InsertSupportModel);
router.post('/InsertRequestTransfer', controller_Request.InsertTransferModel);
router.post('/InsertNG', controller_Request.InsertNG);
//---------------------Device---------------------------//


// //---------------------History---------------------------//
router.get('/history', ifNotLoggedin, controller_History.ShowHistoryPage);
router.post('/listHistory', controller_History.listHistory);
router.post('/GetDataItemCodebyId', controller_History.GetDataModel);
router.get('/selectReturn', controller_History.selectReturn);
router.post('/GetHistoryRequestBykeyword', controller_History.GetHistoryRequestBykeyword);
router.post('/UpdateReturnRequest', controller_History.UpdateReturn);


// router.get('/listRequest',controllerHistory.listRequest);


// router.get('/selectReturn',controllerHistory.selectReturn);
// router.get('/DepHistory',controllerHistory.selectdep);
// router.post('/ManagmentHistory',controllerHistory.SelectManagment);
// router.post('/InchageHistory',controllerHistory.SelectInchage);
// //---------------------History---------------------------//


// //---------------------Pending---------------------------//
router.get('/pending', ifNotLoggedin, controllerPending.StatusPage)
router.post('/Statuslist', controllerPending.listStatus);
router.post('/ModalStatusRequest', controllerPending.inputModal);
router.post('/CanCelRequestAdd', controllerPending.DeleteRequestAdd);
router.post('/CanCelRequestReq', controllerPending.DeleteRequestPending);

// //---------------------Status---------------------------//

// //---------------------Add Qty---------------------------//
router.get('/AddQtyPage', ifNotLoggedin, controller_AddQty.AddQtyPage)
router.get('/listAddQty', controller_AddQty.listAddQty);
router.get('/category', controller_AddQty.select_category);
router.post('/searchdeviceAddQty', controller_AddQty.searchdevice);
router.post('/ModalAddQty', controller_AddQty.inputModal);
router.post('/inputSearchAddQty', controller_AddQty.searchinput);
router.post('/InsertAddQty', controller_AddQty.AddQtyDevice);


// //---------------------Add New---------------------------//

router.get('/ItemCode', controller_AddNew.RunItemCode);
router.get('/AddNewPage', ifNotLoggedin, controller_AddNew.AddNewPage);
router.get('/listDevives', controller_AddNew.listAddNew);
router.get('/categoryAddNew', controller_AddNew.select_category); 
router.get('/VenderAddNew', controller_AddNew.select_Vender);
router.post('/searchdeviceNew', controller_AddNew.searchdevice);
router.post('/InsertAddNewDevice', controller_AddNew.AddNewDevice);
router.post('/SearchType', controller_AddNew.SearchType);
router.post('/SearchTypekeywords', controller_AddNew.SearchTypekeywords);




// //*************************//Staff//***********************//

// //---------------------Control New Request---------------------------//
router.get('/NewDevicesPage', ifNotLoggedin, controller_Staff.NewDevicesPage)
router.get('/NewRequestPage', ifNotLoggedin, controller_Staff.NewRequestPage)
router.get('/listNewRequest', controller_Staff.listNewrequest);
router.get('/selectlistRequest', controller_Staff.selectlistRequest);
router.post('/searchlistNewRequest', controller_Staff.searchlistNewRequest);
router.get('/HistoryRequest', controller_Staff.History_RequestAll);
router.get('/listRequest', controller_Staff.HistoryRequest);
router.post('/NewRequestModal', controller_Staff.HistoryRequestInModal);

// //--------------------History Request All---------------------------//
router.post('/SearchDeviceRequest', controller_Staff.searchistoryRequest);
// //---------------------Control New Devices---------------------------//
router.get('/listNewDevices', controller_Staff.listNewDevices);
router.get('/selectlistDevice', controller_Staff.selectlistDevice);
router.post('/searchlistNewDevice', controller_Staff.searchlistNewDevice);

// router.post('/modalNewDevice',controller_Staff.inputModalDevice);

// //--------------------History Device All---------------------------//
router.get('/HistoryAddall', controller_Staff.History_Addall);
router.get('/listAddAllDevices', controller_Staff.listAddallDevice);
router.post('/searchHistory', controller_Staff.searchhistory);
router.post('/itemmodel', controller_Staff.itemModel);
router.post('/UpdatePosition', controller_Staff.Update_Position);

// //*************************//Status//***********************//

//  Confirm Request
router.post('/UpadteBorrowConfrimStaff', controller_Staff.ConfrimBorrow);
router.post('/UpadteReturnConfrimStaff', controller_Staff.ConfrimReturn);
router.post('/UpadteNGConfrimStaff', controller_Staff.ConfrimNG);
router.post('/UpadteRejectConfrimStaff', controller_Staff.ButtonReject);
// Confirm Add
router.post('/UpadteConfirmAddStaff', controller_Staff.ConfirmADD);
router.post('/UpadteRejectAddStaff', controller_Staff.RejectADD);


// //*************************//Orderwaitsend//***********************//
router.get('/listOrderwaitsend' ,ifNotLoggedin,controller_Staff.listOrderwaitsend)
router.get('/Orderwaitsend', controller_Staff.OrderwaitSend);
router.post('/UpdateStatusOrder', controller_Staff.Update_InChargeStatus);
router.post('/Whereitemorder',controller_Staff.Where_itemOrder)


// //--------------------Approved---------------------------//
router.get('/ApprovedPage', ifNotLoggedin, controller_Approve.ApprovedPage);
router.get('/HistoryApprovedPage', ifNotLoggedin, controller_Approve.HistoryApprovedPage);
router.get('/listNewApproved', controller_Approve.listNewApproved);
router.get('/listApproved', controller_Approve.listApproved);
router.post('/searchApproved', controller_Approve.searchApproved);
router.post('/ModalApproved', controller_Approve.inputModalHistory);
//  Confirm Request
router.post('/ApprovedManager', controller_Approve.ApprovedManager);
router.post('/ApprovedManagerTransfer', controller_Approve.ApprovedManagertransfer);
router.post('/ApprovedManagerNG', controller_Approve.ApprovedManagerNG);
router.post('/RejectManager', controller_Approve.RejectManager);

module.exports = router;



