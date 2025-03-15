let audioCtx;

export const getAudioContext = () => {
	if (!audioCtx && typeof window !== undefined) {
		audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	}
	return audioCtx;
};
