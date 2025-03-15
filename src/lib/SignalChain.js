export const SignalChain = (eventBus) => {
	const pressedKeys = [];

	const signalStart = (data) => {
		if (!pressedKeys.includes(data.key)) {
			pressedKeys.push(data.key);
		}
		emitSignalChange();
	};

	const signalStop = (data) => {
		const index = pressedKeys.indexOf(data.key);
		if (index !== -1) {
			pressedKeys.splice(index, 1);
		}
		emitSignalChange();
	};

	const emitSignalChange = () => {
		console.log(pressedKeys);
		eventBus.publish('signalchange', { notes: [...pressedKeys] });
	};

	eventBus.subscribe('keypress', signalStart);
	eventBus.subscribe('keydepress', signalStop);

	return {
		signalStop,
		signalStart
	};
};
