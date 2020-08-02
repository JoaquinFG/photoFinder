import React, { Component } from 'react';
import Imagen from './Imagen';
import Paginacion from './Paginacion';

export default class Resultado extends Component {
    //este metodo va a mostrar las imagenes
    mostrarImagenes = () => {
        //metemos la importacion en una variable
        const imagenes = this.props.imagenes;
        
        //si no hay nada escrito devuelve null, asi evitamos que ejecute vacio
        if(imagenes.length === 0) return null
        console.log(imagenes);
        return (
            <React.Fragment>
                <div className="col-12 p-5 row" >
                    {imagenes.map(imagen => (
                        <Imagen
                            key={imagen.id}
                            imagen={imagen}
                        />
                    ))}
                </div>
                <Paginacion
                    paginaAnterior={this.props.paginaAnterior}
                    paginaSiguiente={this.props.paginaSiguiente}
                />
            </React.Fragment>
        )
    }
    render() {
        return (
            //existe react.fragment q evita que creemos un div innecesario
            <React.Fragment>
                {this.mostrarImagenes()}
            </React.Fragment>
        )
    }
}
