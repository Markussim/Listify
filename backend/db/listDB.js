const ListItem = require("./models/listItem");
const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

// Get all listitems in list
exports.getListItems = (list) => {
    return new Promise((resolve, reject) => {
        ListItem.find({ list: list }, (err, listItems) => {
            if (err) {
                reject(err);
            } else {
                resolve(listItems);
            }
        });
    });
}

// Add a listitem to list
exports.addListItem = (list, name) => {
    return new Promise((resolve, reject) => {
        let listItem = new ListItem({
            name: name,
            list: list,
        });
        listItem.save((err, listItem) => {
            if (err) {
                reject(err);
            } else {
                resolve(listItem);
            }
        });
    });
}

// Remove a listitem from list
exports.removeListItem = (list, id) => {
    return new Promise((resolve, reject) => {
        ListItem.deleteOne({ list: list, _id: id }, (err, listItem) => {
            if (err) {
                reject(err);
            } else {
                resolve(listItem);
            }
        });
    });
}

// Buy a listitem from list
exports.buyListItem = (list, id) => {
    return new Promise((resolve, reject) => {
        ListItem.findOneAndUpdate({ list: list, _id: id }, { $set: { bought: true } }, { new: true }, (err, listItem) => {
            if (err) {
                reject(err);
            } else {
                resolve(listItem);
            }
        });
    });
}

// Unbuy a listitem from list
exports.unbuyListItem = (list, id) => {
    return new Promise((resolve, reject) => {
        ListItem.findOneAndUpdate({ list: list, _id: id }, { $set: { bought: false } }, { new: true }, (err, listItem) => {
            if (err) {
                reject(err);
            } else {
                resolve(listItem);
            }
        });
    });
}