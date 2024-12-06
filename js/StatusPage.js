

const PictureDevice = document.getElementById('PictureDevice')
const Deleterow = document.getElementById('Deleterow')
const textRequest = document.getElementById("textRequest")
let ID = document.getElementById("ID");


const lbID = document.getElementById("lbID")

// get the modal and get value html table to input modal

const myModal = document.getElementById("exampleModalToggle");
let modal = new bootstrap.Modal(myModal);
//  HTML พร้อมแสดงผล
$(document).ready(function () {
  console.log("Modal initialized");
  Liststatus()
  console.log(lbID.innerText.trim());

  // เพิ่มเหตุการณ์คลิกให้กับแถวในตาราง
  $("#table").on("click", "td", async function () {
    // ดึงข้อมูลในแต่ละเซลล์ของแถวนี้
    // console.log($(this).index());
    if ($(this).index() === 1) {
      let cells = Array.from(this.parentNode.children);
      // แปลงข้อมูลในเซลล์เป็นอาร์เรย์ของข้อความ
      let cellTexts = cells.map(function (cell) {
        return cell.innerText;
      });

      // กำหนดค่าของ input fields ใน modal
      localStorage.setItem("ID", cellTexts[1]);
      const files = await fetchAttachedFiles(cellTexts[3]);
      //C:\Users\p8344\Desktop\Iot_devices\public\photo
      PictureDevice.src = `/photo/${cellTexts[3]}/${files[0]}`;
      document.getElementById("textitemName").value = cellTexts[3];
      selectDataByitemcode(cellTexts[3])
      document.getElementById("textcategory").value = cellTexts[4];
      document.getElementById("textRequest").value = cellTexts[2];
      document.getElementById("textType").value = cellTexts[5];
      document.getElementById("textQuantity").value = cellTexts[6];

      // แสดง modal
      modal.show();
    } else if ($(this).index() === 10) {
      let cells = Array.from(this.parentNode.children);
      // แปลงข้อมูลในเซลล์เป็นอาร์เรย์ของข้อความ
      let cellTexts = cells.map(function (cell) {
        return cell.innerText;
      });
      await deleteRequestByID(cellTexts[1], cellTexts[2])
    }

  });
});


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


//show data in table
async function Liststatus() {
  const res = await axios.post('/devices/Statuslist', {
    NID: lbID.innerText.trim()
  }

  )
  // console.log(res.data)
  let html = '';
  let n = 1
  res.data.forEach(item => {
    html += `
    <tr>
            <th scope="row">${n}</th>
            <td scope="row" class="fw-bold"  style="color: blue;">${item.ID}</td>
            <td >${item.Request}</td>
            <td class="text-nowrap">${item.ItemCode}</td>
            <td >${item.Category}</td>
            <td class="text">${item.Type}</td>
            <td>${item.Quantity}</td>
            <td class="text-nowrap">${item.RequestBy}</td>
            <td>${item.UpdateDate}</td>
            <td class=" text-nowrap">${item.NextInchage || ''}</td>
            <td><button type="button" id="Deleterow" class="btn btn-md"><i class="bi bi-trash text-danger fw-bold"></i></button></td>
          </tr>
        
    `
    n++
    // console.log(item.Category);
  });
  $("#tablelist").html(html)
}


//select data into modal
async function selectDataByitemcode(itemCode) {
  const res = await axios.post('/devices/ModalStatusRequest', {
    keywords: itemCode
  })
  console.log(res.data[0])
  document.getElementById("textDescription").value = res.data[0].Description;
  document.getElementById("textRemark").value = res.data[0].Remark;
}

async function deleteRequestByID(ID, request) {

  try {
    const result = confirm("Do you want to cancel?")
    if (!result) {
      return
    }
    if (request === 'Add Qty' || request === 'Add New') {
      const res = await axios.post('/devices/CanCelRequestAdd', {
        ID: ID
      });
      console.log(res);
      if (!res.status === 200) {
        throw new Error("Failed to insert data.");
      }
      alert("CanCel Request Done. \nส่งยกเลิกคำขอเรียบร้อยแล้ว ")
      await Liststatus()
      // modal.hide();
    } else {
      const res = await axios.post('/devices/CanCelRequestReq', {
        ID: ID
      });
      console.log(res);
      if (!res.status === 200) {
        throw new Error("Failed to insert data.");
      }
      alert("CanCel Request Done. \nส่งยกเลิกคำขอเรียบร้อยแล้ว1 ")
      await Liststatus()
      // modal.hide();
    }
  } catch (error) {
    console.log("Err: ", error);
  }
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

