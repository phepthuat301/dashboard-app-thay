
import ContentPage from "../pages/contentManagement/ContentPage";
import ReportedContentPage from "../pages/reportedManagement/ReportedPage";
import Ethnicity from "../pages/dictionaryListing/Ethnicity";
import InterestTopics from "../pages/dictionaryListing/InterestTopics";
import KeenOnMeeting from "../pages/dictionaryListing/KeenOnMeeting";
import ProfileType from "../pages/dictionaryListing/ProfileType";
import Sexuality from "../pages/dictionaryListing/Sexuality";
import { ContentDetailPage } from "../pages/contentManagement/ContentDetailPage";
import UserPage from "../pages/userManagement/userPage";
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
                path: "content/:id",
                label: 'Content',
                element: < ContentDetailPage />
            },
            {
                path: "content",
                label: 'Content',
                element: < ContentPage />
            },
            {
                path: "reported-content",
                label: 'Reported Content',
                element: < ReportedContentPage />
            },
        ]
    },
    {
        path: "reported-management",
        label: 'Reported Management',
        childs: [
            {
                path: "reported",
                label: 'Reported',
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
        ]
    }
]