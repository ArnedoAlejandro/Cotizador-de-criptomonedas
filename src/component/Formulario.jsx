import React from "react"
import { useState, useEffect } from "react"
import styled from "@emotion/styled"
import Error from "./Error"
import useSelectMonedas from "../hooks/useSelectMonedas"
import { monedas } from "./data/monedas-js"

const InputSubmint = styled.input`
background-color: #9497ff;
border: none;
width: 100%;
padding: 10px;
color: #fff;
font-weight: 700;
text-transform: uppercase;
font-size: 20px;
border-radius: 10px;
transition: background-color .3s ease;
margin-top: 25px;

&:hover{
    background-color: #7A7DFE;
    cursor: pointer
}
`

const Formulario = ( {setMonedas} ) => {
  
    const [criptos, setCriptos] = useState([])
    const [ error, setError ] = useState(false)
//CREAMOS CONSTANTE CON EL VALOR DE NUESTRO HOOK PERSONALIZADO CREADO 
    const [ moneda, SelectMonedas ] = useSelectMonedas("Elige tu moneda", monedas);

    const [ criptomoneda, SelectCriptomonedas ] = useSelectMonedas("Elige tu Criptomonedas", criptos);

//PETICION A UNA APPI 
    useEffect( () =>{
    //CREACIION DE CONST CON EL METODO DE ASYNC 
        const consultarApi = async()=>{
        //CREAMOS CONSTANTE ALMACENANDO URL DE DONDE QUEREMOS TRAER VALORES DE LA API
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
        //CREAMOS CONSTANTE UTILIZANDO ASINC HACIENDO EL LLAMADO A LA API
            const respuesta = await fetch(url)
        //CREAMOS CONSTANTE ALMACENANDO Y MODIFICANDO VALORES O UN OBJETO:JASON
            const resultado = await respuesta.json()
        
        //CREACION DE CONSTANTE QUE ITINERE SOBRE RESULTADO Y MEDIANTE MAP (RECORRE EL OBJETO
        //Y CREA UN ARRAY NUEVO TRAYENDONOS LOS VALORES GUARDANDOLOS EN UNA CONSTANTE)
        
            const arrayCriptos = resultado.Data.map( cripto => {

                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre : cripto.CoinInfo.FullName
                }
                //SE COLOCA EL RETURN POR QUE LA FUNCION ES MAS LARGA QUE UNA LINEA
                return objeto
            })

            setCriptos(arrayCriptos)
        }
    //LLAMAMOS A LA FUNCION 
        consultarApi()
    },[])

//VALIDACION DE FORMULARIO 
    const handleSubmit = e =>{
        e.preventDefault()
        
        if([ moneda, criptomoneda].includes("")){
            setError(true)
            
            return
        }

        setError( false )    
        setMonedas({
            moneda,
            criptomoneda
        })    
    }

    return(
    <>
        {error && <Error>Todos los campos son obligatorios</Error>}
        
        <form 
            onSubmit={handleSubmit}
        >
            <SelectMonedas />
            
            <SelectCriptomonedas />

            <InputSubmint 
                type="submit" 
                value="Cotizar"
            />
        </form>
    </>
    )
}

export default Formulario