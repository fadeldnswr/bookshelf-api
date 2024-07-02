// Import Modul Books
const { nanoid } = require( "nanoid" )
const books = require("./books")

// Menampilkan seluruh buku
// Menggunakan query parameter
const showAllBooks = (request, h) => {
    const { reading, finished } = request.query
    const booksFiltered = books

    if(reading !== undefined){
        const isReading = reading === "true"
        booksFiltered.filter((book) => book.reading === isReading)
    }

    if(finished !== undefined){
        const isFinished = finished === "true"
        booksFiltered.filter((book) => book.finished === isFinished)
    }

    if(!books.length){
        const response = h.response({
            status: "success",
            data: {
                books: []
            }
        })
        response.code(200)
        return response
    }
    
    const response = h.response({
        status: "success",
        data : {
            books: books.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher
            }))
        }
    })
    response.code(200)
    return response
    
}

// Menampilkan buku berdasarkan Id
const showDetailBooks = (request, h) => {
    const { id } = request.params
    const book = books.filter((index) => index.id === id)[0]
    
    if(book !== undefined){
        const response = h.response({
            status: "success",
            data: {
                book
            }
        })
        response.code(200)
        return response
    }
    const response = h.response({
        status: "fail",
        message: "Buku tidak ditemukan"
    })
    response.code(404)
    return response
}

// Menyimpan buku
const saveBooks = (request, h) => {
    const {
        name,
        year,
        author,
        publisher,
        summary,
        reading,
        pageCount,
        readPage
    } = request.payload

    if(!name){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        })
        response.code(400)
        return response
    }
    
    if(readPage > pageCount){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        })
        response.code(400)
        return response
    }
    
    const id = nanoid(16)
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt
    const finished = readPage === pageCount

    const newBook = {
        id,
        name,
        year,
        author,
        publisher,
        summary,
        pageCount,
        readPage,
        reading,
        insertedAt,
        updatedAt,
        finished
    }

    books.push(newBook)

    const isSuccess = books.filter((book) => book.id === id).length > 0
    if(isSuccess){
        const response = h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id,
            }
        })
        response.code(201)
        return response
    }
    const response = h.response({
        status: "Failed",
        message: "Buku gagal ditambahkan"
    })
    response.code(400)
    return response
}

// Mengubah data pada buku
const changeBooksData = (request, h) => {
    const {
        name, 
        year, 
        author, 
        summary, 
        publisher, 
        reading, 
        pageCount, 
        readPage
    } = request.payload
    
    if(!name){
        const response = h.resposne({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        })
        response.code(400)
        return response
    }
    
    if(readPage > pageCount){
        const response = h.response({
            status: "fail",
            message: "gagal memperbarui buku. readPage tidak boleh lebih dari pageCount"
        })
        response.code(400)
        return response
    }
    
    const { id } = request.params
    const index = books.findIndex((book) => book.id === id)
    
    if(!index === -1){
        const response = h.response({
            status: "fail",
            message: "gagal memperbarui buku. Id tidak ditemukan"
        })
        response.code(404)
        return response
    }
    const updatedAt = new Date().toISOString()
    const finished = readPage === pageCount

    books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt,
        finished
    }

    const response = h.response({
        status: "success",
        message: "Buku berhasil diperbaharui"
    })
    response.code(200)
    return response
}

const deleteBooks = (request, h) => {
    const { id } = request.params
    const index = books.findIndex((book) => book.id === id)

    if(index === -1){
        const response = h.response({
            status: "fail",
            message: "Buku gagal dihapus. Id tidak ditemukan"
        })
        response.code(404)
        return response
    }

    books.splice(index, 1)
    const response = h.response({
        status: "success",
        message: "Buku berhasil dihapus"
    })
    response.code(200)
    return response
}

module.exports = {
    showAllBooks,
    showDetailBooks,
    saveBooks,
    changeBooksData,
    deleteBooks
}