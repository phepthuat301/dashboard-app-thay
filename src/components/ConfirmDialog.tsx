import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

interface confirmDialogProps {
    show: boolean;
    message: string;
    onAccept: () => void;
    onDeny: () => void;
}

export const ConfirmDialog: React.FC<confirmDialogProps> = ({ show, message, onAccept, onDeny }) => {
    const deleteDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={onDeny} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={onAccept} />
        </>
    );
    return (
        <>
            <Dialog visible={show} style={{ width: '450px' }} header="Confirm" modal footer={deleteDialogFooter} onHide={onDeny}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>
                        {message}
                    </span>
                </div>
            </Dialog>
        </>
    );
};
