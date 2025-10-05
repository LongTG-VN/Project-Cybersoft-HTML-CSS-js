// import Food, FoodManager
import Food from "./../models/food.js";
import FoodManager from "./../models/foodManager.js";
import Validation from "./../models/validation.js";

const validate = new Validation();

//Khái báo mảng và gọi class
const manager = new FoodManager();
//hàm rút gọn sẽ có tên là getEle lấy dom của dữ liệu id
const getEle = (id) => document.getElementById(id);

//Nút thêm món
getEle("btnThem").onclick = function () {
    // chỉnh lại tiêu đề
    getEle("exampleModalLabel").innerHTML = "ADD";
    // cập nhật lại nút để k hiển thị
    getEle("btnCapNhat").style.display = "none";
    // cập nhật để nút thêm thiển thị
    getEle("btnThemMon").style.display = "inline-block";
    // chỉnh sửa các giá trị lại 
    document.getElementById("foodID").value = "";
    // cho foodID có thể chỉnh sửa
    getEle("foodID").disabled = false;
    document.getElementById("tenMon").value = "";
    document.getElementById("loai").value = "";
    document.getElementById("giaMon").value = "";
    document.getElementById("khuyenMai").value = "";
    document.getElementById("tinhTrang").value = "";
    document.getElementById("hinhMon").value = "";
    document.getElementById("moTa").value = "";
}

// Lấy thông tin món ăn từ form
const getInfoFood = (isAdd) => {
    const id = getEle("foodID").value;
    const name = getEle("tenMon").value;
    const type = getEle("loai").value;
    const price = getEle("giaMon").value;
    const discount = getEle("khuyenMai").value;
    const status = getEle("tinhTrang").value;
    const img = getEle("hinhMon").value;
    const des = getEle("moTa").value;

    // Bắt đầu assume là hợp lệ
    let isValid = true;

    // Check ID
    if (isAdd) {
        isValid = validate.checkEmpty(id, "invalidID", "(*) vui lòng nhập id")
            && validate.checkExist(id, "invalidID", "ID đã tồn tại", manager.arr)
            && isValid;
    }


    // Check Name
    if (!validate.checkEmpty(name, "invalidTen", "(*) vui lòng nhập Tên")) {
        isValid = false;
    } else if (!validate.checkLength(name, "invalidTen", "Tên từ 3 - 10 ký tự", 3, 10)) {
        isValid = false;
    } else if (!validate.checkCharacterString(name, "invalidTen", "Tên phải là chữ")) {
        isValid = false;
    }

    // Check Price
    isValid = validate.checkEmpty(price, "invalidGia", "(*) vui lòng nhập Giá món") && isValid;

    // Check Type
    isValid = validate.checkOption("loai", "invalidLoai", "Vui lòng chọn loại") && isValid;

    // Nếu có lỗi thì return null
    if (!isValid) return null;

    // Nếu ok thì tạo đối tượng
    const food = new Food(id, name, type, price, discount, status, img, des);
    food.calcPricePromotion();
    return food;
};


// Sau khi user thêm món ăn bấm add thì
document.getElementById("btnThemMon").onclick = function () {

    const food = getInfoFood(true);

    if (!food) return;

    //trỏ tới addfood và gửi dữ liệu 1 đối tượng về 
    manager.addFood(getInfoFood());
    // hiển thị ra bên ngoài và gửi 1 mảng qua 
    renderListFood(manager.arr);
    setLocalStorage();

    // close
    document.getElementsByClassName("close")[0].click();

};



// Lưu mảng Food vào localStorage
const setLocalStorage = () => {
    const dataString = JSON.stringify(manager.arr);
    localStorage.setItem("LIST_FOOD", dataString);
};

// Lấy mảng Food từ localStorage
const getLocalStogare = () => {
    const dataString = localStorage.getItem("LIST_FOOD");
    if (!dataString) return; // chưa có dữ liệu thì thôi

    const dataJson = JSON.parse(dataString);

    // Khôi phục lại thành instance của Food
    manager.arr = dataJson;

    renderListFood(manager.arr);
};

// Render danh sách Food ra table
const renderListFood = (data) => {
    // khởi tạo 1 biến in ra
    let contentHTML = "";
    // chạy dòng lập for
    for (let i = 0; i < data.length; i++) {
        // food là đối tượng thứ i
        const food = data[i];
        // hiển thị loại 
        let typeConvert = food.type === "loai1" ? "chay" : "mặn";
        let statusConvert = food.status === "0" ? "hết" : "còn";
        // thêm thẻ và gán giá trị 
        contentHTML += `
            <tr>
                <td>${food.id}</td> 
                <td>${food.name}</td> 
                <td>${typeConvert}</td> 
                <td>${food.price}</td> 
                <td>${food.discount}</td> 
                <td>${food.pricePromotion}</td> 
                <td>${statusConvert}</td> 
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#exampleModal" onclick="handleEditFood('${food.id}')">
                        Edit
                    </button>
                     <button class="btn btn-danger" onclick="handleDeleteFood('${food.id}')">
                        Delete
                    </button>
                </td> 
            </tr>
        `;
    }
    // sau khi làm hết sẽ gửi data qua thẻ tbody
    getEle("tbodyFood").innerHTML = contentHTML;
};

const handleEditFood = (id) => {
    // tim ob food
    getEle("exampleModalLabel").innerHTML = "EDIT";
    getEle("btnThemMon").style.display = "none";
    getEle("btnCapNhat").style.display = "inline-block";
    // tìm
    const food = manager.GetFoodById(id);
    // console.log(food.description);
    if (food) {
        document.getElementById("foodID").value = food.id;
        getEle("foodID").disabled = true;
        document.getElementById("tenMon").value = food.name;
        document.getElementById("loai").value = food.type;
        document.getElementById("giaMon").value = food.price;
        document.getElementById("khuyenMai").value = food.discount;
        document.getElementById("tinhTrang").value = food.status;
        document.getElementById("hinhMon").value = food.img;
        document.getElementById("moTa").value = food.description;
    }
    // console.log(food);
}

// Xóa món ăn
const handleDeleteFood = (id) => {
    // truyền ID muốn xoát
    manager.deleteFood(id);
    renderListFood(manager.arr);
    setLocalStorage();
};

// để gọi được ngoài HTML
window.handleDeleteFood = handleDeleteFood;
window.handleEditFood = handleEditFood;

console.log("a");



// Tự động load localStorage khi mở web
window.onload = () => {
    getLocalStogare();
};


// update food 
getEle("btnCapNhat").onclick = function () {
    const food = getInfoFood(false);
    manager.updateFood(food);
    renderListFood(manager.arr);
    setLocalStorage();
    document.getElementsByClassName("close")[0].click();

}

getEle("selLoai").addEventListener("change", () => {
    const type = getEle("selLoai").value;
    const foodFilter = manager.filterFood(type);
    renderListFood(foodFilter);
    console.log(foodFilter);
});

// Tìm kiếm

getEle("txtSreach").addEventListener("keyup", () => {
    const keyword = getEle("txtSreach").value;
    console.log(keyword);
    const searchFoods = manager.searchFoods(keyword);


    renderListFood(searchFoods);
}); 