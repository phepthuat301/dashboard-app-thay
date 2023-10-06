import UploadConfig from "../pages/configManagement/UploadConfig/UploadConfig";
import ListAllConfig from "../pages/configManagement/AllConfig/ListAllConfig";
import ListAllPromptCustomize from "../pages/promptCustomizeManagement/ListAllPromptCustomize";
import ImportTemplate from "../pages/templateManagement/ImportTemplate";
import ListAllStyles from "../pages/configManagement/AllStyles/ListAllStyles";
import { Login } from "../pages/Login";
import ListAllPose from "../pages/poseManagement/ListAllPose";
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
        path: "template",
        label: 'Template',
        childs: [
            {
                path: "import",
                label: 'Import Template',
                element: <ImportTemplate />
            },
        ]
    },
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
            {
                path: "list-style",
                label: 'All Styles',
                element: <ListAllStyles />
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
    },
    {
        path: "pose",
        label: 'List pose',
        childs: [
            {
                path: "list-pose",
                label: 'All Pose',
                element: <ListAllPose/>,
            }
        ]
    },
    // {
    //     path: "login",
    //     label: 'Login',
    //     childs: [
    //         {
    //             path: "login",
    //             label: 'Login',
    //             element: <Login />,
    //         }
    //     ]
    // }
]
