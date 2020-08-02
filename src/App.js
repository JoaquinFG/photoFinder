import React, { Component } from 'react';
import Buscador from './componentes/Buscador.js';
import Resultado from './componentes/Resultado';

//he tenido q cambiar el archivo de como viene por defecto
//en vez de function aqui abajo he puesto class y su render
class App extends Component {
  
  state = {
    termino: '',
    imagenes: [],
    pagina: ''
  }
  //cada vez q cargamos una nueva pagina queremos que nos aparezca arriba
  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }
  //paginacion:
  paginaAnterior = ()=> {
    //leer state de la pagina actual
    let pagina = this.state.pagina;
    //si la pagina es 1 no se puede restar
    if(pagina ===1) return null;
    //restar uno a la pagina actual
    pagina -=1;
    //agregar un cambio al state
    this.setState({
      pagina
    },
    //tenemos que consultar la api para que carge las imagenes anteriores
    () => {
      this.consutarApi();
      //vamos a usar el scroll para que al cargar la pag nos salga arriba
      this.scroll();
    }
    );
  }
  paginaSiguiente = ()=> {
    //leer state de la pagina actual
    let pagina = this.state.pagina;
    //sumar uno a la pagina actual
    pagina += 1;
    //agregar un cambio al state
    this.setState({
      pagina
    },
    //tenemos que consultar la api para que carge las siguientes imagenes
    () => {
      this.consutarApi();
      //vamos a usar el scroll para que al cargar la pag nos salga arriba
      this.scroll();
    }
    );
    
  }

  //vamos a un a api gratis y le ponemos el estado que es lo que escribamos en el imput, 
  //muestra 20 fotos x pagina si queremos que muestre mas le añadimos lo que esta despues
  //de la llave de la url, seria asi: $per_page=30
  consutarApi = ()=> {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=1732750-d45b5378879d1e877cd1d35a6&q=${termino}&per_page=30&page=${pagina}`;
  
    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({ imagenes : resultado.hits}))
  }

  //vamos a añadir el termino (lo que escribimos en el imput)
  //pagina 1 para que empiece x ahi siempre
  datosBusqueda = (termino) => {
    this.setState({
      termino: termino,
      pagina: 1
    }, ()=>{
      this.consutarApi();
    })
  }
  render(){
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imágenes</p>
          <Buscador
            datosBusqueda={this.datosBusqueda}
          />          
        </div>
        <div className="row justify-content-center">
          <Resultado
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }    
}

export default App;
