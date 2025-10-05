class FoodManager {
    constructor() {
        this.arr = [];
    }

    addFood(food) {
        //    thêm món vào arr
        this.arr.push(food);
    }

    deleteFood(foodID) {
        // let index = -1;
        this.arr.splice(this.findIndexFood(foodID), 1);

    }
    // tìm đối tượng ở ví trị nào có id trùng
    findIndexFood(foodID) {
        let index = -1;
        for (let i = 0; i < this.arr.length; i++) {
            if (foodID === this.arr[i].id) {
                index = i;
                // console.log(i);
                break;
            }
        }
        return index;
    }

    GetFoodById(FoodId) {
        let indexFood = this.findIndexFood(FoodId);

        if (indexFood !== -1) {
            return this.arr[indexFood];
        }
        return this.arr[indexFood];

    }

    updateFood(food) {
        const index = this.findIndexFood(food.id);
        if (index !== -1) {
            this.arr[index] = food;
        }
    }

    filterFood(type) {
        let foodFilter = [];

        if (type === "all") {
            return this.arr
        }

        for (let i = 0; i < this.arr.length; i++) {
            const food = this.arr[i];
            if (food.type === type) {
                foodFilter.push(food);
            }

        }
        return foodFilter;
    }


    searchFoods(keyword) {
        const searchFoods = [];
        for (let i = 0; i < this.arr.length; i++) {
            const element = this.arr[i];
            // chuyển đối tượng sang viết thường

            const nameLowerCase = element.name.toLowerCase();

            // chuyển sang viết hó

            const nameKeyword = keyword.toLowerCase();

            // nameLowerCase.indexOf(nameKeyword) trả về số nguyên là vị trí của kí tự nếu ko tìm thấy sẽ trẩ về -1

            if (nameLowerCase.indexOf(nameKeyword) !== -1) {
                searchFoods.push(element);
            }
        }
        return searchFoods;

    }
}

export default FoodManager;