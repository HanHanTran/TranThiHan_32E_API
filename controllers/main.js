function renderSanPham(arrSanPham) {
    var html = '';
    for (index = 0; index < arrSanPham.length; index++) {
        var sp = arrSanPham[index];
        html += `
        <tr>
        <td>${sp.id}</td>
        <th><img src="${sp.img}" style="width:20%"/></th>
        <td>${sp.name}</td>
        <td>${sp.price}</td>
        <td>${sp.description}</td>
        <td>${sp.type}</td>
        <td>
        <button class="btn btn-primary" onclick="chinhSua('${sp.id}')">Sửa</button>
        </td>
        <td>
        <button class="btn btn-danger" onclick="xoaSP('${sp.id}')">Xoá</button>
        </td>
        
        </tr>
        `;
    }
    document.querySelector('#tblSanPham').innerHTML = html;
}


// ------------ GET: Lấy dữ liệu từ sever về -----------
function laydanhsachSanPhamApi() {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetAll ',
        method: 'GET'

    });
    promise.then(function (result) {
        console.log(result.data);
        renderSanPham(result.data);
    });
    promise.catch(function (err) {
        console.log(err);

    });
}
//gọi hàm khi lấy dữ liệu từ sever khi trang web vừa load xong
window.onload = function () {
    laydanhsachSanPhamApi();
}


// POST: Thêm sản phẩm
document.querySelector('#btnXacNhan').onclick = function () {
    var sanPham = new SanPham();
    sanPham.id = document.querySelector('#id').value;
    sanPham.name = document.querySelector('#name').value;
    sanPham.img = document.querySelector('#img').value;
    sanPham.price = document.querySelector('#price').value;
    sanPham.description = document.querySelector('#description').value;
    sanPham.type = document.querySelector('#type').value;
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/CreateProduct',
        method: 'POST',
        data: sanPham
    });
    promise.then(function (result) {
        console.log(result.data);
        laydanhsachSanPhamApi();
    });
    promise.catch(function (err) {
        console.log(err);
    })
}





//DEL: xoá dữ liệu
function xoaSP(maSPClick) {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/DeleteProduct/' + maSPClick,
        //http://svcy.myclass.vn/api/Product/DeleteProduct/
        method: 'DELETE',

    });
    promise.then(function (result) {
        console.log(result.data);
        laydanhsachSanPhamApi();

    });
    promise.catch(function (err) {
        console.log(err);

    })
}


// chỉnh sửa
function chinhSua(id) {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetById/' + id,
        method: 'GET'
    });
    promise.then(function (result) {
        var sanPham = result.data;
        document.querySelector('#id').value = sanPham.id;
        document.querySelector('#img').value = sanPham.img;
        document.querySelector('#name').value = sanPham.name;
        document.querySelector('#price').value = sanPham.price;
        document.querySelector('#description').value = sanPham.description;
        document.querySelector('#type').value = sanPham.type;
    });
    promise.catch(function (err) {
        console.log(err)

    })
}


//PUT: cập nhật sữ liệu
document.querySelector('#btnCapNhat').onclick = function () {
    var sanPhamCapNhat = new SanPham();
    sanPhamCapNhat.id = document.querySelector('#id').value;
    sanPhamCapNhat.name = document.querySelector('#name').value;
    sanPhamCapNhat.img = document.querySelector('#img').value;
    sanPhamCapNhat.price = document.querySelector('#price').value;
    sanPhamCapNhat.description = document.querySelector('#description').value;
    sanPhamCapNhat.type = document.querySelector('#type').value;
    // call api
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/UpdateProduct/' + sanPhamCapNhat.id,
        method: 'PUT',
        data: sanPhamCapNhat
    });
    promise.then(function (result) {
        console.log(result.data);
        laydanhsachSanPhamApi();
    });
    promise.catch(function (err) {
        console.log(err);
    });

}

// tìm kiếm sản phẩm 

document.querySelector('#btnSearch').onclick = function () {
    var timKiem = document.querySelector('#nameSearch').value;
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/SearchByName?name=' + timKiem,
        method: 'GET',

    });
    promise.then(function (result) {
        console.log(result.data);;
        renderSanPham(result.data);
        
    });
    promise.catch(function (err) {
        
        console.log(err);
    });


}

