<script>
	import Key from './Key.svelte';

	let { NOTES, sendNote, releaseNote } = $props();
</script>

<div class="keyboard">
	{#each NOTES as note}
		<Key {sendNote} {releaseNote} {note} />
	{/each}
</div>

<style>
</style>
