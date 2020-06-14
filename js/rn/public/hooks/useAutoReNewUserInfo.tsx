import { useEffect } from "react"
import { updateUserInfo } from "../../redux/store/IGlobalStateHelper";

const useAutoRenewUserInfo = (navigation) => {
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            updateUserInfo()
        });
        return unsubscribe;
    }, [])
    return null
}
export default useAutoRenewUserInfo