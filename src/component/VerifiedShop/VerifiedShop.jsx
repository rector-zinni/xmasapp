import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../VerifiedShop/verified-shp.scss';
import { faUser} from '@fortawesome/free-solid-svg-icons/faUserCheck';
import { faFaceAngry } from '@fortawesome/free-regular-svg-icons';

const VerifiedShop = () => {
    return (
        <div className="verified-shop">
            <h1>Shop with confidence</h1>
            <div className="verified-wrp">
                <verifiedItem/>
            </div>
        </div>
    );
}

const verifiedItem = () => {
    return (
        <div className="verified-item">
            {/* <div className="icon-item">
                <FontAwesomeIcon icon={faFaceAngry}/>
            </div> */}
        </div>
    )
}

export default VerifiedShop;