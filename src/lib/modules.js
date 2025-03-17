export const AmplifierModule = (audioCtx) => {
	let oscillators = [];

	const passSignal = (data) => {
		stopOscillators();
		const frequencies = getWavelengths(data);
		updateOscillators(frequencies);
	};

	const stopOscillators = () => {
		for (let o in oscillators) {
			oscillators[o].stop();
			oscillators.splice(o, 1);
		}
	};

	const updateOscillators = (frequencies) => {
		frequencies.map((freq) => {
			const osc = audioCtx.createOscillator();
			osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
			osc.connect(audioCtx.destination);
			osc.start(0);
			oscillators.push(osc);
		});
	};

	const getWavelengths = (data) => {
		const frequencies = data.map((note) => note.freq);
		return frequencies;
	};

	return {
		passSignal
	};
};

export const KeyboardModule = () => {
	const outputs = [];
	const notes = {};

	const passSignal = () => {
		outputs.forEach((output) => {
			output.passSignal(Object.values(notes));
		});
	};

	const attachOutput = (output) => {
		outputs.push(output);
	};

	const detachOutput = (output) => {
		outputs.splice(outputs.indexOf(output), 1);
	};

	const sendNote = (note) => {
		notes[note.name] = note;
		passSignal();
	};

	const releaseNote = (note) => {
		if (notes[note.name]) {
			delete notes[note.name];
		}
		passSignal();
	};

	return {
		attachOutput,
		detachOutput,
		sendNote,
		releaseNote
	};
};

export const NOTES = [
	{
		name: 'A',
		freq: 220.0
	},
	{
		name: 'A#',
		freq: 233.08
	},
	{
		name: 'B',
		freq: 246.94
	},
	{
		name: 'C',
		freq: 261.63
	},
	{
		name: 'C#',
		freq: 277.18
	},
	{
		name: 'D',
		freq: 293.66
	},
	{
		name: 'D#',
		freq: 311.13
	},
	{
		name: 'E',
		freq: 329.63
	},
	{
		name: 'F',
		freq: 349.23
	},
	{
		name: 'F#',
		freq: 369.99
	},
	{
		name: 'G',
		freq: 392.0
	},
	{
		name: 'G#',
		freq: 415.3
	}
];
