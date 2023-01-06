import React from 'react';

const AppFooter = (props: any) => {
    return (
        <div className="layout-footer">
            <div className="footer-logo-container">
                <img id="footer-logo" src={`${process.env.REACT_APP_ROOT_PATH}assets/layout/images/logo-${props.colorScheme === 'light' ? 'dark' : 'light'}.png`} alt="atlantis-layout" />
                <span className="app-name">ATLANTIS</span>
            </div>
            <span className="copyright">&#169; Your Organization - 2021</span>
        </div>
    );
};

export default AppFooter;
