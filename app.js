// Book Constructor
class Book {
	constructor(title, author, isbn) {
		this.title = title
		this.author = author
		this.isbn = isbn
	}
}

// UI Constructor
class UI {
	constructor() {}
	// add book to list
	addBookToList(book) {
		const list = document.getElementById('book-list')
		// create tr element
		const row = document.createElement('tr')
		// insert cols
		row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X<a></td>`
		list.appendChild(row)
	}
	// Show alert
	showAlert(message, className) {
		// create div
		const div = document.createElement('div')
		// add classes
		div.className = `alert ${className}`
		// add text
		div.appendChild(document.createTextNode(message))
		// get parent
		const container = document.querySelector('.container')
		// get form
		const form = document.querySelector('book-form')
		// insert alert
		container.insertBefore(div, form)
		// Timeout after 3 sec
		setTimeout(function() {
			document.querySelector('.alert').remove()
		}, 3000)
	}
	// delete book
	deleteBook(target) {
		if (target.className === 'delete') {
			target.parentElement.parentElement.remove()
		}
	}
	// clear fields
	clearFields() {
		document.getElementById('title').value = ''
		document.getElementById('author').value = ''
		document.getElementById('isbn').value = ''
	}
}

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
	// Get form values
	const title = document.getElementById('title').value,
		author = document.getElementById('author').value,
		isbn = document.getElementById('isbn').value
	// Instantiate Book
	const book = new Book(title, author, isbn)

	// Instatiate UI
	const ui = new UI()

	// validate
	if (title === '' || author === '' || isbn === '') {
		// error alert
		ui.showAlert('Please fill in all fields', 'error')
	} else {
		// add book to list
		ui.addBookToList(book)

		// Show Success
		ui.showAlert('Book Added!', 'success')

		// clear fields
		ui.clearFields()
	}

	e.preventDefault()
})

// Event listener for Delete
document.getElementById('book-list').addEventListener('click', function(e) {
	// instantiate UI
	const ui = new UI()
	// delete book
	ui.deleteBook(e.target)

	// show message
	ui.showAlert('Book Removed!', 'success')
	e.preventDefault()
})
