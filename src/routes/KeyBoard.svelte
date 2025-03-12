<script>
	import Key from './Key.svelte';

	const NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
	let notes = $state([]);

	const sendNote = (note) => {
		notes.push(note);
	};

	const removeNote = (note) => {
		notes.splice(notes.indexOf(note), 1);
	};
</script>

<p>Playing: {notes}</p>
{#each NOTES as note}
	<Key {sendNote} {removeNote} {note} />
{/each}

<style>
</style>
