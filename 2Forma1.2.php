<?php

//Base de datos ventas
//Tabla clientes
//Insertar tres clientes
//Eliminar un cliente con el correo

$host = "localhost";
$username = "root";
$contraseña = "";

$conexion = new mysqli($host,$username,$contraseña);
if(!$conexion){
    die("Error al conectar: ".$conexion->connect_error);
}
echo "Conectado correctamente<br><br>";

$sql = 'CREATE DATABASE IF NOT EXISTS ventas';

if ($conexion->query($sql)){
    echo "Base de datos creada. <br><br>";
}
mysqli_select_db($conexion,"ventas");

$sql = 'CREATE TABLE IF NOT EXISTS clientes(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL
        )';

if ($conexion->query($sql)){
    echo "Tabla creada <br><br>";
}

$sql = 'INSERT INTO clientes(nombre,email) VALUES
("Victor","victor@gmail.es"),
("Jorge","jorge@gmail.es"),
("Centollo","centollo@gmail.es")';

if ($conexion->query($sql)){
    echo "Datos insertados <br><br>";
}

$sql = 'DELETE FROM clientes WHERE email = "jorge@gmail.es"';

if ($conexion->query($sql)){
    echo "Cliente eliminado <br><br>";
}

$sql = 'SELECT * FROM clientes';
$resultado = $conexion->query($sql);

if ($resultado->num_rows>0){
    echo "<table border='1'>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
            </tr>";
    while($fila =$resultado->fetch_assoc()){
        echo "<tr>
        <td>{$fila['id']}</td>
        <td>{$fila['nombre']}</td>
        <td>{$fila['email']}</td>
      </tr>";
    }
}else{
    echo"No hay resultados";
}