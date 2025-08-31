export function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    let browserName = "Unknown Browser";
    let fullVersion = "Unknown Version";
    let platform = "Unknown Platform";
    let systemVersion = "Unknown Version";
    let versionOffset;

    if ((versionOffset = userAgent.indexOf("Firefox")) !== -1) {
        browserName = "Mozilla Firefox";
        fullVersion = userAgent.substring(versionOffset + 8);
    } else if ((versionOffset = userAgent.indexOf("SamsungBrowser")) !== -1) {
        browserName = "Samsung Internet";
        fullVersion = userAgent.substring(versionOffset + 15);
    } else if ((versionOffset = userAgent.indexOf("Opera")) !== -1 || (versionOffset = userAgent.indexOf("OPR")) !== -1) {
        browserName = "Opera";
        fullVersion = userAgent.substring(versionOffset + (userAgent.indexOf("OPR") !== -1 ? 4 : 6));
    } else if ((versionOffset = userAgent.indexOf("Trident")) !== -1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = userAgent.substring(userAgent.indexOf("rv:") + 3);
    } else if ((versionOffset = userAgent.indexOf("Edge")) !== -1) {
        browserName = "Microsoft Edge";
        fullVersion = userAgent.substring(versionOffset + 5);
    } else if ((versionOffset = userAgent.indexOf("Chrome")) !== -1) {
        browserName = "Chrome";
        fullVersion = userAgent.substring(versionOffset + 7);
    } else if ((versionOffset = userAgent.indexOf("Safari")) !== -1) {
        browserName = "Apple Safari";
        fullVersion = userAgent.substring(versionOffset + 7);
        if ((versionOffset = userAgent.indexOf("Version")) !== -1) {
            fullVersion = userAgent.substring(versionOffset + 8);
        }
    }

    if (userAgent.indexOf("Win") !== -1) {
        platform = "Windows";
        if (userAgent.indexOf("Windows NT 10.0") !== -1) systemVersion = "10";
        else if (userAgent.indexOf("Windows NT 6.3") !== -1) systemVersion = "8.1";
        else if (userAgent.indexOf("Windows NT 6.2") !== -1) systemVersion = "8";
        else if (userAgent.indexOf("Windows NT 6.1") !== -1) systemVersion = "7";
        else if (userAgent.indexOf("Windows NT 6.0") !== -1) systemVersion = "Vista";
        else if (userAgent.indexOf("Windows NT 5.1") !== -1) systemVersion = "XP";
    } else if (userAgent.indexOf("Mac") !== -1) {
        platform = "Macintosh";
        const match = /Mac OS X (\d+[\.\_\d]+)/.exec(userAgent);
        systemVersion = match ? match[1].replace('_', '.') : systemVersion;
    } else if (userAgent.indexOf("Linux") !== -1) {
        platform = "Linux";
    } else if (userAgent.indexOf("Android") !== -1) {
        platform = "Android";
        const match = /Android (\d+[\.\_\d]+)/.exec(userAgent);
        systemVersion = match ? match[1] : systemVersion;
    } else if (userAgent.indexOf("like Mac") !== -1) {
        platform = "iOS";
        const match = /CPU (?:iPhone )?OS (\d+[\_\d]+)/.exec(userAgent);
        systemVersion = match ? match[1].replace('_', '.') : systemVersion;
    }

    return {
        browser: browserName,
        version: fullVersion.split(' ')[0],
        system: platform,
        systemVersion: systemVersion
    };
}

export async function getIPAndLocation() {
    let ip = null;
    let city = null;
    let country = null;

    try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        if (!ipResponse.ok) throw new Error('Failed to fetch IP');
        const ipData = await ipResponse.json();
        ip = ipData.ip;

        const locationResponse = await fetch(`https://ipinfo.io/${ip}/json`);
        if (!locationResponse.ok) throw new Error('Failed to fetch location');
        const locationData = await locationResponse.json();

        city = locationData.city;
        country = locationData.country;

    } catch (error) {
        console.error('Error fetching IP and location:', error);
    }

    return { ip, city, country };
}
