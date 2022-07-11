
//LIBRERIA PARA CREAR NUSTROS STYLED COMPONENT
  import styled from "@emotion/styled"
 import { useState, useEffect } from "react"
  import Formulario from "./component/Formulario"
  import Resultado from "./component/Resultado"
  import Spiner from "./component/Spiner"
  import ImagenCripto from "./img/imagen-criptos.png"
  
  

//COMPONENTE DE IMAGEN
  const Imagen = styled.img`
    max-width : 400px;
    width : 80%;
    margin : 100px auto 0 auto;
    display : block
  `

//COMPONENTE CONTENEDOR
  const Contenedor = styled.div`
    max-width : 900 px ;
    margin : 0 auto ;
    width : 90%;
    @media( min-width : 992px){
      display :grid;
      grid-template-columns : repeat(2,1fr);
      colum-gap : 2rem
    }

`
//COMPONENTE CABECERA
  const Heading = styled.h1`
    font-family : 'Lato' , sans-serif;
    color : #FFF;
    text-align: center;
    font-weight: 700;
    margin-top: 80px;
    margin-bottom: 50px;
    font-size: 35px;
    
    &::after {
      content : '';
      width: 100px;
      height: 6px;
      background-color: #66A2FE;
      display :block;
      margin: 10px auto 0 auto;
    }
  `


function App() {

//CONSTANTE DE PETICION A LA API
  const [ monedas, setMonedas ] = useState([])

//CONSTANTE DE RESULTADO DE DATOS DE LA API
  const [ resultado, setResultado ] = useState({})

  const [ cargando, setCargando ] = useState(false)

//PETICION A LA API MEDIANTE UNA CONDICIONAL
  useEffect(()=>{
    if(Object.keys(monedas).length > 0){
      const cotizarCripto = async () => {
        setCargando(true)
      

        const { moneda, criptomoneda } = monedas
        const url = ` https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda} `

        const respuesta = await fetch (url)
        const resultado = await respuesta.json()
        //VALOR NUEVO DE LA CONSTANTE DE ESTADO
        setResultado(resultado.DISPLAY[criptomoneda][moneda])

      }

      cotizarCripto()
      setCargando(false)
      
    }
  }, [ monedas ])
 

  return (
    <Contenedor>
      <Imagen
        src={ImagenCripto}
        alt="Imagenes criptomonedas"
      />
      <div>
        <Heading>Cotiza tu moneda</Heading>
        <Formulario 
          setMonedas= {setMonedas}
        />
        {cargando && <Spiner />}
        {resultado.PRICE && <Resultado  resultado={resultado}/>}
        

      </div>
    </Contenedor>
    )
}

export default App
