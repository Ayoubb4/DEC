class Alumno {
    constructor(nombre, apellido1, apellido2, fechaNacimiento, estudios, curso, telefono) {
        this.nombre = nombre;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.fechaNacimiento = fechaNacimiento;
        this.estudios = estudios;
        this.curso = curso;
        this.telefono = telefono;
    }

    muestra() {
        return `Nombre: ${this.nombre} ${this.apellido1} ${this.apellido2}\n` +
               `Fecha de Nacimiento: ${this.fechaNacimiento}\n` +
               `Estudios: ${this.estudios}\n` +
               `Curso: ${this.curso}\n` +
               `Teléfono: ${this.telefono}`;
    }
}

const alumnotop = new Alumno('Lionel', 'Messi', 'Mamahuevo', '2004-05-29', 'Joga Bonito', '2º', '12332154');
console.log(alumnotop.muestra());
