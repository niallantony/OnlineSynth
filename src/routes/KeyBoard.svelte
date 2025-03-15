<script>
	import Key from './Key.svelte';
	const NOTES = [
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

	let { eventBus } = $props();
	let notes = $state([]);

	const sendNote = (note) => {
		notes.push(note);
		eventBus.publish('keypress', { key: note });
	};

	const releaseNote = (note) => {
		notes.splice(notes.indexOf(note), 1);
		eventBus.publish('keydepress', { key: note });
	};
</script>

{#each NOTES as note}
	<Key {sendNote} {releaseNote} {note} />
{/each}

<style>
</style>
