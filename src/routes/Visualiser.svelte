<script>
	let { eventBus } = $props();

	let played = $state([]);

	const updateDisplay = (data) => {
		played = data.notes.map((note) => note.name);
	};

	eventBus.subscribe('signalchange', updateDisplay);
</script>

<h2>Currently playing:</h2>
<p>{played}</p>
