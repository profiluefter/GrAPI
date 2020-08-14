import { demoToken, demoHomeworkList, demoHomeworkDetails } from '../demoData'

const getHomeworks = req => {
    if(req.token === demoToken) {
        return demoHomeworkList
    }


}

const getHomeworkDetails = req => {
    if(req.token === demoToken) {
        return demoHomeworkDetails
    }


}

export default router => {
    router.postJSON('/homework', async req => {
        if(!req.id) {
            return getHomeworks(req)
        } else {
            return getHomeworkDetails(req)
        }
    })
}