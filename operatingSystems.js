function getOSString() {
    const ua = navigator.userAgent;
    
    if (ua.includes("Windows")) return "windows";
    if (ua.includes("Mac OS X")) return "darwin";
    if (ua.includes("Linux") || ua.includes("X11")) return "linux";
    if (ua.includes("CrOS")) return "chromeos";
    
    return "unknown";
}