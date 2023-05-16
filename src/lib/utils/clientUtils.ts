import { ClientInterface, ClientModel } from '@/schemas/Client.schema';
import { ClientMetadataModel } from '@/schemas/ClientMetadata.schema';
const jsdom = require("jsdom");

export const getClientToken = async (agId: Number) => {
    const clientInfoReq = await fetch(`https://www.aguascordobesas.com.ar/espacioClientes/seccion/gestionDeuda/consulta/${agId}`)
    const clientInfoHtml = await clientInfoReq.text()
    const clientInfoDoc = new jsdom.JSDOM(clientInfoHtml).window.document;
    const clientTokenValue = clientInfoDoc.querySelector('#tkPayment')?.getAttribute('value');

    if (!clientTokenValue) return null

    const newClientMetadata = new ClientMetadataModel({
        token: clientTokenValue,
        agId: agId
    })

    await newClientMetadata.save()

    return clientTokenValue
}

export const getClientFacturas = async (agId: Number, token: string) => {
    var myHeaders = new Headers();
    myHeaders.append("authority", "www.aguascordobesas.com.ar");
    myHeaders.append("accept", "application/json, text/javascript, */*; q=0.01");
    myHeaders.append("accept-language", "en,en-US;q=0.9,sl;q=0.8,es;q=0.7");
    myHeaders.append("content-type", "application/x-www-form-urlencoded; charset=UTF-8");
    myHeaders.append("cookie", "_ga=GA1.3.302030102.1682642740; _fbp=fb.2.1682642739634.688096471; PHPSESSID=a6f23e585f0db3c70e3ce40fa9d47317; _gid=GA1.3.1581656292.1683940915");
    myHeaders.append("origin", "https://www.aguascordobesas.com.ar");
    myHeaders.append("referer", `https://www.aguascordobesas.com.ar/espacioClientes/seccion/gestionDeuda/consulta/${agId}`);
    myHeaders.append("sec-ch-ua", "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"");
    myHeaders.append("sec-ch-ua-mobile", "?0");
    myHeaders.append("sec-ch-ua-platform", "\"Windows\"");
    myHeaders.append("sec-fetch-dest", "empty");
    myHeaders.append("sec-fetch-mode", "cors");
    myHeaders.append("sec-fetch-site", "same-origin");
    myHeaders.append("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36");
    myHeaders.append("x-requested-with", "XMLHttpRequest");

    var raw = `uf=${agId}&tu=C&token=${token}&actions=get-deuda`;

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    };

    const reqResult = await fetch("https://www.aguascordobesas.com.ar/espacioClientes/recursos/includesActions/inc_gestionDeuda.php", requestOptions)
    const reqResultJson = await reqResult.text()
    
    return reqResultJson
}

export const extractDataFromFactura = async (factura: any, agId: number) => {
    const reqFacturaHTML = factura?.data?.datosHtmlDeuda
    const facturaDoc = new jsdom.JSDOM(String(reqFacturaHTML)).window.document

    const elemsPeriodo = facturaDoc.querySelectorAll('td[data-title="Periodo"]');
    const elemsImporte = facturaDoc.querySelectorAll('td[data-title="Importe $"]');
    const elemsEstado = facturaDoc.querySelectorAll('td[data-title="Estado"]');
    const elemsVencimiento = facturaDoc.querySelectorAll('td[data-title="Vencimiento"]');

    const combinedElems = Array.from(elemsPeriodo).map((elem: any, index) => {
        return {
            periodo: elem.textContent,
            importe: elemsImporte[index].textContent,
            estado: elemsEstado[index].textContent,
            vencimiento: elemsVencimiento[index].textContent
        }
    })

    const facturasNoVencidas = combinedElems.filter((elem) => {
        return elem.vencimiento?.includes('No Vencido')
    })

    const facturasVencidas = combinedElems.filter((elem) => {
        return elem.vencimiento?.includes('Vencido')
    })

    const newClient: ClientInterface = {
        name: factura?.data?.client,
        agId: agId
    }

    if (facturasNoVencidas.length > 0) {
        newClient.ultimaDeuda = facturasNoVencidas[facturasNoVencidas.length - 1].importe || 'No hay deuda'
        newClient.vtoUltimoPeriodo = facturasNoVencidas[facturasNoVencidas.length - 1].vencimiento || 'No hay deuda'
        newClient.utlimoPeriodo = facturasNoVencidas[facturasNoVencidas.length - 1].periodo || 'No hay deuda'
    } else if (facturasVencidas.length > 0) {
        newClient.ultimaDeuda = facturasVencidas[facturasVencidas.length - 1].importe || 'No hay deuda'
        newClient.vtoUltimoPeriodo = facturasVencidas[facturasVencidas.length - 1].vencimiento || 'No hay deuda'
        newClient.utlimoPeriodo = facturasVencidas[facturasVencidas.length - 1].periodo || 'No hay deuda'
    } else {
        newClient.ultimaDeuda = 'No hay deuda'
        newClient.vtoUltimoPeriodo = 'No hay deuda'
        newClient.utlimoPeriodo = 'No hay deuda'
    }

    await addClientToDB(newClient)
    return newClient
}

export const addClientToDB = async (client: ClientInterface) => {
    const newClient = new ClientModel(client)
    await newClient.save()
}