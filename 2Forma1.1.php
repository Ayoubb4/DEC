<!--Se conecte a una bvase de datos llamada escuela.
Cree una tabla llamada alumnos con las columnas: id(INT,AUTO_INCREMENT, PRimaryKey), nombre (100) edad INTNOT NULL 
Inserte 3 alumnos Imprima los datos de los alumnos cuya edad sea mayor o igual a 18 -->

<?php 
$servidor = "localhost" ;
$usuario = "root";
$base_datos = "Escuela";

$conexion = new mysqli($servidor, $usuario);

if ($conexion->connect_error) {
    die("Error: " . $conexion->connect_error);
}

$sql = "CREATE DATABASE IF NOT EXISTS $base_datos";
if($conexion -> query($sql) === TRUE){
    echo "Base de datos creada correctamente<br>";
}else{
    die("Error: ". $conexion -> error);
}

$conexion -> select_db($base_datos);

$sql = 'CREATE TABLE IF NOT EXISTS alumnos (id INT (4) AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR (100) NOT NULL,
edad INT NOT NULL)';

if($conexion->query($sql)===TRUE){
    echo "Tabla creada correctamente <br>";
}else{
    die("Error: " . $conexion -> error);
}

$sql = "INSERT INTO alumnos (nombre, edad) VALUES ('Centollo', 20), ('Pablo Motos', 56), ('luis', 10)";
if($conexion -> query($sql)===TRUE){
    echo "insertado correctamente";
}else{
    die("Error al registrar" . $sql . $conexion->error);
}

$sql = "SELECT * FROM alumnos WHERE edad >= 18";
$resultado = mysqli_query($conexion, $sql);

if($resultado->num_rows>0){
    echo "<table border = '1'>
    <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Edad</th>
    </tr>";    
    while($fila=$resultado->fetch_assoc()){
        echo "
        <tr>
            <td>{$fila ['id']}</td>
            <td>{$fila ['nombre']}</td>
            <td>{$fila ['edad']}</td>
        </tr>";
    }
    echo "</table>";
}else{
    echo "No hay resultado";
}


?>