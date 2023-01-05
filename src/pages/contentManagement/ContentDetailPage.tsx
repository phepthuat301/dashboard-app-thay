import { useParams } from "react-router-dom";

export const ContentDetailPage: React.FC = () => {
    const { id } = useParams();
    return (
        <>
            {id}
        </>
    );
};
