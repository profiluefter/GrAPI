import { indexURL } from "../common";

export default router => {
    router.postJSON("/auth", async req => {
        let response = await fetch(indexURL, {
            method: "POST",
            body: "username=" + encodeURIComponent(req.username) + "&password=" + encodeURIComponent(req.password),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": "GrAPI"
            }
        })

        let token = response.headers.get("Set-Cookie").match(/PHPSESSID=([-,a-zA-Z0-9]+);/)[1]

        let textResponse = await response.text()
        let success = textResponse.includes("<title>GraM</title>")

        return {
            success,
            token
        }
    })
}