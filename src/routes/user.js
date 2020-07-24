import { indexURL } from "../common";

export default router => {
    router.postJSON("/user", async req => {
        let response = await fetch(indexURL, {
            headers: {
                "Cookie": "PHPSESSID=" + req.token
            }
        })

        let text = await response.text()
        let success = text.includes("<title>GraM</title>");

        return {
            success,
            fullName: success ? text.match(/<i class="ti-user"><\/i>.*<p>([\w\s]*)<\/p>.*<b class="caret"><\/b>/s)[1] : undefined
        }
    })
}