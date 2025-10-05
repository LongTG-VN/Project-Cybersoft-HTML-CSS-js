class Validation {
    checkEmpty(value, errorID, script) {
        if (value === "") {
            document.getElementById(errorID).style.display = "block";
            document.getElementById(errorID).innerHTML = script;
            return false;
        } else {
            document.getElementById(errorID).style.display = "none";
            document.getElementById(errorID).innerHTML = "";
            return true;
        }
    }

    checkOption(idSelect, errorID, mess) {
        const optionIndex = document.getElementById(idSelect).selectedIndex;
        if (optionIndex == 0) {
            // error
            document.getElementById(errorID).style.display = "block";
            document.getElementById(errorID).innerHTML = mess;
            return false;
        }
        document.getElementById(errorID).style.display = "none";
        document.getElementById(errorID).innerHTML = "";
        return true;
    }
    checkCharacterString(value, errorID, mess) {
        // Khai báo regex đúng cách (regex literal, không để trong "")
        let letter = /^[A-Za-z]+$/;

        if (letter.test(value)) { // test trả về true/false
            document.getElementById(errorID).style.display = "none";
            document.getElementById(errorID).innerHTML = "";
            return true;
        }

        // error
        document.getElementById(errorID).style.display = "block";
        document.getElementById(errorID).innerHTML = mess;
        return false;
    }


    checkLength(value, errorID, mess, min, max) {
        if (value && (min <= value.trim().length) && value.trim().length <= max) {
            // ss

            document.getElementById(errorID).style.display = "none";

            document.getElementById(errorID).innerHTML = "";


            return true;
        }
        // fa
        document.getElementById(errorID).style.display = "block";
        document.getElementById(errorID).innerHTML = mess;
        return false;
    }

    checkExist(value, errorID, mess, listData) {
        let isExist = false;

        for (let i = 0; i < listData.length; i++) {
            const element = listData[i];

            if (element.id === value) {
                isExist = true;
                break;
            }

        }

        if (isExist) {
            document.getElementById(errorID).style.display = "block";
            document.getElementById(errorID).innerHTML = mess;
            return false;
        }
        else {
            document.getElementById(errorID).style.display = "none";
            document.getElementById(errorID).innerHTML = "";
            return true;
        }


    }





}

export default Validation