import UploadConfig from "../pages/configManagement/UploadConfig/UploadConfig";
import ListAllConfig from "../pages/configManagement/AllConfig/ListAllConfig";
import ListAllPromptCustomize from "../pages/promptCustomizeManagement/ListAllPromptCustomize";
interface Iroute {
    path: string;
    element?: any;
    label?: string;
    childs?: Array<{
        path: string;
        element: any;
        label?: string;
        child?:any
    }>
}
export const routes: Iroute[] = [
    {
        path: "config",
        label: 'Config',
        childs: [
            {
                path: "upload-config",
                label: 'Upload Config',
                element: <UploadConfig />
            },
            {
                path: "list-config",
                label: 'All Configs',
                element: <ListAllConfig />
            },
        ]
    },
    {
        path: "custom-prompt",
        label: 'Prompt Customize',
        childs: [
            {
                path: "list-prompt",
                label: 'All Prompt',
                element: <ListAllPromptCustomize />,
            }
        ]
    }
]
