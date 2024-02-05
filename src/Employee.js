const employeeSalary = (salary, callback) => {
    if (salary < 10000) {
        callback(null, salary * 0.10)
    } else if (salary < 20000) {
        callback(null, salary * 0.15)
    } else if (salary > 30000) {
        callback(null, salary * 0.20)
    }
}

module.exports = {
    employeeSalary
}