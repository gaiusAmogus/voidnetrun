import { useEffect } from 'react';
import { getBrowserInfo, getIPAndLocation } from '../../functions/userInfo';

export default function Header() {

    useEffect(() => {
        updateUserInfo();
    }, []);

    async function updateUserInfo() {
        const browserInfo = getBrowserInfo();
        const ipAndLocation = await getIPAndLocation();

        const userSystem = document.querySelector('#userSystem span');
        const userBrowser = document.querySelector('#userBrowser span');
        const userTime = document.querySelector('#userTime span');
        const userLocation = document.querySelector('#userLocation span');
        const userIP = document.querySelector('#userIP span');
        const userBat = document.querySelector('#userBat span');

        if (userSystem) userSystem.textContent = browserInfo.system + ' ' + browserInfo.systemVersion || 'NO DATA';
        if (userBrowser) userBrowser.textContent = (browserInfo.browser + ' ' + browserInfo.version) || 'NO DATA';

        if (ipAndLocation) {
            userLocation.textContent = (ipAndLocation.city && ipAndLocation.country) 
                ? `${ipAndLocation.city}, ${ipAndLocation.country}`
                : ipAndLocation.city || ipAndLocation.country || 'NO DATA';
            if (userIP) userIP.textContent = ipAndLocation.ip || 'NO DATA';
        }

        updateCurrentTime();
        setInterval(updateCurrentTime, 1000);

        updateBatteryStatus();
        setInterval(updateBatteryStatus, 60000);

        function updateCurrentTime() {
            if (userTime) {
                let now = new Date();
                userTime.textContent = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
            }
        }

        async function updateBatteryStatus() {
            if (!userBat) return;
            if ('getBattery' in navigator) {
                let battery = await navigator.getBattery();
                let batteryLevel = Math.round(battery.level * 100);
                userBat.textContent = (batteryLevel + '%' || 'NO DATA') + (battery.charging ? ' (charging)' : '');
            } else {
                userBat.textContent = 'NO DATA';
            }
        }
    }

    return (
        <header className="header">
            <div className="header__row">
                <div className="header__row__el header__row__el--1">
                    <p id="userSystem">User System: <span></span></p>
                    <p id="userBrowser">Browser: <span></span></p>
                    <p id="userIP">IP Address: <span></span></p>
                </div>
                <div className="header__row__el header__row__el--2">
                    <p id="userTime">User time: <span></span></p>
                    <p id="userLocation">Location: <span></span></p>
                    <p id="userBat">User battery status: <span></span></p>
                </div>
            </div>
        </header>
    );
}
