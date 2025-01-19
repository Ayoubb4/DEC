<!-- Crea una tabla llamada pacientes con las columnas:
 id(INt,AutoIncrement, Primary Key)
 nombre VARCHAR (100), NOT nULL
 diagnostico (VARCHAR(255)NOT NULL)
 fecha_ingreso(DATE,NOT NULL)
 
 Inserta 3 registros
 Actualiza el diagnostico del paciente con id = 2 a "Alta medica"
 Imprime los datos actualizados de todos los pacientes
 -->
 <?php 
 
 $servidor = "localhost" ;
 $usuario = "root";
 $base_datos = "hospital";
 
 $conexion = new mysqli($servidor,$usuario);
 
 if(!$conexion){
     die("Conexion fallida " . mysqli_connect_error());
 }
 echo "Conectado correctamente"; 
 
 $sql = "CREATE DATABASE IF NOT EXISTS $base_datos";
 
 if(mysqli_query($conexion,$sql)){
     echo "Base de datos correcta <br>";
 }else{
     echo "Error: ". mysqli_error($conexion);
 }
 
 /* Crear Tabla */
 /* forma normal selexxionar db */
 mysqli_select_db($conexion,$base_datos);
 $sql = "CREATE TABLE IF NOT EXISTS pacientes (
     id INT(4) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
     nombre VARCHAR(100) NOT NULL,
     diagnostico VARCHAR(255) NOT NULL,
     fecha_ingreso DATE NOT NULL
 )";
 if(mysqli_query($conexion,$sql)){
     echo "Tabla creada <br>";
 }else{
     echo "Error rabla no creada". mysqli_error($conn);
 }
 
 $sql = "INSERT INTO pacientes (nombre,diagnostico,fecha_ingreso) VALUES ('Miguel', 'Lesion', '2024-02-25'),
 ('Messi', 'Cruzado', '2025-01-16'),
 ('Ronaldo', 'Resfriado', '2021-04-01')";
 if (mysqli_query($conexion, $sql)) {
 
     echo "Correcto";
 } else {
 
     echo "Error" . $sql . mysqli_error($conexion);
 }
 
 $sql = "UPDATE pacientes SET diagnostico = 'Alta Medica' WHERE ID = 3";
 
 if(mysqli_query($conexion, $sql)){
     echo "Registro modificado";
 }else{
     echo "Error". mysqli_error($conexion);
 }
 
 //Recuperar e imprimir
 $sqL = "SELECT * FROM pacientes";
 $resultado = mysqli_query($conexion, $sqL);
 
 if(mysqli_num_rows($resultado) > 0){
     echo "<table border = '1'>
         <tr>
             <th>ID</th>
             <th>Nombre</th>
             <th>Diagnostico</th>
             <th>Fecha de Ingreso</th>            
         </tr>";
 while($fila = mysqli_fetch_assoc($resultado)){
         echo "<tr>
         <td>{$fila ['id']}</td>
         <td>{$fila ['nombre']}</td>
         <td>{$fila ['diagnostico']}</td>
         <td>{$fila ['fecha_ingreso']}</td>
         </tr>";
 }
 echo "</table>";
 }
 
 
 
 mysqli_close($conexion);
 
 
  
 ?>