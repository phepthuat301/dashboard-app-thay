
import ContentPage from "../pages/contentManagement/ContentPage";
import ReportedContentPage from "../pages/reportedManagement/ReportedContentPage";
import Ethnicity from "../pages/dictionaryListing/Ethnicity";
import InterestTopics from "../pages/dictionaryListing/InterestTopics";
import KeenOnMeeting from "../pages/dictionaryListing/KeenOnMeeting";
import ProfileType from "../pages/dictionaryListing/ProfileType";
import Sexuality from "../pages/dictionaryListing/Sexuality";
import { ContentDetailPage } from "../pages/contentManagement/ContentDetailPage";
import UserPage from "../pages/userManagement/UserPage";
import { UserDetailPage } from "../pages/userManagement/UserDetailPage";
import AdminActivities from "../pages/activitisManagement/AdminActivities";
import AdminPage from "../pages/adminManagement/AdminPage";
import { AdminDetailPage } from "../pages/adminManagement/AdminDetailPage";
import UserPermissionManagement from "../pages/userManagement/PermissionManagement";
import AdminPermissionManagement from "../pages/adminManagement/PermissionManagement";
import { BatchUpdateUser } from "../pages/notificationManagement/BatchUpdateUser";
interface Iroute {
    path: string;
    element?: any;
    label?: string;
    childs?: Array<{
        path: string;
        element: any;
        label?: string;
    }>
}
export const routes: Iroute[] = [
    {
        path: "dictionary-listing",
        label: 'Dictionary Listing',
        childs: [
            {
                path: "profile-type",
                label: 'Profile Type',
                element: < ProfileType />
            },
            {
                path: "sexuality",
                label: 'Sexuality',
                element: < Sexuality />
            },
            {
                path: "keen-on-meeting",
                label: 'Keen On Meeting',
                element: < KeenOnMeeting />
            },
            {
                path: "interest-topics",
                label: 'Interest Topics',
                element: < InterestTopics />
            },
            {
                path: "ethnicity",
                label: 'Ethnicity',
                element: < Ethnicity />
            }
        ]
    },
    {
        path: "content-management",
        label: 'Content Management',
        childs: [
            {
                path: "content",
                label: 'Content',
                element: < ContentPage />
            },
            {
                path: "content-:id",
                label: 'Content',
                element: < ContentDetailPage />
            },
            {
                path: "reported",
                label: 'Reported Content',
                element: < ReportedContentPage />
            },
        ]
    },
    {
        path: "user-management",
        label: 'User Management',
        childs: [
            {
                path: "user",
                label: 'User',
                element: < UserPage />
            },
            {
                path: "user-:id",
                label: 'User Detail',
                element: < UserDetailPage />
            },
            {
                path: "permission",
                label: 'Permission',
                element: < UserPermissionManagement />
            }
        ]
    },
    {
        path: "Admin-management",
        label: 'Team Management',
        childs: [
            {
                path: "admin",
                label: 'Admin',
                element: < AdminPage />
            },
            {
                path: "admin-:id",
                label: 'User Detail',
                element: < AdminDetailPage />
            },
            {
                path: "activies",
                label: 'Admin activities',
                element: < AdminActivities />
            },
            {
                path: "permission",
                label: 'Permission',
                element: < AdminPermissionManagement />
            }
        ]
    },
    {
        path: "notification-management",
        label: 'Batch Update User',
        childs: [
            {
                path: "bacth-update-user",
                label: 'Batch Update User',
                element: < BatchUpdateUser />
            }
        ]
    },
]