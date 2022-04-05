// These are the global variable used through out the program. Any part of the code has access to these veriables.

const form = document.regForm; let totalCourses = [], userData = [];

let eId, upId, userName, userEmail, userContact, userAge, userCourses, userAddress, userGender;

// This is reusable object you find methods of this object many times throught the program

const reusableFun = {

    printTd: (tar, data, tr) => {
        let td = document.createElement("td");
        td.innerHTML = data;
        tr.appendChild(td);
        tar.appendChild(tr);
        return tar;
    },

    getValues: function () {
        userName = document.getElementById("uName");
        userEmail = document.getElementById("uEmail");
        userContact = document.getElementById("uContact");
        userAge = document.getElementById("uAge");
        userCourses = document.regForm.courses;
        userAddress = document.getElementById("uAddress");
        userGender = document.regForm.gender;

        return userName, userEmail, userContact, userAge, userCourses, userAddress, userGender, totalCourses;
    },

    resetValues: function () {
        this.getValues();
        userName.value = "";
        userEmail.value = "";
        userContact.value = "";
        userAge.value = "Choose your age";
        userGender.forEach(item => {
            item.checked = false;
        });
        userCourses.forEach(item => {
            item.checked = false;
        });
        userAddress.value = "";
    },

    fieldsValid: function () {
        this.getValues();

        return userValidation.nameValid(userName) && userValidation.emailValid(userEmail) && userValidation.contactValid(userContact) && userValidation.ageValid(userAge) && userValidation.genderValid(userGender) && userValidation.coursesValid(totalCourses) && userValidation.addressValid(userAddress);
    },

    alertTxt: function (txt, type) {
        let p = document.createElement("p");
        if(arguments.length == 1){
            p.classList = "alertBox";
        }
        else {
            p.classList = "alertBox " + type + " ";
        }
        p.textContent = txt;

        document.getElementsByClassName("main")[0].insertAdjacentElement('afterbegin', p);

        p.style.left = `calc(50% - ${p.offsetWidth / 2}px)`;
        setTimeout(() => {
            document.getElementsByClassName("main")[0].removeChild(p);
        }, 1500);

    },

    // Getting data from local storage and set this data to a global variable;

    getLocalFormData: () => {
        if (localStorage.getItem("User")) {
          userData = JSON.parse(localStorage.getItem("User"));
        } else {
          userData = [];
        }
      }
}

const userValidation = {

    emailValid: (email) => {
        if (email.value == "" || email.value == null) {
            reusableFun.alertTxt("Please enter the email.");
            email.focus();
            return false;
        }
        if (email.value.indexOf("@") < 0) {
            reusableFun.alertTxt("@ is missing in email.");
            email.focus();
            return false;
        }
        if (email.value.indexOf(".") < 0) {
            reusableFun.alertTxt("[dot] is missing in email.");
            email.focus();
            return false;
        }
        return true;
    },

    nameValid: (name) => {
        if (name.value == "" || name.value == null) {
            reusableFun.alertTxt("Please enter user name.");
            name.focus();
            return false;
        } else if (!/^[a-zA-Z\s]*$/g.test(name.value)) {
            reusableFun.alertTxt("User name should be alphabates only.");
            name.focus();
            return false;
        }

        return true;
    },

    ageValid: (age) => {
        if (age.value == "Choose your age") {
            reusableFun.alertTxt("Please choose your age from drop down.");
            age.focus();
            return false;
        }
        return true;
    },
    contactValid: (contact) => {
        if (contact.value == "" || contact.value == null) {
            reusableFun.alertTxt("Contact should not be empty.");
            contact.focus();
            return false;
        }
        if (!/^[0-9]{10}$/g.test(contact.value)) {
            reusableFun.alertTxt("Contact should be 10 charecters long only.");
            contact.focus();
            return false;
        }

        return true;
    },

    genderValid: (gender) => {
        if (gender.value == "" || gender.value == null) {
            reusableFun.alertTxt("Please choose your gender.");
            gender[0].focus();
            return false;
        }
        return true;
    },

    addressValid: (adr) => {
        if (adr.value == "" || adr.value == null) {
            reusableFun.alertTxt("Please enter your address.");
            adr.focus();
            return false;
        }
        return true;
    },

    coursesValid: (course) => {
        if (course.length <= 0) {
            reusableFun.alertTxt("Please choose one course or more.");
            userCourses[0].focus();
            totalCourses = [];
            return false;
        }

        return true;
    },

    dupValid: (email, text) => {
        let flag = false;
        userData.forEach(item => {
            if (item.email.toLowerCase() == email.value.toLowerCase()) {
                reusableFun.alertTxt("Email already exists. Please use other email to register. :)");
                email.focus();
                flag = true;
                return false;
            }
        })
        return flag;
    },

    dupValidForUp: (email, text) => {
        let flag = true;
        if (userData[upId].email.toLowerCase() != email.value.toLowerCase()) {
            reusableFun.alertTxt("Email can't be update.");
            email.focus();
            email.value = userData[upId].email;
            flag = false;
            return false;
        }
        return flag;
    }

}


const userManagement = {

    addUser: (name, email, contact, age, gender, courses, address) => {
        userData.push({
            name: name,
            email: email,
            contact: contact,
            age: age,
            gender: gender,
            courses: courses,
            address: address
        });
        localStorage.setItem("User", JSON.stringify(userData));
    },

    createUserBtn: () => {
        document.getElementsByClassName("userForm")[0].classList.add("active");
        document.getElementsByClassName("userData")[0].classList.remove("active");
        document.getElementById("subBtn").textContent = "Register";
        form.setAttribute("onsubmit", "event.preventDefault(); submitForm()");
        reusableFun.resetValues();
        let dataPanel = document.getElementsByClassName("userData")[0].getElementsByTagName("tbody")[0];
        dataPanel.innerHTML = "";
    },

    displayUser: () => {

        let dataPanel = document.getElementsByClassName("userData")[0].getElementsByTagName("tbody")[0];
        dataPanel.innerHTML = "";
        if (userData.length > 0) {

            userData.map((item, index) => {
                const { name, email, contact, courses } = item;

                let tr = document.createElement("tr");

                reusableFun.printTd(dataPanel, ++index, tr);

                reusableFun.printTd(dataPanel, name, tr);

                reusableFun.printTd(dataPanel, email, tr);

                reusableFun.printTd(dataPanel, contact, tr);

                reusableFun.printTd(dataPanel, courses, tr);

                reusableFun.printTd(dataPanel,
                    `<i class="fa fa-pencil" upId = ${index} title="Edit"></i>
                    <i class="fa fa-trash" delId = ${index} title="Delete"></i>`, tr);

            });

            let tarItem = document.getElementsByTagName("i");

            for (let item of tarItem) {
                if (item.classList[1] == "fa-pencil") {
                    item.setAttribute("onclick", "userManagement.editBtn(this)");
                }
                else item.setAttribute("onclick", "userManagement.deleteUser(this)");
            }



        }
        else {
            document.getElementsByClassName("userData")[0].classList.remove("active");
        };
    },

    showUserBtn: function () {

        reusableFun.getLocalFormData();
        
        document.getElementsByClassName("userForm")[0].classList.remove("active");
        let dataPanel = document.getElementsByClassName("userData")[0];
        let btnId = document.getElementById("showUser");
        if (userData.length <= 0) {
            reusableFun.alertTxt("No user data found. Please add some. :)");
        }
        else {
            dataPanel.classList.add("active");
            userManagement.displayUser();
        }

        reusableFun.resetValues();
    },

    deleteUser: function (id) {
        reusableFun.getLocalFormData();
        let delId = +id.getAttribute("delID") - 1;
        let conDel = confirm("Do you really want to delete this user?")
        conDel && userData.splice(delId, 1); userManagement.displayUser();
        localStorage.setItem("User", JSON.stringify(userData));
    },

    editBtn: function (id) {
        reusableFun.getLocalFormData();
        document.body.classList.add("edit");
        if (document.body.classList == "edit") {
            document.getElementById("subBtn").textContent = "Update";
            form.setAttribute("onsubmit", "event.preventDefault(); userManagement.updateUser()");
            userEmail.disabled = true;
        }

        upId = +id.getAttribute("upID") - 1;
        const { name, email, contact, age, gender, courses, address } = userData[upId];

        reusableFun.getValues();

        userName.value = name;
        userEmail.value = email;
        userContact.value = contact;

        let ageOpt = userAge.getElementsByTagName("option");

        for (let i = 0; i < ageOpt.length; i++) {
            if (ageOpt[i].value == age) {
                ageOpt[i].selected = true;
            }
        }

        userAddress.value = address;

        userGender.forEach(item => {
            if (item.id == gender) {
                item.checked = true;
            }
        });

        courses.map(item => {
            userCourses.forEach(course => {
                if (course.nextElementSibling.textContent.trim() == item) {
                    course.checked = true;
                }
            })
        });
    },

    cancelBtn: function () {
        document.body.classList.remove("edit");
        reusableFun.resetValues();
        document.getElementsByClassName("userForm")[0].classList.remove("active");
        document.getElementsByClassName("userData")[0].classList.add("active");
        form.removeAttribute("onsubmit");
        userEmail.disabled = false;
        userManagement.displayUser();
        
    },

    updateUser: function () {

        reusableFun.getValues();

        reusableFun.getLocalFormData();

        userCourses.forEach(course => {
            course.checked && totalCourses.push(course.nextElementSibling.textContent.trim());
        });

        if (!reusableFun.fieldsValid()) {
            totalCourses = [];
            return false;
        }

        if (!userValidation.dupValidForUp(userEmail)) {
            totalCourses = [];
            return false;
        }

        if (reusableFun.fieldsValid()) {
            userData[upId].name = userName.value;
            userData[upId].email = userEmail.value;
            userData[upId].contact = userContact.value;
            userData[upId].age = userAge.value;
            userData[upId].gender = userGender.value;
            userData[upId].address = userAddress.value;
            userData[upId].courses = totalCourses;

            reusableFun.alertTxt("User data successfully updated:)", "altGreen");
            userManagement.displayUser();
            this.cancelBtn();
            totalCourses = [];
            localStorage.setItem("User", JSON.stringify(userData));
        }

    }

}

function submitForm() {

    reusableFun.getValues();

    userCourses.forEach(course => {
        course.checked && totalCourses.push(course.nextElementSibling.textContent.trim());
    });

    if (!reusableFun.fieldsValid()) {
        totalCourses = [];
        return false;
    }

    if (userValidation.dupValid(userEmail)) {
        totalCourses = [];
        return false;
    }

    if (!userValidation.dupValid(userEmail) && reusableFun.fieldsValid()) {

        userManagement.addUser(userName.value, userEmail.value, userContact.value, userAge.value, userGender.value, totalCourses, userAddress.value);

        reusableFun.resetValues();

        reusableFun.alertTxt("User successfully registered! :)", "altGreen");

        document.getElementsByClassName("userForm")[0].classList.remove("active");
        document.getElementsByClassName("userData")[0].classList.add("active");
        userManagement.displayUser();
        userManagement.cancelBtn();
        totalCourses = [];

    } else {
        console.log("Not valid")
    }

}



