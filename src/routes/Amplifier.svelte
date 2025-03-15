<script>
	import { getAudioContext } from '$lib/audioCtx';
	import { onMount } from 'svelte';

	let { eventBus } = $props();
	let frequencies = $state();
	let oscillators;

	let audioCtx;
	onMount(() => {
		audioCtx = getAudioContext();
	});

	const getWavelengths = (data) => {
		for (let o in oscillators) {
			oscillators[o].stop();
			oscillators.splice(o, 1);
		}
		frequencies = data.notes.map((note) => note.freq);
		oscillators = frequencies.map((freq) => {
			const osc = audioCtx.createOscillator();
			osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
			osc.connect(audioCtx.destination);
			osc.start(0);
			return osc;
		});
	};

	eventBus.subscribe('signalchange', getWavelengths);
</script>

<h2>Wavelength</h2>
<p>{frequencies}</p>
