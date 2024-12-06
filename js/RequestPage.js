// กำหนดตัวแปลเพื่อทำการ get input
var selectRequest = document.getElementById("selectRequest");
var selectCategory = document.getElementById("selectCategory");
var inputSearch = document.getElementById("inputSearch");
var btnsearch = document.getElementById("btnsearch");
var textitemName = document.getElementById("textitemName");
var textcategory = document.getElementById("textcategory");
var textType = document.getElementById("textType");
var textQuantity = document.getElementById("textQuantity");
var textRemark = document.getElementById("textRemark");
var nameMoveToDept = document.getElementById("nameMoveToDept");
var nameManager = document.getElementById("nameManager");
var nameIncharge = document.getElementById("nameIncharge");
var date = document.getElementById("date");
const btnSend = document.getElementById('btnSend');
const PictureDevice = document.getElementById("PictureDevice");
const textRemain = document.getElementById("textRemain");

const lbID = document.getElementById("lbID");

// Get the modal elementvar
const myModal = document.getElementById("exampleModalToggle");
let modal = new bootstrap.Modal(myModal);

document.addEventListener("DOMContentLoaded", function () {
  console.log("Modal initialized");
  category();
  remaindevice();
  console.log(lbID.innerText.trim());

  // เพิ่มเหตุการณ์คลิกให้กับแถวในตาราง
  document
    .getElementById("table")
    .addEventListener("click", async function (e) {
      // ตรวจสอบว่าคลิกที่ td หรือไม่
      if (e.target.tagName === "TD") {
        // ดึงข้อมูลในแต่ละเซลล์ของแถวนี้
        let cells = Array.from(e.target.parentNode.children);
        // แปลงข้อมูลในเซลล์เป็นอาร์เรย์ของข้อความ
        let cellTexts = cells.map(function (cell) {
          return cell.innerText;
        });

        // กำหนดค่าของ input fields ใน modal
        const files = await fetchAttachedFiles(cellTexts[1]);
        //C:\Users\p8344\Desktop\Iot_devices\public\photo
        PictureDevice.src = `/photo/${cellTexts[1]}/${files[0]}`;

        textitemName.value = cellTexts[1];
        selectDataByitemcode(cellTexts[1]);
        textcategory.value = cellTexts[2];
        //  document.getElementById("textDescription").value = cellTexts[3];
        textType.value = cellTexts[3];
        textRemain.value = cellTexts[9];

        // แสดง modal

        await selectdepinmodal();
        await selectRequestModel();
        $("#nameManager").html("<option selected>Select Management</option>");
        $("#nameIncharge").html("<option selected>Select Inchage</option>");
        modal.show();
      }
    });
});

// ********************************* Qr-code ************************************//
let html5QrCode;
$("#btnOpenModal").click(function () {
  $("#modalQrCodeForPicking").modal("show");
  html5QrCode = new Html5Qrcode("reader");
});

$("#modalQrCodeForPicking").on("shown.bs.modal", function () {
  const config = { fps: 30, qrbox: { width: 400, height: 400 } };
  Html5Qrcode.getCameras()
    .then((devices) => {
      if (devices && devices.length) {
        var cameraId = devices[0].id;
        html5QrCode
          .start(cameraId, config, onScanSuccess, onScanFailure)
          .catch((err) => {
            console.error("Failed to start scanning", err);
          });
      }
    })
    .catch((err) => {
      console.error("Failed to get cameras", err);
    });
});

$("#modalQrCodeForPicking").on("hidden.bs.modal", function () {
  html5QrCode
    .stop()
    .then(() => {
      console.log("QR scanning stopped.");
    })
    .catch((err) => {
      console.error("Failed to stop scanning", err);
    });
});

function onScanSuccess(decodedText, decodedResult) {
  document.getElementById("tb_MaterialQRCode").value = decodedText;
  var changeEvent = new Event("change");
  document.getElementById("tb_MaterialQRCode").dispatchEvent(changeEvent);
  $("#modalQrCodeForPicking").modal("hide");
}

function onScanFailure(error) {
  console.warn(`QR scan error = ${error}`);
}
// ********************************* End Qr-code ************************************//

// ********************************* GET DATE ************************************//

// document.addEventListener("DOMContentLoaded", function () {
//   // เมื่อฟอร์มถูกส่ง, ตรวจสอบค่าในฟิลด์วันที่
//   document.querySelector("form").addEventListener("submit", function (e) {
//     // หาฟิลด์วันที่ด้วย id
//     var dateInput = document("date");

//     // ตรวจสอบว่าฟิลด์วันที่ว่างเปล่าหรือไม่
//     if (!dateInput.value) {
//       // หยุดการส่งฟอร์ม
//       e.preventDefault();
//       // แสดงข้อความแจ้งเตือนหรือทำอย่างอื่นตามต้องการ
//       alert("กรุณากรอกข้อมูลวันที่");
//     }
//   });
// });
// document.querySelector("form").addEventListener("submit", function (e) {
//   // หาฟิลด์วันที่ด้วย id
//   var dateInput = document("date");

//   // ตรวจสอบว่าฟิลด์วันที่ว่างเปล่าหรือไม่
//   if (!dateInput.value) {
//     // หยุดการส่งฟอร์ม
//     e.preventDefault();
//     // แสดงข้อความแจ้งเตือนหรือทำอย่างอื่นตามต้องการ
//     alert("กรุณากรอกข้อมูลวันที่");
//   }
// });
// ********************************* END GET DATE ************************************//

// ********************************* SEARCH DATA************************************//
// ------- Show Category
async function category() {
  const res = await axios.get("/devices/CategoryName");
  // console.log(res.data)
  let html = "";
  html = "<option>Open this select Category</option>";
  res.data.forEach((item) => {
    html += `
    <option value="${item.Category}">${item.Category}</option>`;
    // console.log(item.Category);
  });
  $("#selectCategory").html(html);
}

// ------- Select  Category show data on table
selectCategory.addEventListener("change", async () => {
  if (selectCategory.selectedIndex === 0) {
    remaindevice();
  } else {
    // console.log(inputSearch.value)
    const res = await axios.post("/devices/SelectCategory", {
      keywords: selectCategory.value,
    });
    // console.log(res.data)

    // return
    // $("#TableRemain").html('')
    let html = "";
    let n = 1;
    res.data.forEach((item) => {
      html += `
      <tr>
      <th scope="row">${n}</th>
      <td class="text-nowrap">${item.ItemCode}</td>
      <td class="text-nowrap">${item.Category}</td>
      <td  class="table1">${item.Type}</td>
      <td>${item.Total}</td>
      <td>${item.Borrow}</td>
      <td>${item.Transfer}</td>
      <td>${item.Support}</td>
      <td>${item.NG}</td>
      <td>${item.Remain}</td>
    </tr>
      `;
      n++;
      // console.log(item.Category);
    });
    $("#TableRemain").html(html);
  }
});

// ------- Serach  Category
btnsearch.addEventListener("click", async () => {
  if (selectCategory.selectedIndex === 0) {
    const res = await axios.post("/devices/SelectCategory", {
      keywords: inputSearch.value,
    });

    let html = "";
    let n = 1;
    res.data.forEach((item) => {
      html += `
    <tr>
    <th scope="row">${n}</th>
            <td class="text-nowrap">${item.ItemCode}</td>
            <td class="text-nowrap">${item.Category}</td>
            <td  class="table1">${item.Type}</td>
            <td>${item.Total}</td>
            <td>${item.Borrow}</td>
            <td>${item.Transfer}</td>
            <td>${item.Support}</td>
            <td>${item.NG}</td>
            <td>${item.Remain}</td>
          </tr>
  </tr>
`;
      n++;
      // console.log(item.Category);
    });
    $("#TableRemain").html(html);
    return;
    remaindevice();
  } else {
    const res = await axios.post("/devices/SearchInputRequest", {
      category: selectCategory.value,
      keywords: inputSearch.value,
    });
    // console.log(res.data)

    let html = "";
    let n = 1;
    res.data.forEach((item) => {
      html += `
    <tr>
    <th scope="row">${n}</th>
    <td class="text-nowrap">${item.ItemCode}</td>
    <td class="text-nowrap">${item.Category}</td>
    <td  class="table1">${item.Type}</td>
    <td>${item.Total}</td>
    <td>${item.Borrow}</td>
    <td>${item.Transfer}</td>
    <td>${item.Support}</td>
    <td>${item.NG}</td>
    <td>${item.Remain}</td>
  </tr>
    `;
      n++;
      // console.log(item.Category);
    });
    $("#TableRemain").html(html);
  }
});
// ********************************* END SEARCH DATA ************************************//

// ********************************* SHOW DATA TABLE ************************************//
// --------- Show Data on Table
async function remaindevice() {
  const res = await axios.get("/devices/DeviceRemainTable");
  let html = "";
  let n = 1;
  res.data.forEach((item) => {
    html += `
    <tr>
            <th scope="row">${n}</th>
            <td class="text-nowrap">${item.ItemCode}</td>
            <td class="text-nowrap">${item.Category}</td>
            <td  class="table1">${item.Type}</td>
            <td>${item.Total}</td>
            <td>${item.Borrow}</td>
            <td>${item.Transfer}</td>
            <td>${item.Support}</td>
            <td>${item.NG}</td>
            <td>${item.Remain}</td>
          </tr>
    `;
    n++;
    // console.log(item.Category);
  });
  $("#TableRemain").html(html);
}
// ********************************* END SHOW TABLE ************************************//

// ********************************* SHOW DATA MODEL ************************************//

// --------- Show Data on Model When on table  not have data want to use
async function selectDataByitemcode(itemCode) {
  const res = await axios.post("/devices/GetDataModel", {
    keyword: itemCode,
  });
  document.getElementById("textDescription").value = res.data[0].Description;
}

// --------- Show Dep Data on Model
async function selectdepinmodal() {
  const res = await axios.get("/devices/SelectDepModal");
  let html = "";
  html = "<option>Select Dept</option>";
  res.data.forEach((item) => {
    html += `
    <option value="${item.Department}">${item.Department}</option>`;
    // console.log(item.Category);
  });
  $("#nameMoveToDept").html(html);
}

// --------- Show Request Model
async function selectRequestModel() {
  const res = await axios.get("/devices/SelectRequestModel");
  let html = "";
  html = "<option>Select Request</option>";
  res.data.forEach((item) => {
    html += `
    <option value="${item.StatusRequest}">${item.StatusRequest}</option>`;
    // console.log(item.Category);
  });
  $("#selectRequest").html(html);
}
// ********************************* END SHOW DATA MODEL ************************************//

// ********************************* FUNCTION SELECT************************************//

// Function Request
selectRequest.addEventListener("change", async () => {
  // ตัวอย่างการตั้งค่าสถานะและ class
  const fields = [
    textQuantity,
    textRemark,
    nameMoveToDept,
    nameManager,
    nameIncharge,
    date,
  ];

  fields.forEach((field) => {
    if (selectRequest.selectedIndex === 1) {
      textQuantity.disabled = false;
      textRemark.disabled = false;
      nameMoveToDept.disabled = true;
      nameManager.disabled = true;
      nameIncharge.disabled = true;
      date.disabled = false;
    } else if (selectRequest.selectedIndex === 3) {
      textQuantity.disabled = false;
      textRemark.disabled = false;
      nameMoveToDept.disabled = true;
      nameManager.disabled = true;
      nameIncharge.disabled = true;
      date.disabled = true;
    } else if (
      selectRequest.selectedIndex === 2 ||
      selectRequest.selectedIndex === 4
    ) {
      textQuantity.disabled = false;
      textRemark.disabled = false;
      nameMoveToDept.disabled = false;
      nameManager.disabled = false;
      nameIncharge.disabled = false;
      date.disabled = true;
    } else {
      textQuantity.disabled = false;
      textRemark.disabled = false;
      nameMoveToDept.disabled = false;
      nameManager.disabled = false;
      nameIncharge.disabled = false;
      date.disabled = true;
    }

    // กำหนด class ตามสถานะ disabled
    if (field.disabled) {
      field.classList.add("disabledField");
      field.classList.remove("enabledField");
    } else {
      field.classList.add("enabledField");
      field.classList.remove("disabledField");
    }
  });
});

// Function Select Dep on Model
nameMoveToDept.addEventListener("change", async () => {
  if (nameMoveToDept.selectedIndex !== 0) {
    // api เรียกmanagment
    const res = await axios.post("/devices/SelectManagmentModel", {
      Department: nameMoveToDept.value,
    });
    let html = "";
    html = " <option selected>Select Management </option>";
    res.data.forEach((item) => {
      html += `
    <option value="${item.First_LastName} ">${item.First_LastName}</option>`;
      // console.log(item.Category);
    });
    $("#nameManager").html(html);

    //api เรียก inchage
    const res2 = await axios.post("/devices/SelectInchageModel", {
      Department: nameMoveToDept.value,
    });
    let html2 = "";
    html2 = " <option selected>Select Inchage</option>";
    res2.data.forEach((item) => {
      html2 += `
    <option value="${item.First_LastName} ">${item.First_LastName}</option>`;
      // console.log(item.Category);
    });
    $("#nameIncharge").html(html2);
  } else {
    // api เรียกmanagment
    const res = await axios.post("/devices/SelectManagmentModel", {
      Department: nameMoveToDept.value,
    });
    let html = "";
    html = " <option selected>Select Management </option>";
    res.data.forEach((item) => {
      html += `
  <option value=""></option>`;
    });
    $("#nameManager").html(html);

    //api เรียก inchage
    const res2 = await axios.post("/devices/SelectInchageModel", {
      Department: nameMoveToDept.value,
    });
    let html2 = "";
    html2 = "<option selected>Select Inchage</option>";
    res2.data.forEach((item) => {
      html2 += `
<option value=""></option>`;
      // console.log(item.Category);
    });
    $("#nameIncharge").html(html2);
  }
});

// ********************************* END FUNCTION SELECT************************************//

// ********************************* BUTTON  ************************************//
// ปุ่มกดส่ง

async function clearInputSelectBeforeCloseModal() {
  const inputs = myModal.querySelectorAll('input[type="text"], textarea');
  inputs.forEach(input => {
    input.value = ""; // Clear each input field
  });

  const selects = myModal.querySelectorAll("select");
  selects.forEach(select => {
    select.selectedIndex = 0; // Reset select to the first option
  });
}


btnSend.addEventListener("click", async function () {
  // event.preventDefault();
  let strRequest = selectRequest.selectedIndex;
  let strDepartment = nameMoveToDept.selectedIndex;
  let strQuantity = Number(textQuantity.value);
  let strtextRemark = textRemark.value;
  let strManagement = nameManager.selectedIndex;
  let strInchage = nameIncharge.selectedIndex;
  let strDate = document.getElementById("date").value; // รับค่าวันที่จากฟิลด์
  let strRemain = Number(textRemain.value);

  // function validateInput(input) {
  if (strQuantity > strRemain) {
    alert(strQuantity, strRemain);
    alert("Sorry, the quantity is not enough.\nขออภัย จำนวนของไม่เพียงพอ");
    return;
  }
  // }
  // console.log(strQuantity, strRemain);
  // console.log(validateInput());
  // 
  if (strRequest === 1) {
    if (strQuantity !== "" && strDate !== "") {
      const res = await axios.post("/devices/InsertRequestBorrow", {
        Request: selectRequest.value,
        ItemCode: textitemName.value,
        Qty: textQuantity.value,
        Remark: textRemark.value,
        Duedate: document.getElementById("date").value,
        NID: lbID.innerText.trim(),
        dept: nameMoveToDept.value,
      })

      console.log(res);
      if (!res.status === 200) {
        throw new Error("Failed to insert data.");
      }
      await clearInputSelectBeforeCloseModal()
      alert("Sent Request Borrow\nส่งคำขอยืมอุปกรณ์เรียบร้อย")
      modal.hide();
    } else {
      console.log("NG");
      if (strQuantity === "") {
        alert("Please enter the quantity you want.\nกรุณากรอกจำนวนที่ต้องการ");
      } else {
        alert("Please enter Duedate.\nกรุณากรอก Duedate");
      }
    }
  } else if (strRequest === 3) {
    if (strQuantity !== "") {
      console.log(selectRequest.value);
      // return
      const res = await axios.post("/devices/InsertNG", {
        Request: selectRequest.value,
        ItemCode: textitemName.value,
        Qty: textQuantity.value,
        Remark: textRemark.value,
        NID: lbID.innerText.trim(),
      });

      console.log(res);
      if (!res.status === 200) {
        throw new Error("Failed to insert data.");
      }
      await clearInputSelectBeforeCloseModal()
      alert("Sent Request NG\nส่งคำขออุปกรณ์เสียหายเรียบร้อย")
      modal.hide();
    } else {
      console.log("NG");
      if (strQuantity === "") {
        alert("Please enter the quantity you want.\nกรุณากรอกจำนวนที่ต้องการ");
      }
    }
  } else if (strRequest === 2 || strRequest === 4) {
    if (
      strDepartment !== 0 &&
      strQuantity !== "" &&
      strManagement !== 0 &&
      strInchage !== 0
    ) {
      if (strRequest === 2) {
        console.log(selectRequest.value);
        // return
        // const res = await axios.post("/devices/InsertRequestTransfer", {
        //   Request: selectRequest.value,
        //   ItemCode: textitemName.value,
        //   Qty: textQuantity.value,
        //   Remark: textRemark.value,
        //   M_incharge: nameManager.value,
        //   NID: lbID.innerText.trim(),
        //   dept: nameMoveToDept.value,
        //   nameIncharge: nameIncharge.value,
        // });

        // console.log(res);
        // if (!res.status === 200) {
        //   throw new Error("Failed to insert data.");
        // }
        await clearInputSelectBeforeCloseModal()
        alert("Sent Request Transfer\nส่งคำขอโอนย้ายเรียบร้อย")
        modal.hide();

      } else if (strRequest === 4) {
        console.log(selectRequest.value);
        // return
        // const res = await axios.post("/devices/InsertRequestSupport", {
        //   Request: selectRequest.value,
        //   ItemCode: textitemName.value,
        //   Qty: textQuantity.value,
        //   Remark: textRemark.value,
        //   M_incharge: nameManager.value,
        //   NID: lbID.innerText.trim(),
        //   dept: nameMoveToDept.value,
        //   nameIncharge: nameIncharge.value,
        // });

        // console.log(res);
        // if (!res.status === 200) {
        //   throw new Error("Failed to insert data.");
        // }
        await clearInputSelectBeforeCloseModal()
        alert("Sent Request Support\nส่งคำขอสนับสนุนเรียบร้อย")
        modal.hide();
      }
    } else {
      console.log("NG");
      if (strDepartment === 0) {
        alert("Please fill in Department\nกรุณากรอก Department");
      } else if (strQuantity === "") {
        alert("Please enter the quantity you want.\nกรุณากรอกจำนวนที่ต้องการ");
      } else if (strManagement === 0) {
        alert("Please fill in Managment\nกรุณากรอก Managment");
      } else {
        alert("Please fill in Inchage\nกรุณากรอก Inchage");
      }
    }
  } else {
    console.log("NG");
    alert("Please fill out Request\nกรุณากรอก Request");
  }
});
// ********************************* END BUTTON ************************************//

// ********************************* CLEAR MODEL  ************************************//
// Close Model
// var sendButton = document.getElementById('btnSend');
// sendButton.addEventListener('click', function () {
//   var modalElement = document.getElementById('exampleModalToggle'); // หา element ของ modal
//   var modalInstance = bootstrap.Modal.getInstance(modalElement); // สร้าง instance ของ modal
//   modalInstance.hide(); // ปิด modal
// });

var sendButton = document.getElementById("btnClose");
sendButton.addEventListener("click", function () {
  var modalElement = document.getElementById("exampleModalToggle"); // หา element ของ modal
  var modalInstance = bootstrap.Modal.getInstance(modalElement); // สร้าง instance ของ modal
  modalInstance.hide(); // ปิด modal
});

//reset modern
// var sendButton = document.getElementById('btnSend');
// sendButton.addEventListener('click', function () {
//   // ค้นหา modal และ instance ของ modal
//   var modalElement = document.getElementById('exampleModalToggle');
//   var modalInstance = bootstrap.Modal.getInstance(modalElement);

//   // ล้างค่าของ input fields ที่อยู่ภายใน modal
//   var inputs = modalElement.querySelectorAll('input');
//   inputs.forEach(function (input) {
//     input.value = ''; // ล้างค่า
//   });

// ล้างค่าของ textarea ถ้ามี
//   var textareas = modalElement.querySelectorAll('textarea');
//   textareas.forEach(function (textarea) {
//     textarea.value = ''; // ล้างค่า
//   });

//   // ล้างค่าของ select elements ถ้ามี
//   var selects = modalElement.querySelectorAll('select');
//   selects.forEach(function (select) {
//     select.selectedIndex = 0; // ตั้งค่าเป็น option แรก (สมมติว่าเป็นค่าเริ่มต้น)
//   });

//   // ปิด modal
//   modalInstance.hide();
// });

var sendButton = document.getElementById("btnClose");
sendButton.addEventListener("click", function () {
  // ค้นหา modal และ instance ของ modal
  var modalElement = document.getElementById("exampleModalToggle");
  var modalInstance = bootstrap.Modal.getInstance(modalElement);

  // ล้างค่าของ input fields ที่อยู่ภายใน modal
  var inputs = modalElement.querySelectorAll("input");
  inputs.forEach(function (input) {
    input.value = ""; // ล้างค่า
  });

  // ล้างค่าของ textarea ถ้ามี
  var textareas = modalElement.querySelectorAll("textarea");
  textareas.forEach(function (textarea) {
    textarea.value = ""; // ล้างค่า
  });

  // ล้างค่าของ select elements ถ้ามี
  var selects = modalElement.querySelectorAll("select");
  selects.forEach(function (select) {
    select.selectedIndex = 0; // ตั้งค่าเป็น option แรก (สมมติว่าเป็นค่าเริ่มต้น)
  });

  // ปิด modal
  modalInstance.hide();
});

// ********************************* END CLEAR MODEL ************************************//

// ********************************* Show photo ************************************//

async function fetchAttachedFiles(registerNo) {
  try {
    const response = await axios.post("/devices/files", {
      RegisterNo: registerNo,
    });

    // return
    // console.log(response.data);
    // console.log(response.data.files);
    // response.data.files.forEach(element =>{
    //   console.log(element);
    // })
    return response.data.files;
  } catch (error) {
    console.error("Error fetching attached files:", error);
    return [];
  }
}
// ********************************* end show photo ************************************//
