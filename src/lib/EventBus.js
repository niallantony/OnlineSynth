export const EventBus = () => {
	const events = {};

	const subscribe = (event, cb) => {
		if (!events[event]) {
			events[event] = [];
		}
		if (!events[event].includes(cb)) {
			events[event].push(cb);
		}
	};

	const publish = (event, data) => {
		if (events[event]) {
			events[event].forEach((cb) => cb(data));
		}
	};

	const unsubscribe = (event, callback) => {
		if (!events[event]) {
			return;
		}
		events[event] = events[event].filter((cb) => cb !== callback);
	};

	return {
		subscribe,
		publish,
		unsubscribe
	};
};
