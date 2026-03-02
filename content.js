let lastHeartbeat = 0;

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str));
}

async function sendHeartbeat() {

    const now = Date.now();
    // Each 2 minutes send heartbeat if there is activity, otherwise skip to avoid sending too many heartbeats when user is idle
    if (now - lastHeartbeat < 120000) return;

    chrome.storage.sync.get(['wakaKey', 'hostname'], async (data) => {
        const apiKey = data.wakaKey;
        const machineName = data.hostname || "Browser Google IDE";

        if (!apiKey) {
            console.warn("WakaTime GAS: API key not found. Add it in the extension options.");
            return;
        }

        let currentFile = "script.gs"; // Default file name
        const selectedItem = document.querySelector('div[role="treeitem"][aria-selected="true"]');
        if (selectedItem) {
            currentFile = selectedItem.innerText.split('\n')[0].trim();
        }

        const proyectName = document.title.split(' – ')[0] || "App Script Project"; // Find project name 

        // Get Operating System string for user agent
        const os = getOSString();
        const userAgent = `wakatime/24.0.0 (${os}) Google-Apps-Script/1.0 google-apps-script-wakatime/1.0.0`;

        try {
            const response = await fetch("https://wakatime.com/api/v1/users/current/heartbeats", {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${b64EncodeUnicode(apiKey)}`,
                    'Content-Type': 'application/json',
                    "X-Machine-Name": machineName,
                },
                body: JSON.stringify({
                    "entity": currentFile,
                    "type": "file",
                    "project": proyectName,
                    "category": "coding",
                    "time": now / 1000,
                    "language": "Google Apps Script",
                    "editor": "Google Apps Script",
                    "plugin": "google-apps-script-wakatime/1.0.0",
                    "user_agent": userAgent,
                })
            });

            if (response.ok) {
                lastHeartbeat = now;
                console.log(`WakaTime: Heartbeat sent successfully (${proyectName})`);
            } else {
                console.error("WakaTime: Error in response", response.status);
            }
        } catch (error) {
            console.error("WakaTime: Connection error", error);
        }
    });
}

document.addEventListener('keydown', () => {
    sendHeartbeat();
}); 

sendHeartbeat();