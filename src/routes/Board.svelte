<script>
	import KeyBoard from './KeyBoard.svelte';
	import Visualiser from './Visualiser.svelte';
	import Amplifier from './Amplifier.svelte';
	import { onMount } from 'svelte';
	import { NOTES, KeyboardModule, AmplifierModule } from '$lib/modules';
	import { getAudioContext } from '$lib/audioCtx';
	import { derived } from 'svelte/store';

	let audioCtx;
	let amp;
	onMount(() => {
		audioCtx = getAudioContext();
		amp = AmplifierModule(audioCtx);
		keyboard.attachOutput(amp);
	});

	const keyboard = KeyboardModule();
</script>

<KeyBoard {NOTES} sendNote={keyboard.sendNote} releaseNote={keyboard.releaseNote} />
<Visualiser input={keyboard} />
<Amplifier />
