import { useParams } from "react-router-dom";

export const UserDetailPage: React.FC = () => {
    const { id } = useParams();
    return (
        <>
            {id}
        </>
    );
};
