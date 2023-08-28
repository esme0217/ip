const express = require('express');
const useragent = require('useragent');
const getIP = require('ipware')().get_ip;
const app = express();
const port = process.env.PORT || 3000;
const { Reader } = require('@maxmind/geoip2-node');

app.get('/', async (req, res) => {

    await infoBrowser(req);    
    res.json(obj);

});

app.listen(port, () => {
    console.clear();
    console.log(`Servidor en funcionamiento en http://localhost:${port}`);

});

const infoBrowser = async (req) => {

    const userAgentString = req.headers['user-agent'];
    const userAgent = useragent.parse(userAgentString);
    const clientIP = getIP(req).clientIp.replace(/^::ffff:/, '');

    const locationData = await infoIp(clientIP);

    obj = {
        plataforma: userAgent.os.family,
        navegador: userAgent.family,
        version: userAgent.toVersion(),
        ip: clientIP,
        city: locationData.city,
        country: locationData.country,
        state: locationData.state,        
    }
    console.log(obj);
    return obj;

}

const infoIp = async (ip) => {
    try {
        const reader = await Reader.open('./db/GeoLite2-City.mmdb');
        const cityLookup = reader.city(ip);
        const cityName = cityLookup.city.names.en;
        const countryName = cityLookup.country.names.en;
        const stateName = cityLookup.subdivisions[0].names.en;

        return {
            city: cityName || "City Unknown",
            country: countryName || "Country Unknown",
            state: stateName || "State Unknown",
        };
    } catch (error) {        
        // console.error("Error al obtener información de IP:", error);
        return {
            city: "City Unknown",
            country: "Country Unknown",
            state: "State Unknown",
        };
    }
};






