import { demoToken } from '../demoData'

export default router => {
    router.postJSON('/cross', async req => {
        if(req.token === demoToken) {
            return {
                success: true
            }
        }
    })
}