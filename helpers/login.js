const useragent = require('useragent');
const getIP = require('ipware')().get_ip;
const { Reader } = require('@maxmind/geoip2-node');
const userAgentModel = require('express-useragent');

const infoBrowser = async (req) => {

    const userAgentString = req.headers['user-agent'];
    const userAgent = useragent.parse(userAgentString);
    const clientIP = getIP(req).clientIp.replace(/^::ffff:/, '');
    const typeDevice = req.device.type;
    const locationData = await infoIp(clientIP);

    obj = {
        OS: userAgent.os.family,
        browserName: userAgent.family,
        browserVersion: userAgent.toVersion(),
        typeDevice: typeDevice,
        ipAddress: clientIP,
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
        // console.log(reader);
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

module.exports = {
    infoBrowser,
    infoIp,
}