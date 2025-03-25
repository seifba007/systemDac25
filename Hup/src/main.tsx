import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './core/store';
import EntryPoint from './presentation/entryPoint/entryPoint';
import '@mantine/core/styles.css';
import './index.scss';
import './core/i18n';
import './sass/global.scss';
import { MantineProvider } from '@mantine/core';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<MantineProvider theme={theme}>
				<EntryPoint />
			</MantineProvider>
		</PersistGate>
	</Provider>,
);
