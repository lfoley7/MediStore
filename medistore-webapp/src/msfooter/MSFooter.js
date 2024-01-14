// MSFooter.js
import React from 'react';
import { Link } from 'react-router-dom';

const MSFooter = () => {
    return (
        <footer className="bg-dark text-light text-center p-3" style={{ color: 'rgb(150, 150, 150)' }}>
            <div>
                2024 GoatHacks - Powered by{' '}
                <Link to="https://www.instagram.com/p/C2Dgcm7vu80/?igsh=MTVmcDBjdHd1OXdjaA==" className="text-decoration-none" style={{ color: "rgb(80, 150, 250)" }}>
                    Beta Theta Pi Eta Tau
                </Link>
            </div>
        </footer>
    );
};

export default MSFooter;
