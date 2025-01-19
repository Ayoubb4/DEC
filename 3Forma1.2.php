<!-- Escribe un script en PHP que:
Se conecte a una base de datos llamada restaurante usando PDO.
Crea una tabla llamada mesas con las columnas:
id (INT, AUTO_INCREMENT, PRIMARY KEY)
numero (INT, NOT NULL, UNIQUE)
estado (ENUM('Disponible', 'Ocupada'), DEFAULT 'Disponible')
Inserta cinco mesas (dos disponibles y tres ocupadas).
Recupera e imprime las mesas que estén disponibles.
Elimina la base de datos. -->

<?php 
$servidor = "localhost";
$usuario = "root";
$contraseña = "";
$base_datos = "restaurante";

try{
    $conexion = new PDO("mysql:host = $servidor", $usuario,$contraseña);
    $conexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

    $sql = "CREATE DATABASE IF NOT EXISTS $base_datos";
    $conexion -> exec($sql);
    echo "Base de datos creada correctamente<br>";
    
    $conexion->exec("USE $base_datos");

    $sql = "CREATE TABLE IF NOT EXISTS mesas (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        numero INT NOT NULL UNIQUE, 
        estado ENUM('Disponible', 'Ocupada') DEFAULT 'Disponible'
        )";
    $conexion -> exec($sql);
    echo "Tabla creada correctamente<br>";

    $sql = "INSERT IGNORE INTO mesas(numero, estado) VALUES 
        (5, 'Ocupada'), (9, 'Ocupada'), (10, 'Ocupada'), 
        (3, 'Disponible'), (7, 'Disponible');
        ";

    $conexion->exec($sql);
    echo "Datos insertados correctamente <br>";

    $sql = "SELECT * FROM mesas WHERE estado = 'Disponible'";
    $resultado = $conexion -> prepare($sql);
    $resultado->execute();

    if ($resultado->rowCount() > 0) {
        echo "<table border='1'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Numero</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>";
        
        while ($fila = $resultado->fetch(PDO::FETCH_ASSOC)) {
            echo "<tr>
                    <td>{$fila['id']}</td>
                    <td>{$fila['numero']}</td>
                    <td>{$fila['estado']}</td>
                  </tr>";
        }
        echo "</tbody></table>";
    } else {
        echo "No hay mesas disponibles";
    }



    $sql = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$base_datos'";
    $resultado = $conexion->prepare($sql);
    $resultado->execute();

    if ($resultado->rowCount() > 0) {
        $sql = "DROP DATABASE $base_datos";
        $conexion->exec($sql);
        echo "Base de datos eliminada";
    } else {
        echo "La base de datos no existe";
    }

}catch(PDOException $e){
    echo "Error" . $e->getMessage() . "Consulta". $sql;
}
$conexion = null;

?>