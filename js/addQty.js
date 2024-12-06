
//กำหนดตัวแปล
var selectCategory = document.getElementById('selectCategory');
var inputSearch = document.getElementById('inputSearch');
var btnsearch = document.getElementById('btnsearch');
var textQuantityNew = document.getElementById('textQuantityNew');
var textRemark = document.getElementById('textRemark');
var textitemName = document.getElementById('textitemName');
const PictureDevice = document.getElementById('PictureDevice')
const btnSave = document.getElementById('btnSave');


// get the modal and get value html table to input modal
const myModal = document.getElementById("exampleModalToggle");
let modal = new bootstrap.Modal(myModal);

//  HTML พร้อมแสดงผล
$(document).ready(function () {
  console.log("Modal initialized");
  listAddQty()
  category()
  searchinputdevice()

  // เพิ่มเหตุการณ์คลิกให้กับแถวในตาราง
  $("#table").on("click", "tr", async function () {
    // ดึงข้อมูลในแต่ละเซลล์ของแถวนี้
    let cells = Array.from(this.children);
    // แปลงข้อมูลในเซลล์เป็นอาร์เรย์ของข้อความ
    let cellTexts = cells.map(function (cell) {
      return cell.innerText;
    });

    //กำหนดค่าของ input fields ใน modal
    document.getElementById("textitemName").value = cellTexts[1];
    const files = await fetchAttachedFiles(cellTexts[1]);
    PictureDevice.src = `/photo/${cellTexts[1]}/${files[0]}`;
    selectDataByitemcode(cellTexts[1])
    document.getElementById("textcategory").value = cellTexts[2];
    document.getElementById("textType").value = cellTexts[3];
    document.getElementById("textVender").value = cellTexts[6];

    // แสดง modal
    modal.show();
  });
});

////select data show in table
async function listAddQty() {
  const res = await axios.get('/devices/listAddQty')
  // console.log(res.data)
  let html = '';
  let n = 1
  res.data.forEach(item => {
    html += `
    <tr>
            <th scope="row">${n}</th>
            <td class="text-nowrap">${item.ItemCode}</td>
            <td class="text-nowrap">${item.Category}</td>
            <td  class="table1">${item.Type}</td>
            <td>${item.Price}</td>
            <td>${item.Total}</td>
            <td class="text-nowrap">${item.VendorName}</td>
          </tr>      
    `
    n++
    // console.log(item.Category);
  });
  $("#tableAddqty").html(html)
}

////select
//กำหนด function การคลิก
selectCategory.addEventListener('change', async () => {
  if (selectCategory.selectedIndex === 0) {
    listAddQty()
  } else {
    const res = await axios.post('/devices/searchdeviceAddQty', {
      keyword: selectCategory.value
    })
    // console.log(res.data)

    // return
    // $("#TableRemain").html('')
    let html = '';
    let n = 1
    res.data.forEach(item => {
      html += `
    <tr>
            <th scope="row">${n}</th>
            <td class="text-nowrap">${item.ItemCode}</td>
            <td class="text-nowrap">${item.Category}</td>
            <td  class="table1">${item.Type}</td>
            <td>${item.Price}</td>
            <td>${item.Total}</td>
            <td class="text-nowrap">${item.VendorName}</td>
          </tr>      
    `
      n++
      // console.log(item.Category);
    });
    $("#tableAddqty").html(html)
  }


})

btnsearch.addEventListener('click', async () => {
  if (selectCategory.selectedIndex === 0) {
    console.log(inputSearch.value)
    const res = await axios.post('/devices/searchdeviceAddQty', {
      keyword: inputSearch.value
    })
    // console.log(res.data)

    // return
    // $("#TableRemain").html('')
    let html = '';
    let n = 1
    res.data.forEach(item => {
      html += `
    <tr>
            <th scope="row">${n}</th>
            <td class="text-nowrap">${item.ItemCode}</td>
            <td class="text-nowrap">${item.Category}</td>
            <td  class="table1">${item.Type}</td>
            <td>${item.Price}</td>
            <td>${item.Total}</td>
            <td>${item.VendorName}</td>
          </tr>      
    `
      n++
      // console.log(item.Category);
    });
    $("#tableAddqty").html(html)
    return
    listAddQty()
  }
  else {
    const res = await axios.post('/devices/inputSearchAddQty', {
      category: selectCategory.value,
      keyword: inputSearch.value
    })
    // console.log(res.data)

    let html = '';
    let n = 1
    res.data.forEach(item => {
      html += `
    <tr>
    <th scope="row">${n}</th>
    <td class="text-nowrap">${item.ItemCode}</td>
    <td class="text-nowrap">${item.Category}</td>
    <td  class="table1">${item.Type}</td>
    <td>${item.Price}</td>
    <td>${item.Quantity}</td>
    <td>${item.VendorName}</td>
          </tr>      
    `
      n++
      // console.log(item.Category);
    });
    $("#tableAddqty").html(html)

  }
})



//show data html
async function category() {
  const res = await axios.get('/devices/category')
  // console.log(res.data)
  let html = '';
  html = '<option>Open this select Category</option>'
  res.data.forEach(item => {
    html += `
    <option value="${item.Category}">${item.Category}</option>`
    // console.log(item.Category);
  });
  $("#selectCategory").html(html)
}

// กดหนดให้คลิกเลือกหมวดหมู่แล้วมาโชว์บนตาราง
async function searchinputdevice2() {
  // console.log(inputSearch.value)

}


// end select

//// serach 
async function searchinputdevice() {
  try {
    console.log(inputSearch.value)
    const res = await axios.post('/devices/searchdeviceAddQty', {
      keyword: inputSearch.value
    })
    // console.log(res.data)

    // return
    // $("#TableRemain").html('')
    let html = '';
    let n = 1
    res.data.forEach(item => {
      html += `
      <tr>
              <th scope="row">${n}</th>
              <td class="text-nowrap">${item.ItemCode}</td>
              <td class="text-nowrap">${item.Category}</td>
              <td  class="table1">${item.Type}</td>
              <td>${item.Price}</td>
              <td>${item.Total}</td>
              <td>${item.VendorName}</td>
            </tr>      
      `
      n++
      // console.log(item.Category);
    });
    $("#tableAddqty").html(html)
  } catch (error) {
    console.log("Err: ", error);
  }

}

async function clearInputSelectBeforeCloseModal() {
  var inputs = myModal.querySelectorAll('input[type="text"], textarea');
  inputs.forEach(function (input) {
    input.value = ""; // Clear each input field
  });
}

btnSave.addEventListener('click', async function (event) {
  let strtextitemName = textitemName.value;
  let strQuantity = textQuantityNew.value;
  let strtextRemark = textRemark.value;
  console.log(strQuantity, strtextRemark);


  if (strQuantity !== '') {
    const res = await axios.post('/devices/InsertAddQty', {
      ItemCode: textitemName.value,
      Qty: textQuantityNew.value,
      Remark: textRemark.value,
      NID: lbID.innerText.trim(),
    })
    console.log(res);
    if (!res.status === 200) {
      throw new Error("Failed to insert data.");
    }
    await clearInputSelectBeforeCloseModal()
    alert("Sent Request Add Qty\nส่งคำขอเพิ่มจำนวนอุปกรณ์เรียบร้อย")
    modal.hide();
  } else {
    (strQuantity === '')
    console.log('กกรุณากรอกจำนวนที่ต้องการ')
    alert('Please enter the quantity you want.\nกรุณากรอกจำนวนที่ต้องการ')
  }
})




//Qr-Code
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

//select data into modal
async function selectDataByitemcode(itemCode) {
  const res = await axios.post('/devices/ModalAddQty', {
    keywords: itemCode
  })
  console.log(res.data[0])

}


// ********************************* CLEAR MODEL  ************************************//
// Close Model
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


//reset modern
// var sendButton = document.getElementById('btnSave');
// sendButton.addEventListener('click', function () {
//   // ค้นหา modal และ instance ของ modal
//   var modalElement = document.getElementById('exampleModalToggle');
//   var modalInstance = bootstrap.Modal.getInstance(modalElement);

//   // ล้างค่าของ input fields ที่อยู่ภายใน modal
//   var inputs = modalElement.querySelectorAll('input');
//   inputs.forEach(function (input) {
//     input.value = ''; // ล้างค่า
//   });

//   // ล้างค่าของ textarea ถ้ามี
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

var sendButton = document.getElementById('btnClose');
sendButton.addEventListener('click', function () {
  // ค้นหา modal และ instance ของ modal
  var modalElement = document.getElementById('exampleModalToggle');
  var modalInstance = bootstrap.Modal.getInstance(modalElement);

  // ล้างค่าของ input fields ที่อยู่ภายใน modal
  var inputs = modalElement.querySelectorAll('input');
  inputs.forEach(function (input) {
    input.value = ''; // ล้างค่า
  });

  // ล้างค่าของ textarea ถ้ามี
  var textareas = modalElement.querySelectorAll('textarea');
  textareas.forEach(function (textarea) {
    textarea.value = ''; // ล้างค่า
  });

  // ล้างค่าของ select elements ถ้ามี
  var selects = modalElement.querySelectorAll('select');
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