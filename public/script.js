document.addEventListener('DOMContentLoaded', function () {
    fetchEmployeeData();
});

function fetchEmployeeData() {
    fetch('/employees') // เปลี่ยนเป็นเส้นทางที่ส่งคืน JSON จาก Express.js
        .then(response => response.json())
        .then(data => {
            const employeeTableBody = document.getElementById('employee-table-body');
            employeeTableBody.innerHTML = '';

            data.forEach(employee => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${employee.EmployeeID}</td>
                    <td>${employee.Name}</td>
                    <td>${employee.Position}</td>
                    <td>${employee.Salary}</td>
                    <td>${employee.Address}</td>
                    <td>${employee.PhoneNumber}</td>
                `;
                employeeTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching employee data:', error);
        });
}
