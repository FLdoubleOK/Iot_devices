
// กำหนดตัวแปลเพื่อทำการ get input
var selectRequest = document.getElementById('selectRequest');
var selectCategory = document.getElementById('selectCategory');
var inputSearch = document.getElementById('inputSearch');
var btnsearch = document.getElementById('btnsearch');
var textitemName = document.getElementById('textitemName');
var textcategory = document.getElementById('textcategory');
var textType = document.getElementById('textType');
var textQuantity = document.getElementById('textQuantity');
var textRemark = document.getElementById('textRemark');
var nameMoveToDept = document.getElementById('nameMoveToDept');
var nameManager = document.getElementById('nameManager');
var nameIncharge = document.getElementById('nameIncharge');
var  date = document.getElementById('date')





// get the modal and get value html table to input modal
let modal = new bootstrap.Modal(document.getElementById('exampleModalToggle'));
document.addEventListener("DOMContentLoaded", function () {
  console.log("Modal initialized");
  category()
  remaindevice()
  selectdepinmodal()
  selectRequestNodal()


  // เพิ่มเหตุการณ์คลิกให้กับแถวในตาราง
  document.getElementById("table").addEventListener("click", function (e) {
    // ตรวจสอบว่าคลิกที่ td หรือไม่
    if (e.target.tagName === "TD") {
      // ดึงข้อมูลในแต่ละเซลล์ของแถวนี้
      let cells = Array.from(e.target.parentNode.children);
      // แปลงข้อมูลในเซลล์เป็นอาร์เรย์ของข้อความ
      let cellTexts = cells.map(function (cell) {
        return cell.innerText;
      });

      // กำหนดค่าของ input fields ใน modal
      document.getElementById("textitemName").value = cellTexts[1];
      selectDataByitemcode(cellTexts[1])
      document.getElementById("textcategory").value = cellTexts[2];
      //  document.getElementById("textDescription").value = cellTexts[3];
      document.getElementById("textType").value = cellTexts[3];


      // แสดง modal

      $("#nameManager").html('<option selected>Select Management</option>')
      $("#nameIncharge").html('<option selected>Select Inchage</option>')
      modal.show();

    }
  });
});


selectRequest.addEventListener('change', async () => {
  if (selectRequest.selectedIndex === 1) {
      textQuantity.disabled = false;
    textRemark.disabled = false;
    nameMoveToDept.disabled = false;
    nameManager.disabled = true;
    nameIncharge.disabled = false;
    date.disabled = false;
    
  } else if (selectRequest.selectedIndex === 2) {
    textQuantity.disabled = false;
    textRemark.disabled = false;
    nameMoveToDept.disabled = false;
    nameManager.disabled = false;
    nameIncharge.disabled = false;
    date.disabled = true;

  } else if (selectRequest.selectedIndex === 3) {
    textQuantity.disabled = false;
    textRemark.disabled = false;
    nameMoveToDept.disabled = false;
    nameManager.disabled = false;
    nameIncharge.disabled = false;
    Date.disabled = true;
  } else {
    textQuantity.disabled = false;
    textRemark.disabled = false;
    nameMoveToDept.disabled = false;
    nameManager.disabled = false;
    nameIncharge.disabled = false;
    nameIncharge.disabled = false;
  }
})

nameMoveToDept.addEventListener('change', async () => {
  if (nameMoveToDept.selectedIndex !== 0) {
    // api เรียกmanagment 
    const res = await axios.post('http://localhost:3001/Devices/SelectManagment', {
      Department: nameMoveToDept.value
    })
    let html = '';
    html = ' <option selected>Select Management </option>'
    res.data.forEach(item => {
      html += `
    <option value="${item.First_LastName} ">${item.First_LastName}</option>`
      // console.log(item.Category);
    });
    $("#nameManager").html(html)

    //api เรียก inchage
    const res2 = await axios.post('http://localhost:3001/Devices/SelectInchage', {
      Department: nameMoveToDept.value
    })
    let html2 = '';
    html2 = ' <option selected>Select Inchage</option>'
    res2.data.forEach(item => {
      html2 += `
    <option value="${item.First_LastName} ">${item.First_LastName}</option>`
      // console.log(item.Category);
    });
    $("#nameIncharge").html(html2)
  } else {
    // api เรียกmanagment
    const res = await axios.post('http://localhost:3001/Devices/SelectManagment', {
      Department: nameMoveToDept.value
    })
    let html = '';
    html = ' <option selected>Select Management </option>'
    res.data.forEach(item => {
      html += `
  <option value=""></option>`
    });
    $("#nameManager").html(html)

    //api เรียก inchage
    const res2 = await axios.post('http://localhost:3001/Devices/SelectInchage', {
      Department: nameMoveToDept.value
    })
    let html2 = '';
    html2 = '<option selected>Select Inchage</option>'
    res2.data.forEach(item => {
      html2 += `
<option value=""></option>`
      // console.log(item.Category);
    });
    $("#nameIncharge").html(html2)

  }
})




//กำหนด function การคลิก
selectCategory.addEventListener('change', async () => {
  if (selectCategory.selectedIndex === 0) {
    remaindevice();
  } else {
    // console.log(inputSearch.value)
    const res = await axios.post('http://localhost:3001/Devices/searchdevice', {
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
              <td>${item.Total}</td>
              <td>${item.Borrow}</td>
              <td>${item.NG}</td>
              <td>${item.Remain}</td>
            </tr>
      `
      n++
      // console.log(item.Category);
    });
    $("#TableRemain").html(html)
  }


})

btnsearch.addEventListener('click', async () => {
  if (selectCategory.selectedIndex === 0) {
    const res = await axios.post('http://localhost:3001/Devices/searchdevice', {
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
    <td>${item.Total}</td>
    <td>${item.Borrow}</td>
    <td>${item.NG}</td>
    <td>${item.Remain}</td>
  </tr>
`
      n++
      // console.log(item.Category);
    });
    $("#TableRemain").html(html)
    return
    remaindevice()
  }
  else {
    const res = await axios.post('http://localhost:3001/Devices/inputSearch', {
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
            <td>${item.Total}</td>
            <td>${item.Borrow}</td>
            <td>${item.NG}</td>
            <td>${item.Remain}</td>
          </tr>
    `
      n++
      // console.log(item.Category);
    });
    $("#TableRemain").html(html)

  }
})

document.addEventListener("DOMContentLoaded", function() {
  // เมื่อฟอร์มถูกส่ง, ตรวจสอบค่าในฟิลด์วันที่
  document.querySelector('form').addEventListener('submit', function(e) {
    // หาฟิลด์วันที่ด้วย id
    var dateInput = document('date');

    // ตรวจสอบว่าฟิลด์วันที่ว่างเปล่าหรือไม่
    if (!dateInput.value) {
      // หยุดการส่งฟอร์ม
      e.preventDefault();
      // แสดงข้อความแจ้งเตือนหรือทำอย่างอื่นตามต้องการ
      alert('กรุณากรอกข้อมูลวันที่');
    }
  });
});


btnSend.addEventListener('click', function (event) {
  let strRequest = selectRequest.selectedIndex;
  let strDepartment = nameMoveToDept.selectedIndex;
  let strQuantity = textQuantity.value;
  let strRemark = textRemark.value;
  let strManagement = nameManager.selectedIndex;
  let strInchage = nameIncharge.selectedIndex;
  let strDate = document.getElementById('date').value; // รับค่าวันที่จากฟิลด์


  if (strRequest === 1) {
    if (strDepartment !== 0 && strQuantity !== '' && strInchage !== 0 && strDate !== '' ) {
      
      console.log('Ok1')
      console.log(strDate)
    } else {
      console.log('NG') 
      if(strDepartment === 0){
        alert('กรุณากรอก Department')
      } else if (strQuantity === '') {
        alert('กรุณากรอกจำนวนที่ต้องการ')
      } else if (strInchage === 0)  {
        alert('กรุณากรอก Inchage')
      } else {
        alert('กรุณากรอก Duedate')
  
      }
      
    }
  } else if (strRequest === 2 || strRequest === 3) {
    if (strDepartment !== 0 && strQuantity !== '' && strManagement !== 0 && strInchage !== 0) {
      console.log('OK2')
    } else {
      console.log('NG')
      if(strDepartment === 0){
        console.log('กรุณากรอก Department')
        alert('กรุณากรอก Department')
      } else if (strQuantity === '') {
        alert('กรุณากรอกจำนวนที่ต้องการ')
      } else if(strManagement === 0) {
        alert('กรุณากรอก Managment')
      } else {
        alert('กรุณากรอก Inchage')
      }
    }
  } else {
    console.log('NG')
    alert('กรุณากรอก Request ')
  }
}

)





// close modern
var sendButton = document.getElementById('btnSend');
sendButton.addEventListener('click', function () {
  var modalElement = document.getElementById('exampleModalToggle'); // หา element ของ modal
  var modalInstance = bootstrap.Modal.getInstance(modalElement); // สร้าง instance ของ modal
  modalInstance.hide(); // ปิด modal
});

var sendButton = document.getElementById('btnClose');
sendButton.addEventListener('click', function () {
  var modalElement = document.getElementById('exampleModalToggle'); // หา element ของ modal
  var modalInstance = bootstrap.Modal.getInstance(modalElement); // สร้าง instance ของ modal
  modalInstance.hide(); // ปิด modal
});





//reset modern
var sendButton = document.getElementById('btnSend');
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




// -------  Select Category
async function category() {
  const res = await axios.get('http://localhost:3001/Devices/category')
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

//select data show in table
async function remaindevice() {
  const res = await axios.get('http://localhost:3001/Devices/remaindevice')
  let html = '';
  let n = 1
  res.data.forEach(item => {
    html += `
    <tr>
            <th scope="row">${n}</th>
            <td class="text-nowrap">${item.ItemCode}</td>
            <td class="text-nowrap">${item.Category}</td>
            <td  class="table1">${item.Type}</td>
            <td>${item.Total}</td>
            <td>${item.Borrow}</td>
            <td>${item.NG}</td>
            <td>${item.Remain}</td>
          </tr>
    `
    n++
    // console.log(item.Category);
  });
  $("#TableRemain").html(html)
}


//select data into modal
async function selectDataByitemcode(itemCode) {
  const res = await axios.post('http://localhost:3001/Devices/modal', {
    keyword: itemCode
  })
  console.log(res.data[0])
  console.log(res.data[0].ItemCode)
  console.log(res.data[0].Category)
  console.log(res.data[0].Type)
  document.getElementById("textDescription").value = res.data[0].Description;
}

//select Dep in modal
async function selectdepinmodal() {
  const res = await axios.get('http://localhost:3001/Devices/selectdep')
  let html = '';
  html = '<option>Select Dept</option>'
  res.data.forEach(item => {
    html += `
    <option value="${item.Department}">${item.Department}</option>`
    // console.log(item.Category);
  });
  $("#nameMoveToDept").html(html)
}


// select Request modal
async function selectRequestNodal() {
  const res = await axios.get('http://localhost:3001/Devices/selectRequest')
  let html = '';
  html = ' <option>Select Request</option>'
  res.data.forEach(item => {
    html += `
    <option value="${item.StatusRequest}">${item.StatusRequest}</option>`
    // console.log(item.Category);
  });
  $("#selectRequest").html(html)
}


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




