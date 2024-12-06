
const textitemName = document.getElementById('textitemName');
const textstatus = document.getElementById('textstatus');
const textQuantity = document.getElementById('textQuantity');
const textRemark = document.getElementById('textRemark');
const textrequester = document.getElementById('textrequester');
const textDepartment = document.getElementById('textDepartment');
const btnRejected = document.getElementById('btnRejected');
const PictureDevice = document.getElementById('PictureDevice')
let ID = document.getElementById("ID");

const myModal = document.getElementById("exampleModalToggle");
let modal = new bootstrap.Modal(myModal);

document.addEventListener("DOMContentLoaded", function () {
  // $(document).ready(function () {
  console.log("Modal initialized");
  listNewApproved()

  $("#tableapproved").on("click", "tr", async function () {
    // ดึงข้อมูลในแต่ละเซลล์ของแถวนี้
    let cells = Array.from(this.children);
    // แปลงข้อมูลในเซลล์เป็นอาร์เรย์ของข้อความ
    let cellTexts = cells.map(function (cell) {
      return cell.innerText;
    });

    // กำหนดค่าของ input fields ใน modal
    localStorage.setItem("ID", cellTexts[1]);
    const files = await fetchAttachedFiles(cellTexts[3]);
    //C:\Users\p8344\Desktop\Iot_devices\public\photo
    PictureDevice.src = `/photo/${cellTexts[3]}/${files[0]}`;
    textstatus.value = cellTexts[4];
    textitemName.value = cellTexts[3];
    textQuantity.value = cellTexts[7];
    textDepartment.value = cellTexts[8];
    textrequester.value = cellTexts[11];
    textType.value = cellTexts[6];
    // แสดง modal
    modal.show();
  });
})


// Qr-code
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
async function listNewApproved() {
  const res = await axios.get('/Devices/listNewApproved')
  // console.log(res.data)
  // alert("TESt")
  // console.log(res.data.length);
  let html = '';
  let n = 1
  res.data.forEach(item => {
    html += `
        <tr style="font-size: 15px;" >
        <th scope="row">${n}</th>
        <th scope="row">${item.ID}</th>
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
      </tr>
      `
    n++
    // console.log(item.Category);
  });
  $("#tableapproved").html(html)
  document.getElementById("countWaitApprove").innerHTML = res.data.length
}

async function clearInputSelectBeforeCloseModal() {
  var inputs = myModal.querySelectorAll('input[type="text"], textarea,input[type="Request"]');
  inputs.forEach(function (input) {
    input.value = ""; // Clear each input field
  });
}

btnApproved.addEventListener('click', async function (event) {
  let strtextRemark = textRemark.value;
  const textstatus = document.getElementById("textstatus").value;
  const ID = localStorage.getItem("ID")
  console.log(ID);
  try {
    if (textstatus === 'NG') {
      // return
      // ตอนนี้คุณมีค่า ID, คุณสามารถใช้มันในการส่งข้อมูลได้
      const res = await axios.post('/devices/ApprovedManagerNG', {
        ID: ID, // ส่งค่า ID ไปยังเซิร์ฟเวอร์ในรูปแบบของ object
        Remark: textRemark.value
      });

      if (!res.status === 200) {
        throw new Error("Failed to insert data.");
      }
      alert(" Confirm Request \nยืนยันคำขอเรียบร้อย")
      await listNewApproved()
      console.log(res);
      console.log('Ok1');
      await clearInputSelectBeforeCloseModal()
      modal.hide();
    } else if (textstatus === 'Transfer') {
      // return
      // ตอนนี้คุณมีค่า ID, คุณสามารถใช้มันในการส่งข้อมูลได้
      const res = await axios.post('/devices/ApprovedManagerTransfer', {
        ID: ID, // ส่งค่า ID ไปยังเซิร์ฟเวอร์ในรูปแบบของ object
        Remark: textRemark.value
      });

      if (!res.status === 200) {
        throw new Error("Failed to insert data.");
      }
      alert(" Confirm Request \nยืนยันคำขอเรียบร้อย")
      await listNewApproved()
      console.log(res);
      console.log('Ok1');
      await clearInputSelectBeforeCloseModal()
      modal.hide();

    } else {
      // return
      // ตอนนี้คุณมีค่า ID, คุณสามารถใช้มันในการส่งข้อมูลได้
      const res = await axios.post('/devices/ApprovedManager', {
        ID: ID, // ส่งค่า ID ไปยังเซิร์ฟเวอร์ในรูปแบบของ object
        Remark: textRemark.value
      });

      if (!res.status === 200) {
        throw new Error("Failed to insert data.");
      }
      alert(" Confirm Request \nยืนยันคำขอเรียบร้อย")
      await listNewApproved()
      console.log(res);
      console.log('Ok1');
      await clearInputSelectBeforeCloseModal()
      modal.hide();
    }

  } catch (error) {
    console.error(error);
  }
})


btnRejected.addEventListener('click', async function () {
  const ID = localStorage.getItem("ID")
  let strtextRemark = textRemark.value;
  console.log(ID);
  if (strtextRemark !== '') {
    // return
    // ตอนนี้คุณมีค่า ID, คุณสามารถใช้มันในการส่งข้อมูลได้
    const res = await axios.post('/devices/RejectManager', {
      ID: ID, // ส่งค่า ID ไปยังเซิร์ฟเวอร์ในรูปแบบของ object
      Remark: textRemark.value
    });
    if (!res.status === 200) {
      throw new Error("Failed to insert data.");
    }
    alert("Reject Request Add\nปฏิเสธคำขอเรียบร้อย")
    await listNewApproved()
    await clearInputSelectBeforeCloseModal()
    // console.log(res);
    // console.log('Ok1');
    modal.hide();
  } else {
    console.log("NG");
    alert("Please enter a reason.\nกรุณาใส่เหตุผล");
  }

});


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
