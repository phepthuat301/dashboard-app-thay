
import Ethnicity from "../pages/dictionaryListing/Ethnicity";
import InterestTopics from "../pages/dictionaryListing/InterestTopics";
import KeenOnMeeting from "../pages/dictionaryListing/KeenOnMeeting";
import ProfileType from "../pages/dictionaryListing/ProfileType";
import Sexuality from "../pages/dictionaryListing/Sexuality";
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
    }
]