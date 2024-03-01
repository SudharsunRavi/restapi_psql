const getStudents = 'SELECT * FROM students';
const getStudentByID= 'SELECT * FROM students WHERE id=$1';
const checkEmailAlreadyExists = 'SELECT * FROM students WHERE email=$1';
const createStudent = 'INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4) ';
const deleteStudent = 'DELETE FROM students WHERE id=$1';
const updateStudent = 'UPDATE students SET name=$1, email=$2, age=$3, dob=$4 WHERE id=$5';

module.exports = { getStudents, getStudentByID, checkEmailAlreadyExists, createStudent, deleteStudent, updateStudent};