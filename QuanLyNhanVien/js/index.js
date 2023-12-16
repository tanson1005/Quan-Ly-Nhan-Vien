var employees = [];

    class Employee{
        constructor(account, name, email, password, dob, salary, position, work_time) {
        this.account = account;
        this.name = name;
        this.email = email;
        this.password = password;
        this.dob = dob;
        this.salary = salary;
        this.position = position;
        this.work_time = work_time;
        this.totalSalary = this.calculateTotalSalary();
        this.employeeType = this.employeeRating();
    }

    calculateTotalSalary() {
        let totalSalary = 0;
        if (this.position === 'Sếp') {
          totalSalary = this.salary * 3;
        } else if (this.position === 'Trưởng phòng') {
          totalSalary = this.salary * 2;
        } else {
          totalSalary = this.salary;
        }
        return totalSalary;
      }
      employeeRating() {
        if (this.work_time >= 192) {
          return 'Nhân viên xuất sắc';
        } else if (this.work_time >= 176) {
          return 'Nhân viên giỏi';
        } else if (this.work_time >= 160) {
          return 'Nhân viên khá';
        } else {
          return 'Nhân viên trung bình';
        }
      }
    }
    
    function validateAccount(account) {
        return /^\d{4,6}$/.test(account);
      }
      
      function validateFullName(name) {
        return /^[A-Za-z\u00C0-\u017F\s]+$/.test(name) || /^[\p{L}\s']+$/u.test(name);
      }
      
      function validateEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
      }
      
      function validatePassword(password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/.test(password);
      }
      
      function validateDate(dob) {
        const dateRegex = /^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/;
        return dateRegex.test(dob);
      }
      
      function validateBaseSalary(salary) {
        return salary >= 1000000 && salary <= 20000000;
      }
      
      function validateHoursWorked(work_time) {
        return work_time >= 80 && work_time <= 200;
      }

      //!Lưu dữ liệu nhân viên vào localStorage
      function saveData() {
        localStorage.setItem('employeesData', JSON.stringify(employees));
      }
      //!clear
      function clearTextInput() {
        document.getElementById("tknv").value = "";
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("datepicker").value = "";
        document.getElementById("luongCB").value = "";
        document.getElementById("position").value = "Chọn chức vụ";
        document.getElementById("gioLam").value = "";
    }    
    //!thêm mới nhân viên
    function addEmployee() {
        var currentDate = new Date();
        var selectedDate = new Date(document.getElementById("datepicker").value);
        var account = document.getElementById("tknv").value;
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var dob = document.getElementById("datepicker").value;
        var salary = document.getElementById("luongCB").value;
        var position = document.getElementById("position").value;
        var work_time = document.getElementById("gioLam").value;
    
        const isDuplicate = employees.some(existingEmployee => {
          return existingEmployee.account === account && existingEmployee.email.toLowerCase() === email.toLowerCase();
        });

        if (isDuplicate) {
          alert('Thông tin nhân viên đã tồn tại trong danh sách.');
          return;
        }

        if (!account || !name || !email || !dob || !salary || !position || !work_time) {
          alert("Hãy điền vào tất cả các ô còn trống ");
          return;
        }

        if (!validateAccount(account)) {
          alert('Tài khoản không hợp lệ. Tài khoản phải có từ 4 đến 6 chữ số.');
          return;
        }
        
        if (!validateFullName(name)) {
          alert('Họ và tên không hợp lệ. Phải là chữ và không để trống.');
          return;
        }
        
        if (!validateEmail(email)) {
          alert('Email không hợp lệ.');
          return;
        }
        
        if (!validatePassword(password)) {
          alert('Mật khẩu không hợp lệ. Mật khẩu phải có từ 6 đến 10 ký tự, bao gồm ít nhất 1 chữ số, 1 chữ cái in hoa, 1 chữ cái thường và 1 ký tự đặc biệt.');
          return;
        }
        
        if (selectedDate > currentDate) {
          alert("Ngày/tháng/năm nhập không được lớn hơn ngày hiện tại.");
          return;
        }

        if (!validateDate(dob)) {
          alert('Ngày làm không hợp lệ. Định dạng mm/dd/yyyy.');
          return;
        }
        
        if (!validateBaseSalary(salary)) {
          alert('Lương cơ bản không hợp lệ. Lương phải từ 1,000,000 đến 20,000,000.');
          return;
        }
        if (!validateHoursWorked(work_time)) {
          alert('Giờ làm trong tháng không hợp lệ. Giờ làm phải từ 80 đến 200.');
          return;
        }
        
        var newEmployee = new Employee(account, name, email, password, dob, salary, position, work_time);
        employees.push(newEmployee);

        displayEmployeeList();
        alert('Thêm mới thành công!');
     
    }
//!chỉnh sửa nhân viên
    function editEmployee(index) {
      $('#myModal').modal('show');
  
      let employee = employees[index];
      document.getElementById('tknv').value = employee.account;
      document.getElementById('name').value = employee.name;
      document.getElementById('email').value = employee.email;
      document.getElementById('password').value = employee.password;
      document.getElementById('datepicker').value = employee.dob;
      document.getElementById('luongCB').value = employee.salary;
      document.getElementById('position').value = employee.position;
      document.getElementById('gioLam').value = employee.work_time;
  

      document.getElementById('header-title').innerText = 'Edit Employee';
      document.getElementById('btnThemNV').style.display = 'none'; 
      document.getElementById('btnCapNhat').style.display = 'block'; 
      document.getElementById('tknv').style.display = 'none';
      document.getElementById('btnCapNhat').onclick = function () {
          updateEmployeeDetails(index);
      };
  }
  
  function updateEmployeeDetails(index) {
      var currentDate = new Date();
      var selectedDate = new Date(document.getElementById("datepicker").value);
      var account = document.getElementById("tknv").value;
      var name = document.getElementById("name").value;
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      var dob = document.getElementById("datepicker").value;
      var salary = document.getElementById("luongCB").value;
      var position = document.getElementById("position").value;
      var work_time = document.getElementById("gioLam").value;
  
      if (!account || !name || !email || !dob || !salary || !position || !work_time) {
        alert("Hãy điền vào tất cả các ô còn trống ");
        return;
    }

    if (!validateAccount(account)) {
        alert('Tài khoản không hợp lệ. Tài khoản phải có từ 4 đến 6 chữ số.');
        return;
    }
    
    if (!validateFullName(name)) {
        alert('Họ và tên không hợp lệ. Phải là chữ và không để trống.');
        return;
    }
    
    if (!validateEmail(email)) {
        alert('Email không hợp lệ.');
        return;
    }
    
    if (!validatePassword(password)) {
        alert('Mật khẩu không hợp lệ. Mật khẩu phải có từ 6 đến 10 ký tự, bao gồm ít nhất 1 chữ số, 1 chữ cái in hoa, 1 chữ cái thường và 1 ký tự đặc biệt.');
        return;
    }
    
    if (selectedDate > currentDate) {
      alert("Ngày/tháng/năm nhập không được lớn hơn ngày hiện tại.");
      return;
    }

    if (!validateDate(dob)) {
        alert('Ngày làm không hợp lệ. Định dạng mm/dd/yyyy.');
        return;
    }
    
    if (!validateBaseSalary(salary)) {
        alert('Lương cơ bản không hợp lệ. Lương phải từ 1,000,000 đến 20,000,000.');
        return;
    }
    if (!validateHoursWorked(work_time)) {
        alert('Giờ làm trong tháng không hợp lệ. Giờ làm phải từ 80 đến 200.');
        return;
    }

      employees[index].account = account;
      employees[index].name = name;
      employees[index].email = email;
      employees[index].password = password;
      employees[index].dob = dob;
      employees[index].salary = salary;
      employees[index].position = position;
      employees[index].work_time = work_time;
  
      employees[index].totalSalary = employees[index].calculateTotalSalary();
      employees[index].employeeType = employees[index].employeeRating();

  
      displayEmployeeList();

      $('#myModal').modal('hide');

       alert('Chỉnh sửa thành công!');
       clearTextInput();
  }
  
    
  //!xoá nhân viên
    function deleteEmployee(index) {
        var confirmation = confirm("Bạn chắc chắn có muốn xoá không");
        if (confirmation) {
            employees.splice(index, 1);
            displayEmployeeList();
        }
    }
    //! Lưu dữ liệu khi trang được tải lại hoặc đóng
    window.addEventListener('beforeunload', saveData);
    function displayEmployeeList() {
        var table = document.getElementById("employee_list");

        for (var i = 1; i < table.rows.length; i++) {
            table.deleteRow(i);
            i--;
        }

        for (var i = 0; i < employees.length; i++) {
            var row = table.insertRow(i + 1);

            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);
            var cell7 = row.insertCell(6);
            var cell8 = row.insertCell(7);
            
            cell1.innerHTML = employees[i].account;
            cell2.innerHTML = employees[i].name;
            cell3.innerHTML = employees[i].email;
            cell4.innerHTML = employees[i].dob;
            cell5.innerHTML = employees[i].totalSalary;
            cell6.innerHTML = employees[i].position;
            cell7.innerHTML = employees[i].employeeType;
            cell8.innerHTML =
            '<button class="edit" onclick="editEmployee(' + i + ')">Edit</button>'+'<br><br>'+
            '<button class="xoa" onclick="deleteEmployee(' + i + ')">Delete</button>';
        }
    }

    document.getElementById("btnThemNV").onclick = addEmployee;
    document.getElementById("btnThem").onclick = clearTextInput;
   

    document.getElementById("btnTimNV").onclick = searchEmployee;

    //!chức năng tìm kiếm
function searchEmployee() {
    var searchAccount = document.getElementById("searchName").value.trim().toLowerCase();
    var searchName = document.getElementById("searchName").value.trim().toLowerCase();
    var searchEmail = document.getElementById("searchName").value.trim().toLowerCase();

    var filteredEmployees = employees.filter(function(employee) {
        return (
            employee.account.toLowerCase().includes(searchAccount) ||
            employee.name.toLowerCase().includes(searchName) ||
            employee.email.toLowerCase().includes(searchEmail)
        );
    });

    displayFilteredResults(filteredEmployees);
}

function displayFilteredResults(filteredEmployees) {
    var table = document.getElementById("employee_list");
    for (var i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
    filteredEmployees.forEach(function(employee) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);

        cell1.innerHTML = employee.account;
        cell2.innerHTML = employee.name;
        cell3.innerHTML = employee.email;
        cell4.innerHTML = employee.dob;
        cell5.innerHTML = employee.totalSalary;
        cell6.innerHTML = employee.position;
        cell7.innerHTML = employee.employeeType;
        cell8.innerHTML =
            '<button class="edit" onclick="editEmployee(' + employees.indexOf(employee) + ')">Edit</button>' +
            '<br><br>' +
            '<button class="xoa" onclick="deleteEmployee(' + employees.indexOf(employee) + ')">Delete</button>';
    });
}
//! Tải dữ liệu nhân viên từ localStorage khi tải trang
window.addEventListener('DOMContentLoaded', function() {
  const storedData = localStorage.getItem('employeesData');
  if (storedData) {
    employees = JSON.parse(storedData);
    displayEmployeeList();
  }
});