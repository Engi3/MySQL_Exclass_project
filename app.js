const express = require('express');
const mysql = require('mysql2');
const app = express();

// การตั้งค่าเชื่อมต่อ MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '111111', // แก้ไขเป็นรหัสผ่าน MySQL ของคุณ
    database: 'faker_data' // แก้ไขเป็นชื่อฐานข้อมูล MySQL ที่ต้องการเชื่อมต่อ
});

// เชื่อมต่อกับ MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
        return;
    }
    console.log('Connected to MySQL database as id', connection.threadId);
});

// ตั้งค่า Express.js เพื่อใช้งานไฟล์แสดงผล HTML
app.use(express.static('public'));
app.set('view engine', 'ejs');

// เส้นทางสำหรับดึงข้อมูลพนักงาน
app.get('/employees', (req, res) => {
    const sql = "SELECT EmployeeID, Name, Position, Salary, Address, PhoneNumber FROM employee_data";
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error querying database:', err.stack);
            res.status(500).send('Error querying database');
            return;
        }
        res.json(results);
    });
});

// เริ่มเซิร์ฟเวอร์ที่ port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
