const dateFormating = (date) => {
    let year = date.getFullYear()
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month > 9 ? "" + month : "0" + month;
    day = day > 9 ? "" + day : "0" + day;
    year = "" + year
    return year + month + day;
}


const isDateToday = (year, month, day) => {
    let current = new Date();
    let currentYear = current.getFullYear();
    let currentMonth = current.getMonth() + 1;
    let currentDay = current.getDate();
    if (year == currentYear && month == currentMonth && day == currentDay)
        return true
    return false
}

module.exports = { dateFormating, isDateToday }
