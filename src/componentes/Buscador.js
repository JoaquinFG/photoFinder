import React, { Component } from 'react'

export default class Buscador extends Component {
    //creamos un ref que lee los valores de los imput con React
    busquedaRef = React.createRef();
    //obtener datos del imput
    obtenerDatos = (e) => {
        e.preventDefault();
        //recogemos el valor del imput
        const termino = this.busquedaRef.current.value
        //lo enviamos al componente principal
        this.props.datosBusqueda(termino);
    }
    //aki creamos el formulario
    render() {
        return (
            <form onSubmit={this.obtenerDatos} >
                <div className="row">                    
                    <div className="form-group col-md-8">
                        <input ref={this.busquedaRef} type="text" className=" form-control form-control-lg"
                        placeholder="Buscador de Imágenes. Ejemplo: Fútbol"/>
                    </div>
                    <div className="form-group col-md-4">
                        <input type="submit" className="btn btn-lg btn-danger btn-block"
                        value="Buscar"/>
                    </div>
                </div>
            </form>
        )
    }
}
