export async function isChromeRecommended(): Promise<boolean> {

    const ua = navigator.userAgent;

    const nav = navigator as Navigator & {
        brave?: {
            isBrave: () => Promise<boolean>;
        };
    };

    if (nav.brave) {
        try {
            if (await nav.brave.isBrave()) {
                return false;
            }
        } catch { }
    }

    if (ua.includes("Edg/")) return false;
    if (ua.includes("OPR/")) return false;
    if (ua.includes("Firefox")) return false;

    if (ua.includes("Safari") && !ua.includes("Chrome")) {
        return false;
    }

    return ua.includes("Chrome");
}