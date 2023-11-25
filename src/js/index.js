/**
 * Application entry point
 */

// load styles

//Bootstrap core CSS
import '../styles/scss/vendors/normalize.css';
import '../styles/scss/vendors/bootstrap.css';
import '../styles/scss/vendors/main.css';

//Custom styles
import '../styles/scss/main.scss';
import '../styles/scss/photoswipe/photo-swipe.scss';
import '../styles/scss/photoswipe/default-skin.scss';

//load images
import '../assets/images/icons/mail.svg';
import '../assets/images/icons/mts.svg';
import '../assets/images/icons/a1.svg';
import '../assets/images/icons/send-mail.svg';
import '../assets/icons/apple-touch-icon.png';
import '../assets/icons/favicon-16x16.png';
import '../assets/icons/favicon-32x32.png';

//load js files
import './vendor/modernizr-3.11.2.min';
import 'bootstrap/dist/js/bootstrap.min';
import './helpers/plugins';
import './main';
