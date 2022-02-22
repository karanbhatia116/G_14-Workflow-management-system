import io from 'socket.io-client';

const socket = io("/", {
			forceNew: false,
			autoConnect: false,
		});

export default socket;