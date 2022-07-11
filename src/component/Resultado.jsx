import styled from "@emotion/styled"

const Contenedor = styled.div`
    color: white;
    font-family: "Lato", sans-serif;
    display: flex;
    align-items: start;
    gap : 1rem ;
    margin-top: 30px;
`

const Texto = styled.p`
    font-size: 18px;
    span {
        font-weight: 700
    }
`
const Precio = styled.p`
    font-size: 24px;
    span {
        font-weight: 700
    }
`
const imagen = styled.img`
    display: block;
    width: 70px;
`
    

const Resultado = ( { resultado }) => {

//CREACION DE CONSTANTE TRAYENDO LOS VALORES DE LA API PARA REALIZAR LA CONSULTA 

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = resultado

  return (
    <Contenedor>
        <img src={`http://cryptocompare.com/${IMAGEURL}`} alt="imagen cripto" />
        <div>
            <Precio>El Precio es de: <spam>{PRICE}</spam></Precio>
            <Texto>El Precio mas alto del dia es de: <spam>{HIGHDAY}</spam></Texto>
            <Texto>El Precio es mas bajo del dia es de:  <spam>{LOWDAY}</spam></Texto>
            <Texto>Variacion ultimas 24 hs <spam>{CHANGEPCT24HOUR}</spam></Texto>
            <Texto>Ultima actualizacion:  <spam>{LASTUPDATE}</spam></Texto>
            <Texto>El Precio es de <spam>{PRICE}</spam></Texto>
        </div>
    </Contenedor>
  )
}

export default Resultado
