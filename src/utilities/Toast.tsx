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
    promise: (promise: Promise<any>, pending: string, error: string, success: string) => {
        toast.promise(promise, {
            pending,
            error,
            success
        })
    },
}


export default NotifyController
