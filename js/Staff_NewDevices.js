
const selectCategory = document.getElementById("selectCategory");
const textitemName = document.getElementById("textitemName");
const textcategory = document.getElementById("textcategory");
const textType = document.getElementById("textType");
const textDepartment = document.getElementById("textDepartment");
const textQuantity = document.getElementById("textQuantity");
const selectVendert = document.getElementById("selectVender");
const textselectVender = document.getElementById("textselectVender");
const textRemark = document.getElementById("textRemark");
let ID = document.getElementById("ID");
const PictureDevice = document.getElementById('PictureDevice')
const textPosition = document.getElementById('textPosition');
var textPrice = document.getElementById("textPrice");
var textVender = document.getElementById("textVender");
var textaddFileVideo = document.getElementById("textaddFileVideo");
var textfilePhoto = document.getElementById("textfilePhoto");
var textfileLinkVideo = document.getElementById("textfileLinkVideo");
const btnApproved = document.getElementById('btnApproved');

// get the modal and get value html table to input modal
const myModal = document.getElementById("exampleModalToggle");
let modal = new bootstrap.Modal(myModal);

//  HTML พร้อมแสดงผล
$(document).ready(function () {
  console.log("Modal initialized");
  listNewDevices()
  category()
  listNewDevices()

  // เพิ่มเหตุการณ์คลิกให้กับแถวในตาราง
  $("#table").on("click", "td", async function () {
    // ดึงข้อมูลในแต่ละเซลล์ของแถวนี้
    let cells = Array.from(this.parentNode.children);
    // แปลงข้อมูลในเซลล์เป็นอาร์เรย์ของข้อความ
    let cellTexts = cells.map(function (cell) {
      return cell.innerText;
    });

    //กำหนดค่าของ input fields ใน modal
    localStorage.setItem("ID", cellTexts[1]);
    const files = await fetchAttachedFiles(cellTexts[3]);
    //C:\Users\p8344\Desktop\Iot_devices\public\photo
    PictureDevice.src = `/photo/${cellTexts[3]}/${files[0]}`;
    document.getElementById("text").value = cellTexts[2];
    textitemName.value = cellTexts[3];
    //  selectDataByitemcode(cellTexts[3])
    textcategory.value = cellTexts[4];
    textType.value = cellTexts[5];
    textQuantity.value = cellTexts[9];
    textRemark.value = cellTexts[11];
    textPosition.value = cellTexts[6];
    // แสดง modal
    modal.show();
  });
});


selectCategory.addEventListener("click", () => {
  console.log(selectCategory.value);
});


// ********************************* Qr-code ************************************//
//Qr-code
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
//  })
// ********************************* End Qr-code ************************************//


//get data into table
async function listNewDevices() {
  const res = await axios.get('/devices/listNewDevices')
  // console.log(res.data)
  let html = '';
  let n = 1
  res.data.forEach(item => {
    html += `
    <tr style="font-size: 11px;">
            <th scope="row">${n}</th>
            <th scope="row">${item.ID}</th>
            <td class="text-nowrap">${item.Request}</td>
            <td class="text-nowrap">${item.ItemCode}</td>
            <td>${item.Category}</td>
            <td class="text-nowrap"  style= " text-align: left;">${item.Type}</td>
            <td>${item.Position}</td>
            <td>${item.Price}</td>
            <td>${item.PriceTotal}</td>
            <td>${item.Quantity}</td>
            <td>${item.VendorName}</td>
            <td class="text-nowrap">${item.Remark}</td>
            <td class="text-nowrap">${item.UpdateBy}</td>
            <td class="text-nowrap">${item.CreateDate}</td>
          </tr>

    `
    n++
    // console.log(item.Category);
  });
  $("#tableNewDevices").html(html)
}

// /--------------select Category--------------/
//show data html
async function category() {
  const res = await axios.get(
    "/devices/selectlistDevice"
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
    "/devices/searchlistNewDevice",
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
        <tr style="font-size: 11px;">
        <th scope="row">${n}</th>
        <th scope="row">${item.ID}</th>
        <td class="text-nowrap">${item.Request}</td>
        <td class="text-nowrap">${item.ItemCode}</td>
        <td>${item.Category}</td>
        <td class="text-nowrap"  style= " text-align: left;">${item.Type}</td>
        <td>${item.Position}</td>
        <td>${item.Price}</td>
        <td>${item.PriceTotal}</td>
        <td>${item.Quantity}</td>
        <td>${item.VendorName}</td>
        <td class="text-nowrap">${item.Remark}</td>
        <td class="text-nowrap">${item.UpdateBy}</td>
        <td class="text-nowrap">${item.CreateDate}</td>
      </tr>
    `;
    n++;
    // console.log(item.Category);
  });
  $("#tableNewDevices").html(html);
}

//กำหนด function การคลิก
selectCategory.addEventListener('change', async () => {
  if (selectCategory.selectedIndex === 0) {
    listNewDevices()
  } else {
    searchinputdevice2()
  }
})


// // /-------------modal----------------/
// // select data into modal
// async function selectDataByitemcode(itemCode) {
//   const res = await axios.post('/devices/modalNewDevice',{
//     keyword:itemCode
//   })
//   console.log(res.data[0])
// }
// // /-------------modal----------------/

async function clearInputSelectBeforeCloseModal() {
  var inputs = myModal.querySelectorAll('input[type="text"], textarea,input[type="Request"]');
  inputs.forEach(function (input) {
    input.value = ""; // Clear each input field
  });
}

btnApproved.addEventListener('click', async function (event) {
  const ID = localStorage.getItem("ID")
  let strPosition = textPosition.value;
  let strtextRemark = textRemark.value;
  console.log(ID);

  // return
  // ตอนนี้คุณมีค่า ID, คุณสามารถใช้มันในการส่งข้อมูลได้
  const res = await axios.post('/devices/UpadteConfirmAddStaff', {
    ID: ID, // ส่งค่า ID ไปยังเซิร์ฟเวอร์ในรูปแบบของ object
    Position: textPosition.value,
    Remark: textRemark.value
  });
  console.log(res);
  if (!res.status === 200) {
    throw new Error("Failed to insert data.");
  }

  console.log('Ok1');
  alert("Sent Confirm Request Add\nส่งยืนยันคำขอเรียบร้อย")
  clearInputSelectBeforeCloseModal()
  modal.hide();
  await listNewDevices()
})


btnRejected.addEventListener('click', async function (event) {
  const ID = localStorage.getItem("ID")
  let strtextRemark = textRemark.value;
  console.log(ID);
  if (strtextRemark !== '') {
    // return
    // ตอนนี้คุณมีค่า ID, คุณสามารถใช้มันในการส่งข้อมูลได้
    const res = await axios.post('/devices/UpadteRejectAddStaff', {
      ID: ID,// ส่งค่า ID ไปยังเซิร์ฟเวอร์ในรูปแบบของ object
      Remark: textRemark.value
    });
    console.log(res);
    if (!res.status === 200) {
      throw new Error("Failed to insert data.");
    }
    console.log('Ok1');
    alert("Sent Reject Request Add\nส่งปฏิเสธคำขอเรียบร้อย")
    modal.hide();
    await listNewDevices()
  } else {
    alert("Please enter a reason.\nกรุณาใส่เหตุผล")
  }


})


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
    console.log(response);
    return response.data.files;
  } catch (error) {
    console.error('Error fetching attached files:', error);
    return [];
  }
}
// ********************************* end show photo ************************************//