import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useRef } from 'react';

interface showPanelBtnProps {
    message: string;
    children: React.ReactNode;
}

export const ShowPanelBtn: React.FC<showPanelBtnProps> = ({ message, children }) => {
    const op = useRef<any>(null);
    return (
        <>
            <Button type="button" label="Watch" onClick={(event) => { op.current.toggle(event); }} className="p-button-success" />
            <OverlayPanel ref={op} showCloseIcon>
                {children}
            </OverlayPanel>
        </>
    );
};
