<!-- //Crear a una base de datos llamada tienda, crear una tabla productos con id(INT(4) AUTO_INCREMENT PRIMARY KEY), nombre(VARCHAR(50) NOT NULL), precio(DECIMAL(10,2) NOT NULL)

//INSERTAR TRES PRODUCTOS EN LA TABLA E IMPRIMIR LA TABLA -->
<?php

$servidor = "localhost";
$usuario = "root";
$base_datos = "tienda";

// Establecer conexión
$conexion = new mysqli($servidor, $usuario);

if (!$conexion) {
    die("Conexión fallida: " . mysqli_connect_error());
}
echo "Conectado correctamente<br>";

// Crear la base de datos si no existe
$sql = "CREATE DATABASE IF NOT EXISTS $base_datos";
if (mysqli_query($conexion, $sql)) {
    echo "Base de datos creada correctamente <br>";
} else {
    echo "Error: " . mysqli_error($conexion);
}

// Seleccionar la base de datos
mysqli_select_db($conexion, $base_datos);

// Crear la tabla productos si no existe
$sql = "CREATE TABLE IF NOT EXISTS productos (
    id INT(4) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    precio DECIMAL(10,2) NOT NULL
)";

if (mysqli_query($conexion, $sql)) {
    echo "Tabla creada correctamente <br>";
} else {
    echo "Error al crear la tabla: " . mysqli_error($conexion);
}

// Insertar productos
$sql = "INSERT INTO productos (nombre, precio) 
        VALUES ('Lechuga', 2.00),
               ('Pomelo', 5.00),
               ('Carne', 4.00)";

if (mysqli_query($conexion, $sql)) {
    echo "Productos insertados correctamente.<br>";
} else {
    echo "Error al insertar productos: " . mysqli_error($conexion);
}

// Recuperar e imprimir los productos
$sql = "SELECT * FROM productos";
$resultado = mysqli_query($conexion, $sql);

if (mysqli_num_rows($resultado) > 0) {
    echo "<table border='1'>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
        </tr>";
    while ($fila = mysqli_fetch_assoc($resultado)) {
        echo "<tr>
            <td>{$fila['id']}</td>
            <td>{$fila['nombre']}</td>
            <td>{$fila['precio']}</td>
        </tr>";
    }
    echo "</table>";
} else {
    echo "No se encontraron productos.<br>";
}

// Cerrar la conexión
mysqli_close($conexion);
?>
