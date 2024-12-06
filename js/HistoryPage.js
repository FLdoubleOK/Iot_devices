// ประกาศตัวแปร
var inputSearch = document.getElementById('inputSearch');
var selectRequest = document.getElementById('selectRequest');
var textitemName = document.getElementById('textitemName');
var textcategory = document.getElementById('textcategory');
var textType = document.getElementById('textType');
var textQuantity = document.getElementById('textQuantity');
var textRemark = document.getElementById('textRemark');
var SelectDept = document.getElementById('SelectDept');
var selectManager = document.getElementById('selectManager');
var SelectIncharge = document.getElementById('SelectIncharge');
let ID = document.getElementById("ID");
const PictureDevice = document.getElementById('PictureDevice')

const lbID = document.getElementById("lbID")

// get the modal and get value html table to input modal
const myModal = document.getElementById("exampleModalToggle");
let modal = new bootstrap.Modal(myModal);
document.addEventListener("DOMContentLoaded", function () {
  console.log("Modal initialized");
  listHistory()
  console.log(lbID.innerText.trim());


  // เพิ่มเหตุการณ์คลิกให้กับแถวในตาราง
  document.getElementById("table").addEventListener("click", async function (e) {
    // ตรวจสอบว่าคลิกที่ td หรือไม่
    if (e.target.tagName === "TD") {
      // ดึงข้อมูลในแต่ละเซลล์ของแถวนี้
      let cells = Array.from(e.target.parentNode.children);
      // แปลงข้อมูลในเซลล์เป็นอาร์เรย์ของข้อความ
      let cellTexts = cells.map(function (cell) {
        return cell.innerText;
      });

      // กำหนดค่าของ input fields ใน modal
      localStorage.setItem("ID", cellTexts[1]);
      const files = await fetchAttachedFiles(cellTexts[4]);
      //C:\Users\p8344\Desktop\Iot_devices\public\photo
      PictureDevice.src = `/photo/${cellTexts[4]}/${files[0]}`;
      textitemName.value = cellTexts[4];
      selectDataByitemcode(cellTexts[1])
      textcategory.value = cellTexts[5];
      //  document.getElementById("textDescription").value = cellTexts[3];
      document.getElementById("QuantityDisabled").value = cellTexts[7];

      await selectReturn()
      $("#selectManager").html('<option selected>Select Management</option>')
      $("#SelectIncharge").html('<option selected>Select Inchage</option>')
      // แสดง modal
      modal.show();
    }
  });
});

// ********************************* SEARCH DATA************************************//
btnsearch.addEventListener('click', async () => {
  console.log(inputSearch.value)
  const res = await axios.post('/devices/GetHistoryRequestBykeyword', {
    keywords: inputSearch.value,
    NID: lbID.innerText.trim()

  })
  let html = '';
  let n = 1
  res.data.forEach(item => {
    html += `
  <tr style="font-size: 13px;">
  <th scope="row">${n}</th>
  <th scope="row">${item.ID}</th>
  <td class="text-nowrap">${item.Status}</td>
  <td>${item.Request}</td>
  <td class="text-nowrap">${item.ItemCode}</td>
  <td class="text-nowrap table1" >${item.Category}</td>
  <td >${item.Type}</td>
  <td>${item.Quantity}</td>
  <td>${item.Department}</td>
  <td class="text-nowrap">${item.RequestBy}</td>
  <td >${item.Remark}</td>
  <td class="text-nowrap">${item.BorrowDate}</td>
  <td class="text-nowrap">${item.UpdateDate}</td>
  <td class="text-nowrap">${item.DueDate}</td>
        </tr>
  `
    n++
    // console.log(item.Category);
  });
  $("#TableRemain").html(html)


})
// ********************************* END SEARCH DATA ************************************//

// ********************************* SHOW DATA TABLE ************************************//

async function listHistory() {

  const res = await axios.post('/devices/listHistory', {
    NID: lbID.innerText.trim()
  })
  // console.log(res.data)
  let html = '';
  let n = 1
  res.data.forEach(item => {
    html += `
  <tr style="font-size: 13px;">
          <th scope="row">${n}</th>
          <th scope="row">${item.ID}</th>
          <td class="text-nowrap">${item.Status}</td>
          <td>${item.Request}</td>
          <td class="text-nowrap">${item.ItemCode}</td>
          <td class="text-nowrap table1" >${item.Category}</td>
          <td >${item.Type}</td>
          <td>${item.Quantity}</td>
          <td>${item.Department}</td>
          <td class="text-nowrap">${item.RequestBy}</td>
          <td >${item.Remark}</td>
          <td class="text-nowrap">${item.BorrowDate}</td>
          <td class="text-nowrap">${item.UpdateDate}</td>
          <td class="text-nowrap">${item.DueDate}</td>
        </tr>
  `
    n++
    // console.log(item.Category);
  });
  $("#TableRemain").html(html)

}
// ********************************* END SHOW TABLE ************************************//


// ********************************* SHOW DATA MODEL ************************************//
//select data into modal
async function selectDataByitemcode(ID) {
  console.log(ID);
  const res = await axios.post('/devices/GetDataItemCodebyId', {
    ID: ID
  })
  console.log(res.data[0]);
  document.getElementById("textDescription").value = res.data[0].Description;
  document.getElementById("textType").value = res.data[0].Type;
}
// ********************************* END SHOW DATA MODEL ************************************//

// ********************************* FUNCTION SELECT************************************//
selectRequest.addEventListener("change", function () {
  // Get the value of the selected option
  var selectedOption = selectRequest.value;
  if (selectedOption === "Return") {
    textRemark.disabled = false;
    // SelectDept.disabled = true;
    // selectManager.disabled = true;
    // SelectIncharge.disabled = true;
  } else if (selectedOption === "NG") {
    textRemark.disabled = false;
    // SelectDept.disabled = true;
    // selectManager.disabled = false;
    // SelectIncharge.disabled = false;
  } else {
    textRemark.disabled = true;
    // SelectDept.disabled = true;
    // selectManager.disabled = true;
    // SelectIncharge.disabled = true;
  }
});



//select Return
async function selectReturn() {
  const res = await axios.get('/devices/selectReturn')
  let html = '';
  html = '<option>Select Request</option>'
  res.data.forEach(item => {
    html += `
    <option value="${item.StatusRequest}">${item.StatusRequest}</option>`
    // console.log(item.Category);
  });
  $("#selectRequest").html(html)
}


// ********************************* END FUNCTION SELECT************************************//


// ********************************* BUTTON  ************************************//
// ปุ่มกดส่ง


async function clearInputSelectBeforeCloseModal() {
  var inputs = myModal.querySelectorAll('input[type="text"], textarea');
  inputs.forEach(function (input) {
    input.value = ""; // Clear each input field
  });

  var selects = myModal.querySelectorAll("select");

  selects.forEach(function (select) {
    select.selectedIndex = 0; // Reset select to the first option
  });
}

btnSave.addEventListener('click', async function (event) {
  let strRequest = selectRequest.selectedIndex;
  let strtextRemark = textRemark.value;
  const ID = localStorage.getItem("ID")
  console.log(ID);

  if (strRequest === 1) {
    const res = await axios.post('/devices/UpdateReturnRequest', {
      ID: ID,
      Remark: textRemark.value
    })

    console.log(res);
    if (!res.Status === 200) {
      throw new Error("Faild to insert data");
    }
    await clearInputSelectBeforeCloseModal()
    alert("Sent Request Return\nส่งคำขอส่งคืนอุปกรณ์แล้ว")
    modal.hide();
  } else {
    console.log('NG')
    alert('กรุณากรอก Request\nPlease fill in Request ')
  }
})




// ********************************* END BUTTON ************************************//


// ********************************* CLEAR MODEL  ************************************//
// close modern
// var sendButton = document.getElementById('btnSave');
// sendButton.addEventListener('click', function () {
//   var modalElement = document.getElementById('exampleModalToggle'); // หา element ของ modal
//   var modalInstance = bootstrap.Modal.getInstance(modalElement); // สร้าง instance ของ modal
//   modalInstance.hide(); // ปิด modal
// });

var sendButton = document.getElementById('btnClose');
sendButton.addEventListener('click', function () {
  var modalElement = document.getElementById('exampleModalToggle'); // หา element ของ modal
  var modalInstance = bootstrap.Modal.getInstance(modalElement); // สร้าง instance ของ modal
  modalInstance.hide(); // ปิด modal
});


// reset Modern
// document.getElementById('btnSave').addEventListener('click', function () {
//   // Get the modal element
//   var modalElement = document.getElementById('exampleModalToggle');

//   // Reset input fields
//   var inputs = modalElement.querySelectorAll('input');
//   inputs.forEach(function (input) {
//     input.value = ''; // Clear the value

//   });

//   // Reset textarea fields
//   var textareas = modalElement.querySelectorAll('textarea');
//   textareas.forEach(function (textarea) {
//     textarea.value = ''; // Clear the value
//   });

//   // Reset select elements
//   var selects = modalElement.querySelectorAll('select');
//   selects.forEach(function (select) {
//     select.selectedIndex = 0; // Reset to the first option
//   });
// });


document.getElementById('btnClose').addEventListener('click', function () {
  // Get the modal element
  var modalElement = document.getElementById('exampleModalToggle');

  // Reset input fields
  var inputs = modalElement.querySelectorAll('input');
  inputs.forEach(function (input) {
    input.value = ''; // Clear the value

  });

  // Reset textarea fields
  var textareas = modalElement.querySelectorAll('textarea');
  textareas.forEach(function (textarea) {
    textarea.value = ''; // Clear the value
  });

  // Reset select elements
  var selects = modalElement.querySelectorAll('select');
  selects.forEach(function (select) {
    select.selectedIndex = 0; // Reset to the first option
  });
});

// ********************************* END CLEAR MODEL ************************************//

// ********************************* Qr-code ************************************//
// Qr-Code
let html5QrCode;
$('#btnOpenModal').click(function () {
  $('#modalQrCodeForPicking').modal('show');
  html5QrCode = new Html5Qrcode("reader");
});

$('#modalQrCodeForPicking').on('shown.bs.modal', function () {
  const config = { fps: 30, qrbox: { width: 400, height: 400 } };
  Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
      var cameraId = devices[0].id;
      html5QrCode.start(cameraId, config, onScanSuccess, onScanFailure)
        .catch((err) => {
          console.error("Failed to start scanning", err);
        });
    }
  }).catch((err) => {
    console.error("Failed to get cameras", err);
  });
});

$('#modalQrCodeForPicking').on('hidden.bs.modal', function () {
  html5QrCode.stop().then(() => {
    console.log("QR scanning stopped.");
  }).catch((err) => {
    console.error("Failed to stop scanning", err);
  });
});

function onScanSuccess(decodedText, decodedResult) {
  document.getElementById('tb_MaterialQRCode').value = decodedText;
  var changeEvent = new Event("change");
  document.getElementById('tb_MaterialQRCode').dispatchEvent(changeEvent);
  $('#modalQrCodeForPicking').modal('hide');
}

function onScanFailure(error) {
  console.warn(`QR scan error = ${error}`);
}

// ********************************* End Qr-code ************************************//


async function fetchAttachedFiles(registerNo) {
  try {
    const response = await axios.post('/devices/files', { RegisterNo: registerNo });

    // return
    // console.log(response.data);
    // console.log(response.data.files);
    // response.data.files.forEach(element =>{
    //   console.log(element);
    // })
    return response.data.files;
  } catch (error) {
    console.error('Error fetching attached files:', error);
    return [];
  }
}