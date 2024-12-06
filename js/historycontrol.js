var inputSearch = document.getElementById('inputSearch');
var Position = document.getElementById('textPosition');
const search = document.getElementById('search');
const btnsearch = document.getElementById('btnsearch');
const PictureDevice = document.getElementById('PictureDevice')
const btnSave = document.getElementById('btnSave')
let ID = document.getElementById("ID");

btnsearch.addEventListener('click', async () => {
  searchinputdevice()
  // alert(search.value)
})

// get the modal and get value html table to input modal
let modal = new bootstrap.Modal(document.getElementById('exampleModalToggle'));

//  HTML พร้อมแสดงผล
$(document).ready(function () {
  console.log("Modal initialized");
  historyAllDevice()
  searchinputdevice()

  // เพิ่มเหตุการณ์คลิกให้กับแถวในตาราง
  $("#table").on("click", "td", async function () {
    // ดึงข้อมูลในแต่ละเซลล์ของแถวนี้
    let cells = Array.from(this.parentNode.children);
    // แปลงข้อมูลในเซลล์เป็นอาร์เรย์ของข้อความ
    let cellTexts = cells.map(function (cell) {
      return cell.innerText;
    });

    // กำหนดค่าของ input fields ใน modal
    localStorage.setItem("ID", cellTexts[1]);
    const files = await fetchAttachedFiles(cellTexts[3]);
    PictureDevice.src = `/photo/${cellTexts[3]}/${files[0]}`;
    selectDataByitemcode(cellTexts[3])
    document.getElementById("textitemName").value = cellTexts[3];
    document.getElementById("textcategory").value = cellTexts[4];
    document.getElementById("textType").value = cellTexts[5];
    document.getElementById("textPosition").value = cellTexts[2];

    // แสดง modal
    modal.show();
  });
});


//select data show in table
async function historyAllDevice() {
  const res = await axios.get('/devices/listAddAllDevices')
  // console.log(res.data)
  let html = '';
  let n = 1
  res.data.forEach(item => {
    html += `
    <tr style="font-size: 10px;">
            <th scope="row">${n}</th>
            <td class="text-nowrap">${item.ID}</td>
            <td class="text-nowrap">${item.Position}</td>
            <td class="text-nowrap">${item.ItemCode}</td>
            <td >${item.Category}</td>
            <td  class="table1 w-box">${item.Type}</td>
            <td>${item.VendorName}</td>
            <td>${item.remain}</td>
            <td>${item.Total}</td>
            <td>${item.Price}</td>
            <td>${item.PriceTotal}</td>
            <td>${item.PriceTotal}</td>
            <td>${item.UpdateBy}</td>
            <td>${item.CreateDate}</td>
          </tr>
    `
    n++
    // console.log(item.Category);
  });
  $("#tablehistory").html(html)
}


async function searchinputdevice() {
  console.log(inputSearch.value)
  const res = await axios.post('/devices/searchHistory', {
    keywords: inputSearch.value
  })
  // console.log(res.data)

  // return
  // $("#TableRemain").html('')
  let html = '';
  let n = 1
  res.data.forEach(item => {
    html += `
    <tr style="font-size: 10px;">
            <th scope="row">${n}</th>
            <td class="text-nowrap">${item.ID}</td>
            <td class="text-nowrap">${item.Position}</td>
            <td >${item.ItemCode}</td>
            <td >${item.Category}</td>
            <td  class="table1 w-box">${item.Type}</td>
            <td>${item.VendorName}</td>
            <td>${item.remain}</td>
            <td>${item.Total}</td>
            <td>${item.Price}</td>
            <td>${item.PriceTotal}</td>
            <td>${item.PriceTotal}</td>
            <td>${item.UpdateBy}</td>
            <td>${item.CreateDate}</td>
          </tr>
    `
    n++
    // console.log(item.Category);
  });
  $("#tablehistory").html(html)
}

async function selectDataByitemcode(itemCode) {
  const res = await axios.post('/devices/itemmodel', {
    keywords: itemCode
  })
  document.getElementById("textRemark").value = res.data[0].Remark;
}
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
    // console.error('Error fetching attached files:', error);
    return [];
  }
}

btnSave.addEventListener('click', async () => {
  let strPosition = Position.value;
  const ID = localStorage.getItem("ID")
  console.log(ID);
  console.log(strPosition);
  if (strPosition !== '') {
    const response = await axios.post('/devices/UpdatePosition', {
      ID: ID, // ส่งค่า ID ไปยังเซิร์ฟเวอร์ในรูปแบบของ object
      Position: Position.value
    });
    alert('Sent Save')
    console.log(response);
    console.log('Ok1');
  } else {
    return false;
  }
})