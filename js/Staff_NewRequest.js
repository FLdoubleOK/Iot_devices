const selectCategory = document.getElementById("selectCategory");
const textitemName = document.getElementById("textitemName");
const textcategory = document.getElementById("textcategory");
const textType = document.getElementById("textType");
const textDepartment = document.getElementById("textDepartment");
const textQuantity = document.getElementById("textQuantity");
const textselectVender = document.getElementById("textselectVender");
const textRemark = document.getElementById("textRemark");
let ID = document.getElementById("ID");
const PictureDevice = document.getElementById('PictureDevice')
const btnApproved = document.getElementById('btnApproved');
const btnRejected = document.getElementById('btnRejected');


// get the modal and get value html table to input modal
const myModal = document.getElementById("exampleModalToggle");
let modal = new bootstrap.Modal(myModal);
//  HTML พร้อมแสดงผล
$(document).ready(function () {
  console.log("Modal initialized");
  listNewRequest();
  category();

  // เพิ่มเหตุการณ์คลิกให้กับแถวในตาราง
  $("#table").on("click", "td", async function () {
    // ดึงข้อมูลในแต่ละเซลล์ของแถวนี้
    let cells = Array.from(this.parentNode.children);
    // แปลงข้อมูลในเซลล์เป็นอาร์เรย์ของข้อความ
    let cellTexts = cells.map(function (cell) {
      return cell.innerText;
    });
    localStorage.setItem("ID", cellTexts[1]);
    const files = await fetchAttachedFiles(cellTexts[4]);
    PictureDevice.src = `/photo/${cellTexts[4]}/${files[0]}`;
    textitemName.value = cellTexts[4];
    selectDataByitemcode(cellTexts[4])
    document.getElementById("textstatus").value = cellTexts[3];
    textcategory.value = cellTexts[5];
    textDepartment.value = cellTexts[9];
    textQuantity.value = cellTexts[7];
    textRemark.value = cellTexts[8];
    modal.show();
  });
});


// Store the initial selected value
var initialSelectedValue = document.getElementById("selectCategory").value;

function resetFormSelect() {
  // Reset the form-select element to the initial selected value
  document.getElementById("my").value = initialSelectedValue;
}


// ********************************* SHOW DATA MODEL ************************************//
async function listNewRequest() {
  const res = await axios.get(
    "/devices/listNewRequest"
  );
  // console.log(res.data)
  let html = "";
  let n = 1;
  res.data.forEach((item) => {
    html += `
  <tr style="font-size: 13px;">
          <th scope="row">${n}</th>
          <th scope="row" class="ID">${item.ID}</th>
          <td class="text-nowrap">${item.Status}</td>
          <td class="text-nowrap">${item.Request}</td>
          <td class="text-nowrap">${item.ItemCode}</td>
          <td>${item.Category}</td>
          <td>${item.Position}</td>
          <td>${item.Quantity}</td>
          <td >${item.Remark}</td>
          <td>${item.Department}</td>
          <td>${item.RequestBy}</td>
          <td class="text-nowrap">${item.UpdateDate}</td>
        </tr>
  `;
    n++;
    // console.log(item.Category);
  });
  $("#tablelist").html(html);
  // document.getElementById("countWaitConfirmRequest").innerHTML = res.data.length
}

async function selectDataByitemcode(itemCode) {
  const res = await axios.post('/devices/NewRequestModal', {
    keywords: itemCode
  })
  console.log(res.data[0])
  document.getElementById("textType").value = res.data[0].Type;
  document.getElementById("textPosition").value = res.data[0].Position;
}
// ********************************* END SHOW DATA MODEL ************************************//

// ********************************* SEARCH DATA************************************//
//show data html
async function category() {
  const res = await axios.get(
    "/devices/selectlistRequest"
  );
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


// กดหนดให้คลิกเลือกหมวดหมู่แล้วมาโชว์บนตาราง
async function searchinputdevice2() {
  // console.log(inputSearch.value)
  const res = await axios.post(
    "/devices/searchlistNewRequest",
    {
      keyword: selectCategory.value,
    }
  );
  // console.log(res.data)

  // return
  // $("#TableRemain").html('')
  let html = "";
  let n = 1;
  res.data.forEach((item) => {
    html += `
      <tr style="font-size: 13px;">
              <th scope="row">${n}</th>
              <th scope="row" class="ID">${item.ID}</th>
              <td class="text-nowrap">${item.Status}</td>
              <td class="text-nowrap">${item.Request}</td>
              <td class="text-nowrap">${item.ItemCode}</td>
              <td>${item.Category}</td>
              <td>${item.Position}</td>
              <td>${item.Quantity}</td>
              <td >${item.Remark}</td>
              <td>${item.Department}</td>
              <td>${item.RequestBy}</td>
              <td class="text-nowrap">${item.UpdateDate}</td>
            </tr>
      `;
    n++;
    // console.log(item.Category);
  });
  $("#tablelist").html(html);
}

//กำหนด function การคลิก
selectCategory.addEventListener('change', async () => {
  if (selectCategory.selectedIndex === 0) {
    listNewRequest()
  } else {
    searchinputdevice2()
  }
})
// selectCategory.addEventListener("change", () => {
//   searchinputdevice2();
// });
// ********************************* END SEARCH DATA ************************************//

// ********************************* Qr-code ************************************//
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
async function clearInputSelectBeforeCloseModal() {
  var inputs = myModal.querySelectorAll('input[type="text"], textarea,input[type="Request"]');
  inputs.forEach(function (input) {
    input.value = ""; // Clear each input field
  });
}

btnApproved.addEventListener('click', async function (event) {
  const ID = localStorage.getItem("ID")
  const textstatus = document.getElementById("textstatus").value;
  let strtextRemark = textRemark.value;
  console.log(textstatus);

  console.log(ID);
  // return
  // ตอนนี้คุณมีค่า ID, คุณสามารถใช้มันในการส่งข้อมูลได้
  if (textstatus === 'Borrow') {
    const res = await axios.post('/devices/UpadteBorrowConfrimStaff', {
      ID: ID, // ส่งค่า ID ไปยังเซิร์ฟเวอร์ในรูปแบบของ object
      Remark: textRemark.value
    });
    console.log(res);
    if (!res.status === 200) {
      throw new Error("Failed to insert data.");
    }
    alert("Sent Confirm Request \nส่งยืนยันคำขอเรียบร้อย ")
    await listNewRequest()
    modal.hide();
  } else if (textstatus === 'Return') {
    const res = await axios.post('/devices/UpadteReturnConfrimStaff', {
      ID: ID, // ส่งค่า ID ไปยังเซิร์ฟเวอร์ในรูปแบบของ object
      Remark: textRemark.value
    });
    console.log(res);
    if (!res.status === 200) {
      throw new Error("Failed to insert data.");
    }
    alert(" Sent Confirm Request \nส่งยืนยันคำขอเรียบร้อย")
    await listNewRequest()
    modal.hide();
  } else {
    const res = await axios.post('/devices/UpadteNGConfrimStaff', {
      ID: ID, // ส่งค่า ID ไปยังเซิร์ฟเวอร์ในรูปแบบของ object
      Remark: textRemark.value
    });
    console.log(res);
    if (!res.status === 200) {
      throw new Error("Failed to insert data.");
    }
    alert("Sent Confirm Request \nส่งยืนยันคำขอเรียบร้อย")
    await listNewRequest()
    modal.hide();
  }

})


btnRejected.addEventListener('click', async function (event) {
  const ID = localStorage.getItem("ID")
  let strtextRemark = textRemark.value;
  console.log(ID);
  if (strtextRemark !== '') {
    // return
    // ตอนนี้คุณมีค่า ID, คุณสามารถใช้มันในการส่งข้อมูลได้
    const res = await axios.post('/devices/UpadteRejectConfrimStaff', {
      ID: ID, // ส่งค่า ID ไปยังเซิร์ฟเวอร์ในรูปแบบของ object
      Remark: textRemark.value
    });
    if (!res.status === 200) {
      throw new Error("Failed to insert data.");
    }
    console.log(res);
    alert("Sent Reject Request Add\nส่งปฏิเสธคำขอเรียบร้อย")
    clearInputSelectBeforeCloseModal()
    await listNewRequest()
    modal.hide();
  } else {
    alert("Please enter a reason.\nกรุณาใส่เหตุผล")
  }
})

// ********************************* END BUTTON ************************************//

// ********************************* Show photo ************************************//



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
// ********************************* end show photo ************************************//