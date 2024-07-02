// Import modul handler
const {showAllBooks, deleteBooks, showDetailBooks, saveBooks, changeBooksData} = require("./handler")

// Routing berdasarkan path dan method
const routes = [
    {
        method: "POST",
        path: "/books",
        handler: saveBooks
    },
    {
        method: "GET",
        path: "/books",
        handler: showAllBooks
    },
    {
        method: "GET",
        path: "/books/{bookId}",
        handler: showDetailBooks
    },
    {
        method: "PUT",
        path: "/books/{bookId}",
        handler: changeBooksData
    },
    {
        method: "DELETE",
        path: "/books/{bookId}",
        handler: deleteBooks
    }
]

module.exports = routes