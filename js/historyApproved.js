var textstatus = document.getElementById('textstatus');
var textitemName = document.getElementById('textitemName');
var textQuantity = document.getElementById('textQuantity');
var textcategory = document.getElementById('textcategory');
var textrequester = document.getElementById('textrequester');
var textDepartment = document.getElementById('textDepartment');
var textRemark = document.getElementById('textRemark');
var inputSearch = document.getElementById('inputSearch');
const PictureDevice = document.getElementById('PictureDevice')





let modal = new bootstrap.Modal(document.getElementById('exampleModalToggle'));

//  HTML พร้อมแสดงผล
$(document).ready(function () {
  console.log("Modal initialized");
  listApproved()

  // เพิ่มเหตุการณ์คลิกให้กับแถวในตาราง
  $("#table").on("click", "tr", async function () {
    // ดึงข้อมูลในแต่ละเซลล์ของแถวนี้
    let cells = Array.from(this.children);
    // แปลงข้อมูลในเซลล์เป็นอาร์เรย์ของข้อความ
    let cellTexts = cells.map(function (cell) {
      return cell.innerText;
    });

    // กำหนดค่าของ input fields ใน modal
    const files = await fetchAttachedFiles(cellTexts[2]);
    //C:\Users\p8344\Desktop\Iot_devices\public\photo
    PictureDevice.src = `/photo/${cellTexts[2]}/${files[0]}`;
    document.getElementById("textstatus").value = cellTexts[1];
    document.getElementById("textitemName").value = cellTexts[2];
    selectDataByitemcode(cellTexts[2])
    document.getElementById("textQuantity").value = cellTexts[6];
    document.getElementById("textcategory").value = cellTexts[4];
    document.getElementById("textrequester").value = cellTexts[10];
    document.getElementById("textRemark").value = cellTexts[9];
    textDepartment.value = cellTexts[7];



    // แสดง modal
    modal.show();
  });
});


btnsearch.addEventListener('click', async () => {
  searchApproved()
  // alert(search.value)
})

// close modern
var sendButton = document.getElementById('btnClose');
sendButton.addEventListener('click', function () {
  var modalElement = document.getElementById('exampleModalToggle'); // หา element ของ modal
  var modalInstance = bootstrap.Modal.getInstance(modalElement); // สร้าง instance ของ modal
  modalInstance.hide(); // ปิด modal
});


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


//select data show in table
async function listApproved() {
  const res = await axios.get('/devices/listApproved')
  console.log(res.data.length)
  let html = '';
  let n = 1
  res.data.forEach(item => {
    html += `
      <tr style="font-size: 14px;" >
              <th scope="row">${n}</th>
              <td class="text-nowrap">${item.Status}</td>
              <td class="text-nowrap">${item.ItemCode}</td>
              <td>${item.Request}</td>
              <td>${item.Category}</td>
              <td class="text">${item.Type}</td>
              <td>${item.Quantity}</td>
              <td>${item.Department}</td>
              <td>${item.InCharge}</td>
              <td class="text">${item.Remark}</td>
              <td class="text-nowrap">${item.RequestBy}</td>
              <td class="text-nowrap">${item.UpdateDate}</td>
              <td  class="text-nowrap">${item.MoveDate}</td>
            </tr>
      `
    n++
    // console.log(item.Category);
  });
  $("#tablelist").html(html)
}

async function searchApproved() {
  console.log(inputSearch.value)
  const res = await axios.post('/devices/searchApproved', {
    keyword: inputSearch.value
  })
  // console.log(res.data)

  // return
  // $("#TableRemain").html('')
  let html = '';
  let n = 1
  res.data.forEach(item => {
    html += `
      <tr style="font-size: 14px;" >
      <th scope="row">${n}</th>
      <td class="text-nowrap">${item.Status}</td>
      <td class="text-nowrap">${item.ItemCode}</td>
      <td>${item.Request}</td>
      <td>${item.Category}</td>
      <td class="text">${item.Type}</td>
      <td>${item.Quantity}</td>
      <td>${item.Department}</td>
      <td>${item.InCharge}</td>
      <td class="text">${item.Remark}</td>
      <td class="text-nowrap">${item.RequestBy}</td>
      <td class="text-nowrap">${item.UpdateDate}</td>
      <td  class="text-nowrap">${item.MoveDate}</td>
    </tr>
      `
    n++
    // console.log(item.Category);
  });
  $("#tablelist").html(html)
}

async function selectDataByitemcode(itemCode) {
  const res = await axios.post('/devices/ModalAddQty', {
    keyword: itemCode
  })
  console.log(res.data[0])

}

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