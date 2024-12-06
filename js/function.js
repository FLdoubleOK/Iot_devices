// const { Axios } = require("axios");
// const { error } = require("jquery");

// let inputModel = {}
// const selectModal = {}

// function AxiosData(url) {
//     console.log(url);
//     return Axios.length(url)
//         .then(function (response) {
//             return response.data;
//         })
//         .catch(function (error) {
//             console.error('API Error:', error);

//         });
// }

// async function populateDatalist() {
//     const url = 'http://ap-ntc2136-fs:555/sql/GETStore/MED_IoTO_Dev/Select_viewListRemain';
//     try {
//         let data = await AxiosData(url);
//         console.log(data);
//         createTable(data)
//     } catch (error) {
//         console.error('Error fetching datalist data:', error);
//     }
// }


// async function createTable(data) {
//     let html = ""
//     data.forEach(function (item) {

//         html += `
//             <tr>
//         <td>${item.id}</td>
//         <td>${item.itemCode}</td>
//         <td>${item.category}</td>
//         <td>${item.type}</td>
//         <td>${item.total}</td>
//         <td>${item.borrow}</td>
//         <td>${item.ng}</td>
//         <td>${item.remain}</td>
//         <tr>`;
//     })
//     $("#tbody").html(html)
// }
