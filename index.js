const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const figlet = require('figlet')
const asciify = require('asciify-image')
const app = express()
const http = require('http');



app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))



const credentials = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'helman'
}

app.get('/', (req, res) => {
	res.send('Hola Helman, soy el servidor!')
})



// este es el apartado del chat





// fin del apartado de chat



// select a la tabla "login" en la parte del login este codigo me permite logearme en el backend

app.post('/api/login', (req, res) => {
	const { username, password } = req.body
	const values = [username, password]
	var connection = mysql.createConnection(credentials)
	connection.query("SELECT * FROM login WHERE username = ? AND password = ?", values, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			if (result.length > 0) {
				res.status(200).send({
					"id": result[0].id,
					"user": result[0].user,
					"username": result[0].username,
					"picture": result[0].picture,
					"isAuth": true
				})
			} else {
				res.status(400).send('Usuario no existe')
			}
		}
	})
	connection.end()
})

// fin de la sentencia


// select de la base de datos de la tabla "usuarios"

app.get('/api/usuarios', (req, res) => {
	var connection = mysql.createConnection(credentials)
	connection.query('SELECT * FROM usuarios', (err, rows) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send(rows)
		}
	})
})

// fin de esta sentencia 

// select de la base de datos de nombre "login" de la ventana de nombre "user"

app.get('/api/users', (req, res) => {
	var connection = mysql.createConnection(credentials)
	connection.query('SELECT * FROM login', (err, rows) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send(rows)
		}
	})
})

//fin de esta sentencia

//select de la tabla productos

app.get('/api/productos', (req, res) => {
	var connection = mysql.createConnection(credentials)
	connection.query('SELECT * FROM productos', (err, rows) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send(rows)
		}
	})
})


//fin de esta sentencia


// Eliminar datos de la base de datos de nombre "usuarios"

app.post('/api/eliminar', (req, res) => {
	const { id } = req.body
	var connection = mysql.createConnection(credentials)
	connection.query('DELETE FROM usuarios WHERE id = ?', id, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Usuario Eliminado" })
		}
	})
	connection.end()
})

// Fin  de la sentencia 

// eliminar users

app.post('/api/eliminarlogin', (req, res) => {
	const { id } = req.body
	var connection = mysql.createConnection(credentials)
	connection.query('DELETE FROM login WHERE id = ?', id, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Usuario Eliminado" })
		}
	})
	connection.end()
})

// fin de eliminar users

// eliminar productos

app.post('/api/eliminarproductos', (req, res) => {
	const { id } = req.body
	var connection = mysql.createConnection(credentials)
	connection.query('DELETE FROM productos WHERE id = ?', id, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Producto Eliminado" })
		}
	})
	connection.end()
})

// fin de esta sentencia

// sentencia de guardado de en ala base de datos en la tabla de nombre de "usuarios"

app.post('/api/guardar', (req, res) => {
	const { avatar, nombre, planeta } = req.body
	const params = [[avatar, nombre, planeta]]
	var connection = mysql.createConnection(credentials)
	connection.query('INSERT INTO usuarios (avatar, nombre, planeta) VALUES ?', [params], (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Usuario creado" })
		}
	})
	connection.end()
})

// fin de la sentencia guardado 

// sentencia guardar de "users" en la tabla "login" de la base de datos 

app.post('/api/guardarusers', (req, res) => {
	const { user, username, password } = req.body
	const params = [[user, username, password]]
	var connection = mysql.createConnection(credentials)
	connection.query('INSERT INTO login (user, username, password) VALUES ?', [params], (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Usuario creado" })
		}
	})
	connection.end()
})

//


// sentencia guardar de "Guardar productos" en la tabla "productos" de la base de datos 

app.post('/api/guardar_producto', (req, res) => {
	const { producto, imgproducto, precio, descripcion } = req.body
	const params = [[producto, imgproducto, precio, descripcion]]
	var connection = mysql.createConnection(credentials)
	connection.query('INSERT INTO productos (producto, imgproducto, precio, descripcion) VALUES ?', [params], (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Producto guardado" })
		}
	})
	connection.end()
})

//


// sentencia editar de la tabla usuarios

app.post('/api/editar', (req, res) => {
	const { id, avatar, nombre, planeta } = req.body
	const params = [avatar, nombre, planeta, id]
	var connection = mysql.createConnection(credentials)
	connection.query('UPDATE usuarios set avatar = ?, nombre = ?, planeta = ? WHERE id = ?', params, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "USuario editado" })
		}
	})
	connection.end()
})

// fin de la sentencia editar 

// sentensia editar de la  tabla "login" de la ventana "users"

app.post('/api/editarusers', (req, res) => {
	const { id, user, username, password } = req.body
	const params = [user, username, password, id]
	var connection = mysql.createConnection(credentials)
	connection.query('UPDATE login set user = ?, username = ?, password = ? WHERE id = ?', params, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "USuario editado" })
		}
	})
	connection.end()
})

// fin de la sentencia editar de la tabla "login"


// sentensia editar de la  tabla "productos" de la ventana "productos"

app.post('/api/editarproductos', (req, res) => {
	const { id, producto, imgproducto, precio, descripcion } = req.body
	const params = [producto, imgproducto, precio, descripcion, id]
	var connection = mysql.createConnection(credentials)
	connection.query('UPDATE productos set producto = ?, imgproducto = ?, precio = ?, descripcion = ? WHERE id = ?', params, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Producto Editado" })
		}
	})
	connection.end()
})

// fin de la sentencia editar de la tabla "login"




app.listen(4000, async () => {
	const ascified = await asciify('helmet.png', { fit: 'box', width: 10, height: 10 })
	console.log(ascified)

	console.log(figlet.textSync('HelmanServer v. 1.0.0'))
})