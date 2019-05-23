import $ from 'jquery';

export function closeModal() {
	$('.md-show').removeClass('md-show');
}

export function initModal() {

	let overlay = document.querySelector('.md-overlay');
	let overlaySecond = document.querySelector('.md-overlay-second');

	[].slice.call(document.querySelectorAll('.md-trigger')).forEach(function (el, i) {

		let modal = document.querySelector('#' + el.getAttribute('data-modal')),
			close = modal.querySelector('.md-close');

		function removeModal(hasPerspective) {
			modal.classList.remove('md-show');

			if (hasPerspective) {
				document.documentElement.classList.remove('md-perspective');
			}
		}

		function removeModalHandler() {
			removeModal(el.classList.contains('md-setperspective'));
		}

		el.addEventListener('click', function (ev) {
			modal.classList.add('md-show');
			overlay.removeEventListener('click', removeModalHandler);
			overlay.addEventListener('click', removeModalHandler);
			if (overlaySecond) {
				overlaySecond.removeEventListener('click', removeModalHandler);
				overlaySecond.addEventListener('click', removeModalHandler);
			}

			if (el.classList.contains('md-setperspective')) {
				setTimeout(function () {
					document.documentElement.classList.add('md-perspective');
				}, 25);
			}
		});

		close.addEventListener('click', function (ev) {
			ev.stopPropagation();
			removeModalHandler();
		});

		//close on escape
		$(document).keyup(function (e) {
			if (e.keyCode === 27) {
				e.stopPropagation();
				removeModalHandler();
			}
		});

	});
}