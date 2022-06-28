import { Provider } from 'react-redux';
import { wrapper, store } from '../store/store'

import '../styles/slick.min.css';
import '../styles/slick-theme.css';
import '../styles/globals.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-medium-image-zoom/dist/styles.css'
import 'react-loading-skeleton/dist/skeleton.css'

function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
}

export default wrapper.withRedux(MyApp);
