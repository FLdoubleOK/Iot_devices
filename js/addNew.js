
// Add input
const textitemName = document.getElementById('textitemName');
const selectCategory = document.getElementById('selectCategory');
const textType = document.getElementById('textType');
const textDescription = document.getElementById('textDescription')
const textfilePhoto = document.getElementById('textfilePhoto');
const textfileLinkVideo = document.getElementById('textfileLinkVideo');
const textPrice = document.getElementById('textPrice');
const textQuantity = document.getElementById('textQuantity');
const textVender = document.getElementById('textVender');
const selectVender = document.getElementById('selectVender');
const textaddFileVideo = document.getElementById('textaddFileVideo');
const textRemark = document.getElementById('textRemark');
const lbID = document.getElementById("lbID")
const btnSave = document.getElementById('btnSave');

// get the modal and get value html table to input modal
let modal = new bootstrap.Modal(document.getElementById('modalQrCodeForPicking'));
document.addEventListener("DOMContentLoaded", function () {
    console.log("Modal initialized");
    category()
    Vender()
    RunItemCode()
    listdevice()
    // listdevice()
});

textType.addEventListener('change', async function () {
    let StrCategory = selectCategory.value
    let StrType = textType.value

    try {
        if (StrType !== '' && selectCategory.selectedIndex !== 0) {
            const res = await axios.post('/devices/SearchType', {
                Category: selectCategory.value,
                keywords: textType.value
            });
            let html = '';
            let n = 1
            res.data.forEach(item => {
                html += `
            <tr style="font-size: 12px;">
            <th scope="row">${n}</th>
            <td class="text-nowrap">${item.ItemCode}</td>
            <td class="text-nowrap">${item.Category}</td>
            <td  class="table1">${item.Type}</td>
            <td>${item.Total}</td>
            <td>${item.Price}</td>
            <td>${item.VendorName}</td>
            <td>${item.CreateDate}</td>
          </tr>
            `
                n++
            });
            $("#tablelist").html(html)
            return
        } else {
            const res = await axios.post('/devices/SearchTypekeywords', {
                keywords: textType.value
            });
            let html = '';
            let n = 1
            res.data.forEach(item => {
                html += `
            <tr style="font-size: 12px;">
            <th scope="row">${n}</th>
            <td class="text-nowrap">${item.ItemCode}</td>
            <td class="text-nowrap">${item.Category}</td>
            <td  class="table1">${item.Type}</td>
            <td>${item.Total}</td>
            <td>${item.Price}</td>
            <td>${item.VendorName}</td>
            <td>${item.CreateDate}</td>
          </tr>
            `
                n++
            });
            $("#tablelist").html(html)
            return
        }
    } catch (error) {
        console.error(error);
    }
})

btnSave.addEventListener('click', async function (event) {
    const formData = new FormData();
    formData.append('RegisterNo', textitemName.value);
    formData.append('Category', selectCategory.value);
    formData.append('Type', textType.value);
    formData.append('Description', textDescription.value);
    formData.append('Price', textPrice.value);
    formData.append('Qty', textQuantity.value);
    formData.append('VendorName', textVender.value);
    formData.append('VendorName', selectVender.value);
    formData.append('Remark', textRemark.value);
    formData.append('Photo', textfilePhoto.value);
    formData.append('NID', lbID.innerText.trim());

    if (document.getElementById('textfilePhoto').value === '') {
        alert('กรุณา เพิ่มรูปภาพ');
    }
    if (document.getElementById('textfilePhoto').files[0]) {
        formData.append('picture', document.getElementById('textfilePhoto').files[0]);
    }
    const response = await axios.post('/devices/UploadFileSaveAddNewDevices', formData);
    console.log(response.data);

    try {
        if (selectVender.selectedIndex !== 0 && textVender.value !== '') {
            alert('กรุณากรอก Vender เพียง 1 ช่อง');
        } else if (selectCategory.selectedIndex !== 0 && textType.value !== '' && textDescription.value !== '' && textPrice.value !== '' && textQuantity.value !== '' && selectVender.selectedIndex !== 0) {
            const res = await axios.post('/devices/InsertAddNewDevice', {
                Category: selectCategory.value,
                Type: textType.value,
                Description: textDescription.value,
                Price: textPrice.value,
                Qty: textQuantity.value,
                VendorName: selectVender.value,
                Remark: textRemark.value,
                NID: lbID.innerText.trim()
            });
            console.log(res);
            if (!res.status === 200) {
                throw new Error("Failed to insert data");
            }
            alert("Sent Request Add New Device")
        } else if (selectCategory.selectedIndex !== 0 && textType.value !== '' && textDescription.value !== '' && textPrice.value !== '' && textQuantity.value !== '' && textVender.value !== '') {
            const res = await axios.post('/devices/InsertAddNewDevice', {
                Category: selectCategory.value,
                Type: textType.value,
                Description: textDescription.value,
                Price: textPrice.value,
                Qty: textQuantity.value,
                VendorName: textVender.value,
                Remark: textRemark.value,
                NID: lbID.innerText.trim()
            });
            console.log(res);
            if (!res.status === 200) {
                throw new Error("Failed to insert data");
            }
            alert("Sent Request Add New Device\nส่งคำขอเพิ่มข้อมูลอุปกรณ์เรียบร้อย")
        } else {
            if (selectCategory.selectedIndex === 0) {
                alert('Please fill in Category.\nกรุณากรอก Category');
            } else if (textType.value === '') {
                alert('Please fill in Type\nกรุณากรอก Type');
            } else if (textDescription.value === '') {
                alert('Please fill in Description\n กรุณากรอก Description');
            } else if (textPrice.value === '') {
                alert('Please fill in Price\nกรุณากรอก Price');
            } else if (textQuantity.value === '') {
                alert(' Please fill in Quantity\nกรุณากรอก Quantity');
            } else if (selectVender.selectedIndex === 0 && textVender.value === '') {
                alert('Please fill in Vender\nกรุณากรอก Vender');
            }
        }

        await listdevice()
        selectCategory.selectedIndex = 0;
        textType.value = '';
        textDescription.value = '';
        textPrice.value = '';
        textQuantity.value = '';
        textVender.value = '';
        selectVender.selectedIndex = 0;
        textRemark.value = '';
        textfilePhoto.value = '';
    } catch {
        console.error(error);
        console.log('NG');
        alert('Please fill in Request\nกรุณากรอก Request');
    }
})

//clear input
document.getElementById('btnClear').addEventListener('click', function () {
    selectCategory.selectedIndex = 0;
    textType.value = '';
    textDescription.value = '';
    textPrice.value = '';
    textQuantity.value = '';
    textVender.value = '';
    selectVender.selectedIndex = 0;
    textRemark.value = '';
});

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



//ข้อมูลในตาราง
async function listdevice() {
    try {
        const res = await axios.get('/devices/listDevives')
        // console.log(res.data)
        let html = '';
        let n = 1
        res.data.forEach(item => {
            html += `
          <tr style="font-size: 12px;">
                  <th scope="row">${n}</th>
                  <td class="text-nowrap">${item.ItemCode}</td>
                  <td class="text-nowrap">${item.Category}</td>
                  <td  class="table1">${item.Type}</td>
                  <td>${item.Total}</td>
                  <td>${item.Price}</td>
                  <td>${item.VendorName}</td>
                  <td>${item.CreateDate}</td>
                </tr>
          `
            n++
            // console.log(item.Category);
        });
        $("#tablelist").html(html)
    } catch (error) {
        console.error(error);
    }

}

//show data html
async function category() {

    try {
        const res = await axios.get('/devices/categoryAddNew')
        // console.log(res.data)
        let html = '';
        html = '<option>Open this select Category</option>'
        res.data.forEach(item => {
            html += `
          <option value="${item.Category}">${item.Category}</option>`
            // console.log(item.Category);
        });
        $("#selectCategory").html(html)
    } catch (error) {
        console.error(error);
    }
}

//show data html
async function RunItemCode() {
    try {
        const res = await axios.get('/devices/ItemCode')
        console.log(res.data[0].NewItemCode)
        document.getElementById("textitemName").value = res.data[0].NewItemCode;
    } catch (error) {
        console.error(error);
    }
}

async function Vender() {
    try {
        const res = await axios.get('/devices/VenderAddNew')
        console.log(res.data)

        let html = '';
        html = '<option>Open this select Vender</option>'
        res.data.forEach(item => {
            html += `
      <option value="${item.VendorName}">${item.VendorName}</option>`
            // console.log(item.Category);
        });
        $("#selectVender").html(html)
    } catch (error) {
        console.error(error);
    }

}

selectCategory.addEventListener('change', async () => {
    try {
        if (selectCategory.selectedIndex === 0) {
            listdevice();
        } else {
            // console.log(inputSearch.value)
            const res = await axios.post('/devices/searchdeviceNew', {
                keyword: selectCategory.value
            })

            let html = '';
            let n = 1
            res.data.forEach(item => {
                html += `
            <tr style="font-size: 12px;">
            <th scope="row">${n}</th>
            <td class="text-nowrap">${item.ItemCode}</td>
            <td class="text-nowrap">${item.Category}</td>
            <td  class="table1">${item.Type}</td>
            <td>${item.Total}</td>
            <td>${item.Price}</td>
            <td>${item.VendorName}</td>
            <td>${item.CreateDate}</td>
          </tr>
            `
                n++
                // console.log(item.Category);
            });
            $("#tablelist").html(html)
        }
    } catch (error) {
        console.error(error);
    }
})