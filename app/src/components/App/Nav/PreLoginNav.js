import { Link } from 'react-router-dom';
import { Routes } from '../../../core/routing';

const items = [{
    'label': 'Login',
    'route': Routes.Login,
    'icon': null,
}, {
    'label': 'Register',
    'route': Routes.Register,
    'icon': null,
}]

const PreLoginNav = () => {
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

export default PreLoginNav;
