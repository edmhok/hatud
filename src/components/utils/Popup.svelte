<script>
	import { afterUpdate, onMount } from 'svelte';
	import Portal from './Portal.svelte';
	import { clickOutside } from '@actions/clickOutside';

	let isOpen = false;
	let openerMenu;
	let popup;
	let popupBottomPosition;
	let popupLeftPosition;

	onMount(() => {
		addEventListener('click', closePopup);
		addEventListener('resize', adjustPopup);

		return () => {
			removeEventListener('click', closePopup);
			removeEventListener('resize', adjustPopup);
		};
	});

	afterUpdate(() => {
		adjustPopup();
	});

	function adjustPopup() {
		if (isOpen) {
			const position = openerMenu.getBoundingClientRect();
			popupBottomPosition = openerMenu.clientHeight + 'px';
			popupLeftPosition = position.left + 'px';
		}
	}

	function closePopup(e) {
		if (isOpen && !isPopupClicked(e.target)) isOpen = false;
	}
	function isPopupClicked(targetElement) {
		return popup.contains(targetElement);
	}
</script>

<div class="flex-it">
	<div bind:this={openerMenu} class="flex-it">
		<button
			on:click|stopPropagation={() => {
				isOpen = !isOpen;
			}}
		>
			<slot />
		</button>
	</div>
	{#if isOpen}
		<Portal>
			<div
				use:clickOutside
				bind:this={popup}
				style="bottom: {popupBottomPosition}; left: {popupLeftPosition}"
				class="flex-it hover:cursor-pointer fixed bg-gray-800 text-white popup z-10 rounded-2xl border-gray-700 border transition duration-1000"
			>
				<div class="w-72 min-w-68 max-h-120 min-h-8 flex-it overflow-auto">
					<div class="flex-it flex-grow flex-shrink py-3">
						<div class="flex-it px-4 py-3 transition hover:bg-gray-700">Logout</div>
					</div>
				</div>
			</div>
		</Portal>
	{/if}
</div>
