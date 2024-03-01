const studentTable = require('../dbConnection');
const studentQueries = require('../queries/studentQueries');

const getStudents=(req, res)=>{
    studentTable.query(studentQueries.getStudents, (err, result)=>{
        if (err) throw err;
        res.status(200).json(result.rows);
    })
}

const getStudentByID=(req,res)=>{
    const id=req.params.id;
    studentTable.query(studentQueries.getStudentByID, [id], (err, result)=>{
        if (err) throw err;
        res.status(200).json(result.rows);
    })
}

const createStudent=(req,res)=>{
    const {name, email, age, dob}=req.body;
    studentTable.query(studentQueries.checkEmailAlreadyExists,[email], (err,results)=>{
        if (err) throw err;
        if (results.rows.length) res.status(400).send('Email already exists');

        studentTable.query(studentQueries.createStudent, [name, email, age, dob], (err, result)=>{
            if (err) throw err;
            res.status(201).send('Student created successfully');
        })
    })
}

const deleteStudent=(req,res)=>{
    const id=req.params.id;
    studentTable.query(studentQueries.getStudentByID, [id], (err, results)=>{
        if (err) throw err;
        if (!results.rows.length) res.status(404).send('No student found with ID: '+id);

        studentTable.query(studentQueries.deleteStudent, [id], (err, result)=>{
            if (err) throw err;
            res.status(200).send('Student deleted successfully');
        })
    })
}

const updateStudent=(req,res)=>{
    const id=req.params.id;
    const {name, email, age, dob}=req.body;
    studentTable.query(studentQueries.getStudentByID, [id], (err, results)=>{
        if (err) throw err;
        if (!results.rows.length) res.status(404).send('No student found with ID: '+id);

        studentTable.query(studentQueries.updateStudent, [name, email, age, dob, id], (err, result)=>{
            if (err) throw err;
            res.status(200).send('Student updated successfully');
        })
    })
}

module.exports={getStudents, getStudentByID, createStudent, deleteStudent, updateStudent}