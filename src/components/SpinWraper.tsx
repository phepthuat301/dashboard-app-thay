

interface SpinWraperProps {
    isSpin: boolean;
    children: React.ReactNode;
}

export const SpinWraper: React.FC<SpinWraperProps> = ({ isSpin, children }) => {
    return (
        <>
            <div className='spinner-wrapper'>
                {children}
                {isSpin && <div className='spinner'>
                    <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
                </div>}
            </div>

        </>
    );
};
