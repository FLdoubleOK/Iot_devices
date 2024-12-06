
const textRequest = document.getElementById("textRequest");
const textitemName = document.getElementById("textitemName");
const textcategory = document.getElementById("textcategory");
const textType = document.getElementById("textType");
const nameMoveToDept = document.getElementById("nameMoveToDept");
const textQuantity = document.getElementById("textQuantity");
const PictureDevice = document.getElementById('PictureDevice')
const textDescription = document.getElementById('textDescription')
let ID = document.getElementById("ID");

// Get the modal elementvar
const myModal = document.getElementById("exampleModalToggle");
let modal = new bootstrap.Modal(myModal);

document.addEventListener("DOMContentLoaded", function () {
  OrderDevice()


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
      localStorage.setItem("ID", cellTexts[1]);
      const files = await fetchAttachedFiles(cellTexts[3]);
      //C:\Users\p8344\Desktop\Iot_devices\public\photo
      PictureDevice.src = `/photo/${cellTexts[3]}/${files[0]}`;
      document.getElementById("textitemName").value = cellTexts[3];
      Where_itemOrder(cellTexts[3]);
      document.getElementById("textcategory").value = cellTexts[4];
      document.getElementById("textRequest").value = cellTexts[2];
      document.getElementById("textType").value = cellTexts[5];
      document.getElementById("textQuantity").value = cellTexts[6];
      document.getElementById("nameMoveToDept").value = cellTexts[8];
        // แสดง modal

        modal.show();
      }
    });
});

// ********************************* SHOW DATA TABLE ************************************//

async function OrderDevice() {
    const res = await axios.get("/devices/Orderwaitsend");
    let html = "";
    let n = 1;
    res.data.forEach((item) => {
      html += `
      <tr>
              <th scope="row">${n}</th>
              <td class="text-nowrap">${item.ID}</td>
              <td class="text-nowrap">${item.Request}</td>
              <td  class="table1">${item.ItemCode}</td>
              <td>${item.Category}</td>
              <td>${item.Type}</td>
              <td>${item.Quantity}</td>
              <td>${item.RequestBy}</td>
               <td>${item.Department}</td>
              <td>${item.InCharge}</td>
              <td>${item.UpdateDate}</td>
     
            </tr>
      `;
      n++;
      // console.log(item.Category);
    });
    $("#tableOrder").html(html);
  }
  // ********************************* END SHOW TABLE ************************************//

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
  
//select data into modal
async function Where_itemOrder(itemCode) {
    const res = await axios.post('/devices/Whereitemorder', {
      keywords: itemCode
    })
    console.log(res.data[0])
    document.getElementById("textDescription").value = res.data[0].Description;
  }

  btnSave.addEventListener("click",async function(event){
    const ID =localStorage.getItem("ID")
const res = await axios.post ('/devices/UpdateStatusOrder',{
  ID:ID
});
if(!res.satus === 200){
  throw new Error ("Failed to insert data.");
}
console.log(res);
alert("Update Status Accept")
await OrderDevice()
modal.hide();
  })