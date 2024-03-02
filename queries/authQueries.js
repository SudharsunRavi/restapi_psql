const registerStudent="INSERT INTO auth (name, email, password) VALUES ($1, $2, $3)"
const checkIfEmailExists="SELECT * FROM auth WHERE email=$1"

module.exports={registerStudent, checkIfEmailExists}