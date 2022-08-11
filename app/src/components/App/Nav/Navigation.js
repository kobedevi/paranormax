import { Link } from 'react-router-dom';
import { Routes } from '../../../core/routing';

const items = [{
    'label': 'Missions',
    'route': Routes.MissionsOverview,
    'icon': null,
}, {
    'label': 'Users',
    'route': Routes.Users,
    'icon': null,
}]

const Navigation = () => {
    return (
        <nav>
            <div>
                <ul>
                    {
                        items.map((item) => (
                            <li key={item.route} className="nav-item">
                                <Link className="nav-link" to={item.route}>{item.label}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </nav>
    );

};

export default Navigation;
