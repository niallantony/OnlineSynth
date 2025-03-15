<script>
	let { eventBus } = $props();

	let played = $state([]);

	const updateDisplay = (data) => {
		played = data.notes;
	};

	eventBus.subscribe('signalchange', updateDisplay);
</script>

<h2>Currently playing:</h2>
<p>{played}</p>
