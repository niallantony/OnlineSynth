<script>
	import Key from './Key.svelte';
	const NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

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
