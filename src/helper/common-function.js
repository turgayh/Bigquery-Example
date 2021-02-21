const dateFormating = (date) => {
    let year = date.getFullYear()
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month > 9 ? "" + month : "0" + month;
    day = day > 9 ? "" + day : "0" + day;
    year = "" + year
    return year + month + day;
}

module.exports = { dateFormating }
