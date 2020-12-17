let addDashes = (phone) => {
    const newPhone = phone.toString();
    return newPhone.slice(0,3) + '-' + newPhone.slice(3, 6) + '-' + newPhone.slice(6);
}

module.exports = {
    addDashes: addDashes
}