import { afterEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom/vitest';
import Keyboard from './KeyBoard.svelte';
import Key from './Key.svelte';

describe('Keyboard Renders', () => {
	test('that Keyboard has 12 keys', () => {
		render(Keyboard);
		const keys = screen.queryAllByRole('button');
		expect(keys.length).toBe(12);
	});
});

describe('Keys behave properly', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	test('that key renders with correct label', () => {
		render(Key, { props: { note: 'A' } });
		const key = screen.queryByRole('button');
		expect(key).toBeDefined();
		expect(key).toHaveTextContent('A');
	});

	test('that pushed button calls sendNote', async () => {
		const mockPush = vi.fn();

		const { getByRole } = render(Key, { props: { note: 'A', sendNote: mockPush } });

		const button = getByRole('button');
		await fireEvent.pointerDown(button);

		expect(mockPush).toBeCalled();
		expect(mockPush).toBeCalledWith('A');
	});

	test('that pushed button removes note on mouse up', async () => {
		const mockPush = vi.fn();
		const mockRelease = vi.fn();

		const { getByRole } = render(Key, { props: { sendNote: mockPush, releaseNote: mockRelease } });

		const button = getByRole('button');
		await fireEvent.pointerDown(button);
		await fireEvent.pointerUp(button);

		expect(mockPush).toHaveBeenCalledOnce();
		expect(mockRelease).toHaveBeenCalledOnce();
	});

	test('that button removes note on mouse leave', async () => {
		const mockPush = vi.fn();
		const mockRelease = vi.fn();

		const { getByRole } = render(Key, { props: { sendNote: mockPush, releaseNote: mockRelease } });

		const button = getByRole('button');
		await fireEvent.pointerDown(button);
		await fireEvent.pointerOut(button);

		expect(mockPush).toHaveBeenCalledOnce();
		expect(mockRelease).toHaveBeenCalledOnce();
	});
});
