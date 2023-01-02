import { toast } from 'react-toastify'
const NotifyController = {
    success: (message: string) => {
        toast.success(message)
    },
    info: (message: string) => {
        toast.info(message)
    },
    error: (message: string) => {
        toast.error(message)
    },
    warning: (message: string) => {
        toast.warning(message)
    },
}


export default NotifyController
