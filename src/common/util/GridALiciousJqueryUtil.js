import $ from 'jquery';
import BasicComponent from '../abstract/component/BasicComponent';

(function ($, sr) {
	let debounce = function (func, threshold, execAsap) {
		let timeout;
		return function debounced() {
			let obj = this,
				args = arguments;

			function delayed() {
				if (!execAsap) func.apply(obj, args);
				timeout = null;
			}

			if (timeout) clearTimeout(timeout);
			else if (execAsap) func.apply(obj, args);

			timeout = setTimeout(delayed, threshold || 150);
		};
	};
	$.fn[sr] = function (fn) {
		return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
	};
})($, 'smartresize');

export function gridALiciousMagic(_this: BasicComponent) {
	$.Gal = function (options, element) {
		this.element = $(element);
		this._init(options);
	};

	$.Gal.settings = {
		selector: '.item',
		width: 225,
		gutter: 20,
		animate: false,
		animationOptions: {
			speed: 200,
			duration: 300,
			effect: 'fadeInOnAppear',
			queue: true,
			complete: function () {
			}
		},
	};

	$.Gal.prototype = {

		_init: function (options) {
			let container = this;
			this.name = this._setName(5);
			this.gridArr = [];
			this.gridArrAppend = [];
			this.gridArrPrepend = [];
			this.setArr = false;
			this.setGrid = false;
			// this.setOptions; don't use
			this.cols = 0;
			this.itemCount = 0;
			this.prependCount = 0;
			this.isPrepending = false;
			this.appendCount = 0;
			this.resetCount = true;
			this.ifCallback = true;
			this.box = this.element;
			this.options = $.extend(true, {}, $.Gal.settings, options);
			this.gridArr = $.makeArray(this.box.find(this.options.selector));
			this.isResizing = false;
			this.w = 0;
			this.boxArr = [];

			// build columns
			this._setCols();
			// build grid
			this._renderGrid('append');
			// add class 'gridalicious' to container
			$(this.box).addClass('gridalicious');
			// add smartresize
			$(window).smartresize(function () {
				container.resize();
			});
		},

		_setName: function (length, current) {
			current = current ? current : '';
			return length ? this._setName(--length, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 60)) + current) : current;
		},

		_setCols: function () {
			// calculate columns
			this.cols = Math.floor(this.box.width() / this.options.width);
			//If Cols lower than 1, the grid disappears
			if (this.cols < 1) {
				this.cols = 1;
			}
			let diff = (this.box.width() - (this.cols * this.options.width) - this.options.gutter) / this.cols;
			let w = (this.options.width + diff) / this.box.width() * 100;
			this.w = w;
			// add columns to box
			for (let i = 0; i < this.cols; i++) {
				let div = $('<div></div>').addClass('galcolumn').attr('id', 'item' + i + this.name).css({
					'width': w + '%',
					'paddingLeft': this.options.gutter,
					'paddingBottom': this.options.gutter,
					'float': 'left',
					'-webkit-box-sizing': 'border-box',
					'-moz-box-sizing': 'border-box',
					'-o-box-sizing': 'border-box',
					'box-sizing': 'border-box'
				});
				this.box.append(div);
			}


			this.box.find($('#clear' + this.name)).remove();
			// add clear float
			let clear = $('<div></div>').css({
				'clear': 'both',
				'height': '0',
				'width': '0',
				'display': 'block'
			}).attr('id', 'clear' + this.name);
			this.box.append(clear);
		},

		_renderGrid: function (method, arr, count, prepArray) {
			let items = [];
			let boxes = [];
			// let prependArray = []; don't use
			let itemCount = 0;
			// let prependCount = this.prependCount; don't use
			let appendCount = this.appendCount;
			let gutter = this.options.gutter;
			let cols = this.cols;
			let name = this.name;
			// let i = 0; don't use
			// let w = $('.galcolumn').width(); don't use

			// if arr
			if (arr) {
				boxes = arr;
				// if append
				if (method === "append") {
					// get total of items to append
					appendCount += count;
					// set itemCount to last count of appened items
					itemCount = this.appendCount;
				}
				// if prepend
				if (method === "prepend") {
					// set itemCount
					this.isPrepending = true;
					itemCount = Math.round(count % cols);
					if (itemCount <= 0) itemCount = cols;
				}
				// called by _updateAfterPrepend()
				if (method === "renderAfterPrepend") {
					// get total of items that was previously prepended
					appendCount += count;
					// set itemCount by counting previous prepended items
					itemCount = count;
				}
			}
			else {
				boxes = this.gridArr;
				appendCount = this.gridArr.length;
			}

			// push out the items to the columns
			$.each(boxes, function (index, value) {
				let item = $(value);
				let width = '100%';

				// if you want something not to be "responsive", add the class "not-responsive" to the selector container
				if (item.hasClass('not-responsive')) {
					width = 'auto';
				}

				item.css({
					'marginBottom': gutter,
					'zoom': '1',
					'filter': 'alpha(opacity=0)',
					'opacity': '0'
				}).find('img, object, embed, iframe').css({
					'width': width,
					'height': 'auto',
					'display': 'block',
					'margin-left': 'auto',
					'margin-right': 'auto'
				});

				// prepend on append to column
				if (method === 'prepend') {
					itemCount--;
					$("#item" + itemCount + name).prepend(item);
					items.push(item);
					if (itemCount === 0) itemCount = cols;

				} else {
					$("#item" + itemCount + name).append(item);
					items.push(item);
					itemCount++;
					if (itemCount >= cols) itemCount = 0;
					if (appendCount >= cols) appendCount = (appendCount - cols);
				}
			});

			this.appendCount = appendCount;
			this.itemCount = itemCount;

			if (method === "append" || method === "prepend") {
				if (method === "prepend") {
					// render old items and reverse the new items
					this._updateAfterPrepend(this.gridArr, boxes);
				}
				this._renderItem(items);
				this.isPrepending = false;
			} else {
				this._renderItem(this.gridArr);
			}
		},

		_collectItems: function () {
			let collection = [];
			$(this.box).find(this.options.selector).each(function (i) {
				collection.push($(this));
			});
			return collection;
		},

		_renderItem: function (items) {

			let speed = this.options.animationOptions.speed;
			let effect = this.options.animationOptions.effect;
			let duration = this.options.animationOptions.duration;
			let queue = this.options.animationOptions.queue;
			let animate = this.options.animate;
			let complete = this.options.animationOptions.complete;

			let i = 0;
			let t = 0;

			// animate
			if (animate === true && !this.isResizing) {

				// fadeInOnAppear
				if (queue === true && effect === "fadeInOnAppear") {
					if (this.isPrepending) items.reverse();
					$.each(items, function (index, value) {
						setTimeout(function () {
							$(value).animate({
								opacity: '1.0'
							}, duration);
							t++;
							if (t === items.length) {
								complete.call(undefined, items)
							}
						}, i * speed);
						i++;
					});
				} else if (queue === false && effect === "fadeInOnAppear") {
					if (this.isPrepending) items.reverse();
					$.each(items, function (index, value) {
						$(value).animate({
							opacity: '1.0'
						}, duration);
						t++;
						if (t === items.length) {
							if (this.ifCallback) {
								complete.call(undefined, items);
							}
						}
					});
				}

				// no effect but queued
				if (queue === true && !effect) {
					$.each(items, function (index, value) {
						$(value).css({
							'opacity': '1',
							'filter': 'alpha(opacity=1)'
						});
						t++;
						if (t === items.length) {
							if (this.ifCallback) {
								complete.call(undefined, items);
							}
						}
					});
				}

				// don not animate & no queue
			} else {
				$.each(items, function (index, value) {
					$(value).css({
						'opacity': '1',
						'filter': 'alpha(opacity=1)'
					});
				});
				if (this.ifCallback) {
					complete.call(items);
				}
			}
		},

		_updateAfterPrepend: function (prevItems, newItems) {
			let gridArr = this.gridArr;
			// add new items to gridArr
			$.each(newItems, function (index, value) {
				gridArr.unshift(value);
			});
			this.gridArr = gridArr;
		},

		resize: function () {
			// delete columns in box
			this.box.find($('.galcolumn')).remove();
			// build columns
			this._setCols();
			// build grid
			this.ifCallback = false;
			this.isResizing = true;
			this._renderGrid('append');
			this.ifCallback = true;
			this.isResizing = false;
		},

		append: function (items) {
			let gridArr = this.gridArr;
			let gridArrAppend = this.gridArrPrepend;
			$.each(items, function (index, value) {
				gridArr.push(value);
				gridArrAppend.push(value);
			});
			this._renderGrid('append', items, $(items).size());
		},

		prepend: function (items) {
			this.ifCallback = false;
			this._renderGrid('prepend', items, $(items).size());
			this.ifCallback = true;
		},
	};

	$.fn.gridalicious = function (options, e) {
		if (typeof options === 'string') {
			this.each(function () {
				let container = $.data(this, 'gridalicious');
				container[options].apply(container, [e]);
			});
		} else {
			this.each(function () {
				$.data(this, 'gridalicious', new $.Gal(options, this));
			});
		}
		return this;
	};

	$("#timeline-grid").gridalicious({
		gutter: 10,
		width: 180,
		animate: true,
		animationOptions: {
			speed: 150,
			duration: 500
		},
	});
}