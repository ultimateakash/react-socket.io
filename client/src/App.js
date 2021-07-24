import './App.css';
import HeaderComponent from './components/comman/header.component';
import ListComponent from './components/pages/movies/list.component';
import { socket, SocketContext } from './context/socket';

function App() {
	return (
		<SocketContext.Provider  value={socket}>
			<HeaderComponent />
			<div className="container">
				<ListComponent />
			</div>
		</SocketContext.Provider>
	);
}

export default App;
