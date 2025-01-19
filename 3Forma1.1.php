<!-- 1. Escribe un script en PHP que:
Se conecte a una base de datos llamada biblioteca usando PDO.
Cree una tabla llamada libros con las columnas:
id (INT, AUTO_INCREMENT, PRIMARY KEY)
titulo (VARCHAR(255), NOT NULL)
autor (VARCHAR(100), NOT NULL)
anio_publicacion (YEAR, NOT NULL)
Inserte tres registros en la tabla.
Busque e imprima los libros publicados después del año 2000.
Elimina la tabla. -->

<?php 

$servidor = "localhost";
$usuario = "root";
$contraseña = "";
$base_datos = "biblioteca";


try{
    $conexion = new PDO("mysql:host=$servidor", $usuario, $contraseña);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "CREATE DATABASE IF NOT EXISTS $base_datos";
    $conexion->exec($sql);
    echo "Base de datos creada correctamente.<br>";

    $conexion->exec("USE $base_datos");
    
    $sql = "CREATE TABLE IF NOT EXISTS libros (id INT AUTO_INCREMENT PRIMARY KEY, titulo VARCHAR (255) NOT NULL, autor VARCHAR (100) NOT NULL, anio_publicacion YEAR NOT NULL)";
    $conexion -> exec(statement: $sql);

    echo "tabla creada <br>";

    $sql = "INSERT INTO libros (titulo, autor, anio_publicacion) VALUES 
    ('SISI', 'Messi', 2000),
    ('Quiero Algo', 'Silvestre', 1999),
    ('Luna Llena', 'Beny JR', 2024)";    
    $conexion -> exec(statement: $sql);
    echo "Registros introducidos<br>";

    $sql = "SELECT * FROM libros WHERE anio_publicacion > 2000";
    $resultado = $conexion->prepare($sql);
    $resultado->execute();

    if ($resultado->rowCount() > 0) {
        echo "
        <table border='1'>
            <thead>
                <th>ID</th>
                <th>Titulo</th>
                <th>Autor</th>
                <th>Año Publi</th>
            </thead>";
        while ($fila = $resultado->fetch(PDO::FETCH_ASSOC)) {
            echo "
            <tr>
                <td>{$fila['id']}</td>
                <td>{$fila['titulo']}</td>
                <td>{$fila['autor']}</td>
                <td>{$fila['anio_publicacion']}</td>
            </tr>";
        }
        echo "</table>";
    } else {
        echo "No hay libros publicados por encima del 2000.";
    }

    $sql = "DROP TABLE IF EXISTS libros";
    $conexion->exec($sql);
    echo "Tabla eliminada<br>"; 

}catch(PDOException $e) {
    echo "Error en la conexion: " . $e->getMessage() . ". Consulta: " . $sql;
}

$conexion = null;


?>