import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import LogoutButton from '../../Auth/LogoutButton';

const items = [{
    'label': 'Missions',
    'route': Routes.MissionsOverview,
    'icon': null,
}, {
    'label': 'Profile',
    'route': Routes.Profile,
    'icon': null,
}]

const Navigation = () => {

    const [showCollapsedMenu, setCollapsedMenu] = useState(false)

    const showMenu = (query) => {
        setCollapsedMenu(!showCollapsedMenu);
    }

    const show = (showCollapsedMenu) ? "show" : "" ;

    return (
        
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container px-5'>
                <Link className="navbar-brand" to={Routes.MissionsOverview}>Paranormax</Link>
                <button 
                    onClick={showMenu}
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={"collapse navbar-collapse " + show} id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {
                            items.map((item) => (
                                <li key={item.route} className="nav-item">
                                    <Link className="nav-link" to={item.route}>{item.label}</Link>
                                </li>
                            ))
                        }
                    </ul>
                    <LogoutButton/>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
