$(function() {
	clearInterval($.countdown._timer);
	var clock = sinon.useFakeTimers(new Date(2016, 7-1, 1, 12, 0, 0, 0).getTime());
	$.noRequestAnimationFrame = true; // Use setInterval which is faked by Sinon
	$.JQPlugin.createPlugin('countdown', { // Reinitialise
		name: 'countdown'
	});
	
	test('Set defaults', function() {
		expect(3);
		equal($.countdown.defaultOptions.alwaysExpire, false, 'Initial alwaysExpire');
		$.extend($.countdown.defaultOptions, {alwaysExpire: true});
		equal($.countdown.defaultOptions.alwaysExpire, true, 'Changed alwaysExpire');
		$.countdown.setDefaults({alwaysExpire: false});
		equal($.countdown.defaultOptions.alwaysExpire, false, 'Set defaults alwaysExpire');
	});

	test('UTC date', function() {
		expect(10);
		var time = new Date(2009, 1 - 1, 26, 11, 30);
		var offset = 600 + time.getTimezoneOffset(); // Brisbane GMT+10
		equalTime($.countdown.UTCDate(-time.getTimezoneOffset(), time),
			time, 'UTC date - local offset');
		equalTime($.countdown.UTCDate(+7, time),
			new Date(2009, 1 - 1, 26, 14, 30 - offset), 'UTC date - +7');
		equalTime($.countdown.UTCDate(+60, time),
			new Date(2009, 1 - 1, 26, 20, 30 - offset), 'UTC date - +60');
		equalTime($.countdown.UTCDate(-300, time),
			new Date(2009, 1 - 1, 27, 2, 30 - offset), 'UTC date - -300');
		equalTime($.countdown.UTCDate(-8, time),
			new Date(2009, 1 - 1, 27, 5, 30 - offset), 'UTC date - -8');
		equalTime($.countdown.UTCDate(-time.getTimezoneOffset(), 2009, 1 - 1, 26, 11, 30),
			time, 'UTC date - local offset');
		equalTime($.countdown.UTCDate(+7, 2009, 1 - 1, 26, 11, 30),
			new Date(2009, 1 - 1, 26, 14, 30 - offset), 'UTC date - +7');
		equalTime($.countdown.UTCDate(+60, 2009, 1 - 1, 26, 11, 30),
			new Date(2009, 1 - 1, 26, 20, 30 - offset), 'UTC date - +60');
		equalTime($.countdown.UTCDate(-300, 2009, 1 - 1, 26, 11, 30),
			new Date(2009, 1 - 1, 27, 2, 30 - offset), 'UTC date - -300');
		equalTime($.countdown.UTCDate(-8, 2009, 1 - 1, 26, 11, 30),
			new Date(2009, 1 - 1, 27, 5, 30 - offset), 'UTC date - -8');
	});

	test('Destroy', function() {
		expect(6);
		var cd = init();
		ok(typeof cd.data('countdown') !== 'undefined', 'Instance present');
		ok(cd.html() !== '', 'Content present');
		ok(cd.is('.is-countdown'), 'Marker class present');
		cd.countdown('destroy');
		cd = $('#cd');
		ok(typeof cd.data('countdown') === 'undefined', 'Instance gone');
		ok(cd.html() === '', 'Content gone');
		ok(!(cd.is('.is-countdown')), 'Marker class gone');
	});

	test('Content', function() {
		expect(23);
		var cd = init();
		equal(cd.text(), '0Hours0Minutes0Secondsdescr', 'Content - default');
		// Full
		cd.countdown('option', {until: +5, description: ''});
		equal(cd.text(), '0Hours0Minutes5Seconds', 'Content full - +5');
		cd.countdown('option', {until: +3665});
		equal(cd.text(), '1Hour1Minute5Seconds', 'Content full - +3665');
		cd.countdown('option', {until: +5, format: 'MS'});
		equal(cd.text(), '0Minutes5Seconds', 'Content full - +5 MS');
		cd.countdown('option', {until: +65, format: 'MS'});
		equal(cd.text(), '1Minute5Seconds', 'Content full - +65 MS');
		cd.countdown('option', {until: +5, format: 'S'});
		equal(cd.text(), '5Seconds', 'Content full - +5 S');
		cd.countdown('option', {until: +65, format: 'S'});
		equal(cd.text(), '65Seconds', 'Content full - +65 S');
		cd.countdown('option', {until: +5, format: 'M'});
		equal(cd.text(), '1Minute', 'Content full - +5 M');
		cd.countdown('option', {until: +65, format: 'M'});
		equal(cd.text(), '2Minutes', 'Content full - +65 M');
		cd.countdown('option', {until: +5, format: 'H'});
		equal(cd.text(), '1Hour', 'Content full - +5 H');
		cd.countdown('option', {until: +3665, format: 'H'});
		equal(cd.text(), '2Hours', 'Content full - +3665 H');
		cd.countdown('option', {until: '+1y+2o+3d+4h+5m+6s', format: 'yodHMS'});
		equal(cd.text(), '1Year2Months3Days4Hours5Minutes6Seconds', 'Content full - +1y+2o+3d+4h+5m+6s yodHMS');
		// Compact
		cd.countdown('option', {until: +5, compact: true, format: 'dHMS'});
		equal(cd.text(), '00:00:05', 'Content compact - +5');
		cd.countdown('option', {until: +3665});
		equal(cd.text(), '01:01:05', 'Content compact - +3665');
		cd.countdown('option', {until: +5, format: 'MS'});
		equal(cd.text(), '00:05', 'Content compact - +5 MS');
		cd.countdown('option', {until: +65, format: 'MS'});
		equal(cd.text(), '01:05', 'Content compact - +65 MS');
		cd.countdown('option', {until: +5, format: 'S'});
		equal(cd.text(), '05', 'Content compact - +5 S');
		cd.countdown('option', {until: +65, format: 'S'});
		equal(cd.text(), '65', 'Content compact - +65 S');
		cd.countdown('option', {until: +5, format: 'M'});
		equal(cd.text(), '01', 'Content compact - +5 M');
		cd.countdown('option', {until: +65, format: 'M'});
		equal(cd.text(), '02', 'Content compact - +65 M');
		cd.countdown('option', {until: +5, format: 'H'});
		equal(cd.text(), '01', 'Content compact - +5 H');
		cd.countdown('option', {until: +3665, format: 'H'});
		equal(cd.text(), '02', 'Content compact - +3665 H');
		cd.countdown('option', {until: '+1y+2o+3d+4h+5m+6s', format: 'yodHMS'});
		equal(cd.text(), '1y 2m 3d 04:05:06', 'Content compact - +1y+2o+3d+4h+5m+6s yodHMS');
	});

	test('Option', function() {
		expect(9);
		var cd = init();
		var inst = cd.data('countdown');
		equal(inst.options.description, 'descr', 'Default description - descr');
		cd.countdown('option', {description: 'abcdef'});
		equal(inst.options.description, 'abcdef', 'Change description - abcdef');
		$('#cd:first').countdown('option', {description: 'uvwxyz'});
		equal(inst.options.description, 'uvwxyz', 'Change description - uvwxyz');
		cd.countdown('option', {description: 'descr'});
		equal(inst.options.description, 'descr', 'Change description - descr');
		cd.countdown('option', 'description', 'abcdef');
		equal(inst.options.description, 'abcdef', 'Change description - abcdef');
		cd.countdown('option', 'description', 'descr');
		equal(inst.options.description, 'descr', 'Change description - descr');
		// Settings
		deepEqual(cd.countdown('option'),
			{labels: ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'],
			labels1: ['Year', 'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second'],
			compactLabels: ['y', 'm', 'w', 'd'], whichLabels: null,
			digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], timeSeparator: ':', isRTL: false,
			until: null, since: null, timezone: null, serverSync: null, format: 'dHMS',
			layout: '', compact: false, padZeroes: false, significant: 0, description: 'descr',
			expiryUrl: '', expiryText: '', alwaysExpire: false, onExpiry: null, 
			onTick: null, tickInterval: 1}, 'Settings - instance');
		equal(cd.countdown('option', 'description'), 'descr', 'Settings - description');
		equal(cd.countdown('option', 'layout'), '', 'Settings - layout');
	});

	test('Timezones', function() {
		expect(6);
		var cd = init();
		var inst = cd.data('countdown');
		var time = new Date();
		time.setHours(time.getHours() + 3);
		var offset = 600 + time.getTimezoneOffset(); // BNE GMT+10
		var timez = new Date();
		timez.setHours(timez.getHours() + 3);
		cd.countdown('option', {until: time});
		equalTime(inst._until, timez, 'Timezone - null');
		cd.countdown('option', {timezone: +7});
		timez.setHours(timez.getHours() + 3);
		timez.setMinutes(timez.getMinutes() - offset);
		equalTime(inst._until, timez, 'Timezone - +7');
		cd.countdown('option', {timezone: +240});
		timez.setHours(timez.getHours() + 3);
		equalTime(inst._until, timez, 'Timezone - +240');
		cd.countdown('option', {timezone: -2});
		timez.setHours(timez.getHours() + 6);
		equalTime(inst._until, timez, 'Timezone - -2');
		cd.countdown('option', {timezone: -480});
		timez.setHours(timez.getHours() + 6);
		equalTime(inst._until, timez, 'Timezone - -480');
		cd.countdown('option', {timezone: null});
		timez.setHours(timez.getHours() - 18);
		timez.setMinutes(timez.getMinutes() + offset);
		equalTime(inst._until, timez, 'Timezone - null');
	});

	test('Server sync', function() {
		expect(2);
		var cd = init();
		var inst = cd.data('countdown');
		var serverTime = function(offset) {
			return function() {
				var time = new Date();
				time.setMinutes(time.getMinutes() + offset);
				return time;
			};
		};
		var time = new Date();
		time.setHours(time.getHours() + 3);
		var timesync = new Date();
		timesync.setHours(timesync.getHours() + 3);
		timesync.setMinutes(timesync.getMinutes() - 5);
		cd.countdown('option', {until: time, serverSync: serverTime(+5)});
		equalTime(inst._until, timesync, 'Server sync - +5');
		timesync.setMinutes(timesync.getMinutes() + 10);
		cd.countdown('option', {until: time, serverSync: serverTime(-5)});
		equalTime(inst._until, timesync, 'Server sync - -5');
	});

	test('Server resync', function() {
		expect(3);
		var cd = init();
		var inst = cd.data('countdown');
		var offset = 0;
		var serverTime = function() {
			var time = new Date();
			time.setMinutes(time.getMinutes() + offset);
			return time;
		};
		var time = new Date();
		time.setHours(time.getHours() + 3);
		var timesync = new Date();
		timesync.setHours(timesync.getHours() + 3);
		cd.countdown('option', {until: time, serverSync: serverTime});
		equalTime(inst._until, timesync, 'Server resync - 0');
		offset = 10;
		timesync.setMinutes(timesync.getMinutes() - 10);
		$.countdown.resync();
		equalTime(inst._until, timesync, 'Server resync - +10');
		offset = -5;
		timesync.setMinutes(timesync.getMinutes() + 15);
		$.countdown.resync();
		equalTime(inst._until, timesync, 'Server resync - -5');
	});

	test('Until', function() {
		expect(19);
		var cd = init();
		var inst = cd.data('countdown');
		var now = new Date();
		equalTime(inst._until, now, 'Until - null');
		var until = new Date();
		until.setHours(until.getHours() + 1);
		cd.countdown('option', {until: until});
		equalTime(inst._until, until, 'Until - absolute +1H');
		// relative numeric
		until = new Date();
		until.setSeconds(until.getSeconds() + 200);
		cd.countdown('option', {until: +200});
		equalTime(inst._until, until, 'Until - +200');
		// relative alpha
		until = new Date();
		until.setSeconds(until.getSeconds() + 20);
		cd.countdown('option', {until: '+20s'});
		equalTime(inst._until, until, 'Until - +20s');
		until = new Date();
		until.setSeconds(until.getSeconds() + 40);
		cd.countdown('option', {until: ' +40 S '});
		equalTime(inst._until, until, 'Until - +40 S');
		until = new Date();
		until.setMinutes(until.getMinutes() + 10);
		cd.countdown('option', {until: '+10m'});
		equalTime(inst._until, until, 'Until - +10m');
		until = new Date();
		until.setMinutes(until.getMinutes() + 25);
		cd.countdown('option', {until: ' +25 M '});
		equalTime(inst._until, until, 'Until - +25 M');
		until = new Date();
		until.setHours(until.getHours() + 3);
		cd.countdown('option', {until: '+3h'});
		equalTime(inst._until, until, 'Until - +3h');
		until = new Date();
		until.setHours(until.getHours() + 15);
		cd.countdown('option', {until: ' +15 H '});
		equalTime(inst._until, until, 'Until - +15 H');
		until = new Date();
		until.setDate(until.getDate() + 4);
		cd.countdown('option', {until: '+4d'});
		equalTime(inst._until, until, 'Until - +4d');
		until = new Date();
		until.setDate(until.getDate() + 30);
		cd.countdown('option', {until: ' +30 D '});
		equalTime(inst._until, until, 'Until - +30 D');
		until = new Date();
		until.setDate(until.getDate() + 7 * 2);
		cd.countdown('option', {until: '+2w'});
		equalTime(inst._until, until, 'Until - +2w');
		until = new Date();
		until.setDate(until.getDate() + 7 * 10);
		cd.countdown('option', {until: ' +10 W '});
		equalTime(inst._until, until, 'Until - +10 W');
		until = new Date();
		until.setMonth(until.getMonth() + 2);
		cd.countdown('option', {until: '+2o'});
		equalTime(inst._until, until, 'Until - +2o');
		until = new Date();
		until.setMonth(until.getMonth() + 12);
		cd.countdown('option', {until: ' +12 O '});
		equalTime(inst._until, until, 'Until - +12 O');
		until = new Date();
		until.setFullYear(until.getFullYear() + 2);
		cd.countdown('option', {until: '+2y'});
		equalTime(inst._until, until, 'Until - +2y');
		until = new Date();
		until.setFullYear(until.getFullYear() + 5);
		cd.countdown('option', {until: ' +5 Y '});
		equalTime(inst._until, until, 'Until - +5 Y');
		until = new Date();
		until.setDate(until.getDate() + 7 * 2);
		until.setHours(until.getHours() + 2);
		cd.countdown('option', {until: '+2w +2h'});
		equalTime(inst._until, until, 'Until - +2w +2h');
		until = new Date();
		until.setFullYear(until.getFullYear() + 5);
		until.setMonth(until.getMonth() + 1);
		cd.countdown('option', {until: ' +5 Y  +1 O'});
		equalTime(inst._until, until, 'Until - until +5 Y +1 O');
		// reset
		cd.countdown('option', {until: null});
	});

	test('Since', function() {
		expect(20);
		var cd = init();
		var inst = cd.data('countdown');
		var now = new Date();
		ok(inst._since === null, 'Since - null');
		var since = new Date();
		since.setHours(since.getHours() - 1);
		cd.countdown('option', {since: since});
		equalTime(inst._since, since, 'Since - absolute -1H');
		// relative numeric
		since = new Date();
		cd.countdown('option', {since: 0});
		equalTime(inst._since, since, 'Since - 0');
		since.setSeconds(since.getSeconds() - 200);
		cd.countdown('option', {since: -200});
		equalTime(inst._since, since, 'Since - -200');
		// relative alpha
		since = new Date();
		since.setSeconds(since.getSeconds() - 20);
		cd.countdown('option', {since: '-20s'});
		equalTime(inst._since, since, 'Since - -20s');
		since = new Date();
		since.setSeconds(since.getSeconds() - 40);
		cd.countdown('option', {since: ' -40 S '});
		equalTime(inst._since, since, 'Since - -40 S');
		since = new Date();
		since.setMinutes(since.getMinutes() - 10);
		cd.countdown('option', {since: '-10m'});
		equalTime(inst._since, since, 'Since - -10m');
		since = new Date();
		since.setMinutes(since.getMinutes() - 25);
		cd.countdown('option', {since: ' -25 M '});
		equalTime(inst._since, since, 'Since - -25 M');
		since = new Date();
		since.setHours(since.getHours() - 3);
		cd.countdown('option', {since: '-3h'});
		equalTime(inst._since, since, 'Since - -3h');
		since = new Date();
		since.setHours(since.getHours() - 15);
		cd.countdown('option', {since: ' -15 H '});
		equalTime(inst._since, since, 'Since - -15 H');
		since = new Date();
		since.setDate(since.getDate() - 4);
		cd.countdown('option', {since: '-4d'});
		equalTime(inst._since, since, 'Since - -4d');
		since = new Date();
		since.setDate(since.getDate() - 30);
		cd.countdown('option', {since: ' -30 D '});
		equalTime(inst._since, since, 'Since - -30 D');
		since = new Date();
		since.setDate(since.getDate() - 7 * 2);
		cd.countdown('option', {since: '-2w'});
		equalTime(inst._since, since, 'Since - -2w');
		since = new Date();
		since.setDate(since.getDate() - 7 * 10);
		cd.countdown('option', {since: ' -10 W '});
		equalTime(inst._since, since, 'Since - -10 W');
		since = new Date();
		since.setMonth(since.getMonth() - 2);
		cd.countdown('option', {since: '-2o'});
		equalTime(inst._since, since, 'Since - -2o');
		since = new Date();
		since.setMonth(since.getMonth() - 12);
		cd.countdown('option', {since: ' -12 O '});
		equalTime(inst._since, since, 'Since - -12 O');
		since = new Date();
		since.setFullYear(since.getFullYear() - 2);
		cd.countdown('option', {since: '-2y'});
		equalTime(inst._since, since, 'Since - -2y');
		since = new Date();
		since.setFullYear(since.getFullYear() - 5);
		cd.countdown('option', {since: ' -5 Y '});
		equalTime(inst._since, since, 'Since - -5 Y');
		since = new Date();
		since.setDate(since.getDate() - 7 * 2);
		since.setHours(since.getHours() - 2);
		cd.countdown('option', {since: '-2w -2h'});
		equalTime(inst._since, since, 'Since - -2w -2h');
		since = new Date();
		since.setFullYear(since.getFullYear() - 5);
		since.setMonth(since.getMonth() - 1);
		cd.countdown('option', {since: ' -5 Y  -1 O'});
		equalTime(inst._since, since, 'Since - -5 Y -1 O');
		// reset
		cd.countdown('option', {since: null});
	});

	test('Get', function() {
		expect(2);
		var cd = init();
		var inst = cd.data('countdown');
		equal($.countdown.defaultOptions.description, '', 'Default description');
		equal(inst.options.description, 'descr', 'Instance description');
	});

	test('Get times', function() {
		expect(7);
		var cd = init();
		var inst = cd.data('countdown');
		cd.countdown('option', {format: 'YOWDHMS'});
		deepEqual(cd.countdown('getTimes'), [0, 0, 0, 0, 0, 0, 0], 'Get time - nothing set');
		cd.countdown('option', {until: '+1y +2o +3w +4d +5h +6m +7s'});
		deepEqual(cd.countdown('getTimes'), [1, 2, 3, 4, 5, 6, 7], 'Get time - until +1y +2o +3w +4d +5h +6m +7s');
		cd.countdown('option', {until: '+1y +3w +5h +7s'});
		deepEqual(cd.countdown('getTimes'), [1, 0, 3, 0, 5, 0, 7], 'Get time - until +1y +3w +5h +7s');
		cd.countdown('option', {until: '+2o +4d +6m'});
		deepEqual(cd.countdown('getTimes'), [0, 2, 0, 4, 0, 6, 0], 'Get time - until +2o +4d +6m');
		cd.countdown('option', {since: '-1y -2o -3w -4d -5h -6m -7s'});
		deepEqual(cd.countdown('getTimes'), [1, 2, 3, 4, 5, 6, 7], 'Get time - since -1y -2o -3w -4d -5h -6m -7s');
		cd.countdown('option', {since: '-1y -3w -5h -7s'});
		deepEqual(cd.countdown('getTimes'), [1, 0, 3, 0, 5, 0, 7], 'Get time - since -1y -3w -5h -7s');
		cd.countdown('option', {since: '-2o -4d -6m'});
		deepEqual(cd.countdown('getTimes'), [0, 2, 0, 4, 0, 6, 0], 'Get time - since -2o -4d -6m');
	});

	test('Calculate periods', function() {
		expect(38);
		var cd = init();
		var inst = cd.data('countdown');
		// Until
		cd.countdown('option', {until: '+1y +2o +3d +4h +5m +6s'});
		var now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('yodHMS'), 0, now),
			[1, 2, 0, 3, 4, 5, 6],
			'Calculate periods - yodHMS until +1y +2o +3d +4h +5m +6s');
		now.setMilliseconds(0);
		var days = Math.floor((inst._until.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('YODHMS'), 0, now),
			[1, 2, 0, 3, 4, 5, 6],
			'Calculate periods - YODHMS until +1y +2o +3d +4h +5m +6s');
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('odHMS'), 0, now),
			[0, 14, 0, 3, 4, 5, 6],
			'Calculate periods - odHMS until +1y +2o +3d +4h +5m +6s');
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('wHMS'), 0, now),
			[0, 0, Math.floor(days / 7), 0, (days % 7) * 24 + 4, 5, 6],
			'Calculate periods - wHMS until +1y +2o +3d +4h +5m +6s');
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('dHMS'), 0, now),
			[0, 0, 0, days, 4, 5, 6],
			'Calculate periods - dHMS until +1y +2o +3d +4h +5m +6s');
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('hms'), 0, now),
			[0, 0, 0, 0, days * 24 + 4, 5, 6],
			'Calculate periods - hms until +1y +2o +3d +4h +5m +6s');
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('MS'), 0, now),
			[0, 0, 0, 0, 0, (days * 24 + 4) * 60 + 5, 6],
			'Calculate periods - MS until +1y +2o +3d +4h +5m +6s');
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('s'), 0, now),
			[0, 0, 0, 0, 0, 0, ((days * 24 + 4) * 60 + 5) * 60 + 6],
			'Calculate periods - s until +1y +2o +3d +4h +5m +6s');
		now = new Date();
		now.setFullYear(now.getFullYear() + 1);
		now.setMilliseconds(0);
		days = Math.floor((inst._until.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('YDS'), 0, now),
			[1, 0, 0, days, 0, 0, 14706],
			'Calculate periods - YDS until +1y +2o +3d +4h +5m +6s');
		cd.countdown('option', {until: new Date(2009, 7 - 1, 20)});
		now = new Date(2009, 4 - 1, 20, 11);
		deepEqual($.countdown._calculatePeriods(inst, generateShow('OWDHM'), 0, now),
			[0, 2, 4, 1, 13, 0, 0],
			'Calculate periods - OWDHM until start of today + 3 months');
		cd.countdown('option', {until: new Date(2009, 6 - 1, 30)});
		now = new Date(2009, 3 - 1, 31);
		deepEqual($.countdown._calculatePeriods(inst, generateShow('OWDHM'), 0, now),
			[0, 3, 0, 0, 0, 0, 0],
			'Calculate periods - OWDHM until 31/03 to 30/06');
		now = new Date(2009, 3 - 1, 31, 11);
		deepEqual($.countdown._calculatePeriods(inst, generateShow('OWDHM'), 0, now),
			[0, 2, 4, 1, 13, 0, 0],
			'Calculate periods - OWDHM until 31/03 11:00 to 30/06 00:00');
		cd.countdown('option', {until: new Date(2009, 8 - 1, 31)});
		now = new Date(2009, 6 - 1, 30);
		deepEqual($.countdown._calculatePeriods(inst, generateShow('OWDHM'), 0, now),
			[0, 2, 0, 0, 0, 0, 0],
			'Calculate periods - OWDHM until 30/06 to 31/08');
		now = new Date(2009, 6 - 1, 30, 11);
		deepEqual($.countdown._calculatePeriods(inst, generateShow('OWDHM'), 0, now),
			[0, 1, 4, 2, 13, 0, 0],
			'Calculate periods - OWDHM until 30/06 11:00 to 31/08 00:00');
		// With rounding
		cd.countdown('option', {until: '13d 23h 59m 10s', format: 'YOWDHM'});
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('YOWDHM'), 0, now),
			[0, 0, 2, 0, 0, 0, 0],
			'Calculate periods - YOWDHM until 13d 23h 59m 10s');
		cd.countdown('option', {until: '13d 23h 59m -10s', format: 'YOWDHM'});
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('YOWDHM'), 0, now),
			[0, 0, 1, 6, 23, 59, 0],
			'Calculate periods - YOWDHM until 13d 23h 59m -10s');
		cd.countdown('option', {until: '13d 23h 10s', format: 'YOWDH'});
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('YOWDH'), 0, now),
			[0, 0, 2, 0, 0, 0, 0],
			'Calculate periods - YOWDH until 13d 23h 10s');
		cd.countdown('option', {until: '13d 23h -10s', format: 'YOWDH'});
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('YOWDH'), 0, now),
			[0, 0, 1, 6, 23, 0, 0],
			'Calculate periods - YOWDH until 13d 23h -10s');
		cd.countdown('option', {until: '13d 23h 59m 10s', format: 'YOWDM'});
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('YOWDM'), 0, now),
			[0, 0, 2, 0, 0, 0, 0],
			'Calculate periods - YOWDM until 13d 23h 59m 10s');
		cd.countdown('option', {until: '13d 23h 59m -10s', format: 'YOWDM'});
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('YOWDM'), 0, now),
			[0, 0, 1, 6, 0, 1439, 0],
			'Calculate periods - YOWDM until 13d 23h 59m -10s');
		cd.countdown('option', {until: '13d 23h 59m 10s', format: 'YOWD'});
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('YOWD'), 0, now),
			[0, 0, 2, 0, 0, 0, 0],
			'Calculate periods - YOWD until 13d 23h 59m 10s');
		cd.countdown('option', {until: '13d 23h 59m -10s', format: 'YOWD'});
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('YOWD'), 0, now),
			[0, 0, 2, 0, 0, 0, 0],
			'Calculate periods - YOWD until 13d 23h 59m -10s');
		// Since
		cd.countdown('option', {since: '-1y -2o -3d -4h -5m -6s', until: null});
		var now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('yodHMS'), 0, now),
			[1, 2, 0, 3, 4, 5, 6],
			'Calculate periods - yodHMS since -1y -2o -3d -4h -5m -6s');
		now.setMilliseconds(0);
		days = Math.floor((now.getTime() - inst._since.getTime()) / (24 * 60 * 60 * 1000));
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('YODHMS'), 0, now),
			[1, 2, 0, 3, 4, 5, 6],
			'Calculate periods - YODHMS since -1y -2o -3d -4h -5m -6s');
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('odHMS'), 0, now),
			[0, 14, 0, 3, 4, 5, 6],
			'Calculate periods - odHMS since -1y -2o -3d -4h -5m -6s');
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('wHMS'), 0, now),
			[0, 0, Math.floor(days / 7), 0, (days % 7) * 24 + 4, 5, 6],
			'Calculate periods - wHMS since -1y -2o -3d -4h -5m -6s');
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('dHMS'), 0, now),
			[0, 0, 0, days, 4, 5, 6],
			'Calculate periods - dHMS since -1y -2o -3d -4h -5m -6s');
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('hms'), 0, now),
			[0, 0, 0, 0, days * 24 + 4, 5, 6],
			'Calculate periods - hms since -1y -2o -3d -4h -5m -6s');
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('MS'), 0, now),
			[0, 0, 0, 0, 0, (days * 24 + 4) * 60 + 5, 6],
			'Calculate periods - MS since -1y -2o -3d -4h -5m -6s');
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('s'), 0, now), 
			[0, 0, 0, 0, 0, 0, ((days * 24 + 4) * 60 + 5) * 60 + 6],
			'Calculate periods - s since -1y -2o -3d -4h -5m -6s');
		now = new Date();
		now.setHours(0);
		now.setMinutes(0);
		now.setSeconds(0);
		now.setMilliseconds(0);
		var then = new Date(inst._since.getTime());
		then.setFullYear(then.getFullYear() + 1);
		then.setHours(0);
		then.setMinutes(0);
		then.setSeconds(0);
		then.setMilliseconds(0);
		days = Math.ceil((now.getTime() - then.getTime()) / (24 * 60 * 60 * 1000));
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('YDS'), 0, now),
			[1, 0, 0, days, 0, 0, 14706],
			'Calculate periods - YDS since -1y -2o -3d -4h -5m -6s');
		cd.countdown('option', {since: new Date(2009, 4 - 1, 20, 11)});
		now = new Date(2009, 7 - 1, 20);
		deepEqual($.countdown._calculatePeriods(inst, generateShow('OWDHM'), 0, now),
			[0, 2, 4, 1, 13, 0, 0],
			'Calculate periods - OWDHM since start of today - 3 months');
		cd.countdown('option', {since: new Date(2009, 7 - 1, 31)});
		now = new Date(2009, 9 - 1, 30);
		deepEqual($.countdown._calculatePeriods(inst, generateShow('OWDHM'), 0, now),
			[0, 2, 0, 0, 0, 0, 0],
			'Calculate periods - OWDHM since 31/07 to 30/09');
		cd.countdown('option', {since: new Date(2009, 7 - 1, 31, 11)});
		deepEqual($.countdown._calculatePeriods(inst, generateShow('OWDHM'), 0, now),
			[0, 1, 4, 1, 13, 0, 0],
			'Calculate periods - OWDHM since 31/07 11:00 to 30/09 00:00');
		cd.countdown('option', {since: new Date(2009, 6 - 1, 30)});
		now = new Date(2009, 8 - 1, 31);
		deepEqual($.countdown._calculatePeriods(inst, generateShow('OWDHM'), 0, now),
			[0, 2, 0, 0, 0, 0, 0],
			'Calculate periods - OWDHM since 30/06 to 31/08');
		cd.countdown('option', {since: new Date(2009, 6 - 1, 30, 11)});
		deepEqual($.countdown._calculatePeriods(inst, generateShow('OWDHM'), 0, now),
			[0, 1, 4, 2, 13, 0, 0],
			'Calculate periods - OWDHM since 30/06 11:00 to 31/08 00:00');
		// With rounding
		cd.countdown('option', {since: '-13d -23h -59m 10s', format: 'YOWDHM'});
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('YOWDHM'), 0, now),
			[0, 0, 1, 6, 23, 58, 0],
			'Calculate periods - YOWDHM since -13d -23h -59m 10s');
		cd.countdown('option', {since: '-13d -23h -59m -10s', format: 'YOWDHM'});
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('YOWDHM'), 0, now),
			[0, 0, 1, 6, 23, 59, 0],
			'Calculate periods - YOWDHM since -13d -23h -59m -10s');
	});

	test('Significant', function() {
		expect(11);
		var cd = init({format: 'yowdHMS', description: ''});
		var inst = cd.data('countdown');
		// Until
		cd.countdown('option', {until: '+1y +2o +3d +4h +5m +6s', significant: 2});
		var now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('yodHMS'), 2, now),
			[1, 2, 0, 0, 0, 0, 0],
			'Significant periods - 2 yodHMS until +1y +2o +3d +4h +5m +6s');
		equal(cd.text(), '1Year2Months', 'Significant text - 2');
		cd.countdown('option', {until: '+1y +2o +3d +4h +5m +6s', significant: 3});
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('yodHMS'), 3, now),
			[1, 2, 0, 3, 0, 0, 0],
			'Significant periods - 3 yodHMS until +1y +2o +3d +4h +5m +6s');
		equal(cd.text(), '1Year2Months3Days', 'Significant text - 3');
		cd.countdown('option', {until: '+4h', significant: 2});
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('yodHMS'), 2, now),
			[0, 0, 0, 0, 4, 0, 0],
			'Significant periods - 2 yodHMS until +4h');
		equal(cd.text(), '4Hours0Seconds', 'Significant text - 2');
		cd.countdown('option', {until: '+4h', format: 'dHM', significant: 2});
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('dHM'), 2, now),
			[0, 0, 0, 0, 4, 0, 0],
			'Significant periods - 2 dHM until +4h');
		equal(cd.text(), '4Hours0Minutes', 'Significant text - 2');
		cd.countdown('option', {until: '+4h', format: 'dHM', significant: 3});
		now = new Date();
		deepEqual($.countdown._calculatePeriods(inst, generateShow('dHM'), 3, now),
			[0, 0, 0, 0, 4, 0, 0],
			'Significant periods - 3 dHM until +4h');
		equal(cd.text(), '0Days4Hours0Minutes', 'Significant text - 3');
		cd.countdown('option', {until: '+1y +2o +3d +4h +5m +6s', format: 'yodHMS', significant: 3,
			layout: '{y<}{yn} {yl} {y>}{o<}{on} {ol} {o>}{w<}{wn} {wl} {w>}' +
			'{d<}{dn} {dl} {d>}{h<}{hn} {hl} {h>}{m<}{mn} {ml} {m>}{s<}{sn} {sl}{s>}'});
		now = new Date();
		equal(cd.text(), '1 Year 2 Months 3 Days ', 'Significant layout - 3');
	});

	test('Periods to seconds', function() {
		expect(3);
		equal($.countdown.periodsToSeconds([0, 0, 0, 0, 1, 2, 3]), 3723,
			'Periods to seconds - 0, 0, 0, 0, 1, 2, 3');
		equal($.countdown.periodsToSeconds([0, 0, 1, 2, 0, 0, 0]), 777600,
			'Periods to seconds - 0, 0, 1, 2, 0, 0, 0');
		equal($.countdown.periodsToSeconds([1, 2, 0, 3, 4, 5, 6]), 37091106,
			'Periods to seconds - 1, 2, 0, 3, 4, 5, 6');
	});

	test('Layouts', function() {
		expect(16);
		var cd = init();
		var inst = cd.data('countdown');
		var show = generateShow('YODHMS');
		cd.countdown('option', {until: '+1y +2o +3d +4h +5m +6s',
			format: 'YODHMS', description: 'until then'});
		equal($.countdown._buildLayout(inst, show, '{yn} {yl}', false),
			'1 Year', 'Layout - {yn} {yl}');
		equal($.countdown._buildLayout(inst, show, '{on} {ol}', false),
			'2 Months', 'Layout - {on} {ol}');
		equal($.countdown._buildLayout(inst, show, '{wn} {wl}', false),
			'0 Weeks', 'Layout - {wn} {wl}');
		equal($.countdown._buildLayout(inst, show, '{dn} {dl}', false),
			'3 Days', 'Layout - {dn} {dl}');
		equal($.countdown._buildLayout(inst, show, '{hn} {hl}', false),
			'4 Hours', 'Layout - {hn} {hl}');
		equal($.countdown._buildLayout(inst, show, '{mn} {ml}', false),
			'5 Minutes', 'Layout - {mn} {ml}');
		equal($.countdown._buildLayout(inst, show, '{sn} {sl}', false),
			'6 Seconds', 'Layout - {sn} {sl}');
		equal($.countdown._buildLayout(inst, show, '{yn} {yl}, {on} {ol}, {dn} {dl}, ' +
			'{hn} {hl}, {mn} {ml}, {sn} {sl}', false),
			'1 Year, 2 Months, 3 Days, 4 Hours, 5 Minutes, 6 Seconds',
			'Layout - {yn} {yl}, {on} {ol}, {dn} {dl}, {hn} {hl}, {mn} {ml}, {sn} {sl}');
		equal($.countdown._buildLayout(inst, show, '{ynn} {yl} + {onn} {ol} + {dnn} {dl} and ' +
			'{hnn} {hl}:{mnn} {ml}:{snn} {sl}', false),
			'01 Year + 02 Months + 03 Days and 04 Hours:05 Minutes:06 Seconds',
			'Layout - {ynn} {yl} + {onn} {ol} + {dnn} {dl} and ' +
			'{hnn} {hl}:{mnn} {ml}:{snn} {sl}');
		equal($.countdown._buildLayout(inst, show, '{ynnn} {yl} + {onnn} {ol} + {dnnn} {dl} and ' +
			'{hnnn} {hl}:{mnnn} {ml}:{snnn} {sl}', false),
			'001 Year + 002 Months + 003 Days and 004 Hours:005 Minutes:006 Seconds',
			'Layout - {ynnn} {yl} + {onnn} {ol} + {dnnn} {dl} and ' +
			'{hnnn} {hl}:{mnnn} {ml}:{snnn} {sl}');
		equal($.countdown._buildLayout(inst, show,
			'<ul><li>{yn} {yl}</li><li>{on} {ol}</li><li>{dn} {dl}</li>' +
			'<li>{hn} {hl}</li><li>{mn} {ml}</li><li>{sn} {sl}</li></ul>', false),
			'<ul><li>1 Year</li><li>2 Months</li><li>3 Days</li>' +
			'<li>4 Hours</li><li>5 Minutes</li><li>6 Seconds</li></ul>',
			'Layout - <ul><li>{yn} {yl}</li><li>{on} {ol}</li><li>{dn} {dl}</li>' +
			'<li>{hn} {hl}</li><li>{mn} {ml}</li><li>{sn} {sl}</li></ul>');
		equal($.countdown._buildLayout(inst, show,
			'{hn} {hl}, {mn} {ml}, {sn} {sl} ({hnn}:{mnn}:{snn})', false),
			'4 Hours, 5 Minutes, 6 Seconds (04:05:06)',
			'Layout - {hn} {hl}, {mn} {ml}, {sn} {sl} ({hnn}:{mnn}:{snn})');
		cd.countdown('option', {compactLabels1: ['Yr', 'Mn', 'W', 'Dy']});
		equal($.countdown._buildLayout(inst, show, '{yn} {yl}, {on} {ol}, {dn} {dl}, ' +
			'{hnn}{sep}{mnn}{sep}{snn} {desc}', true),
			'1 Yr, 2 m, 3 d, 04:05:06 until then',
			'Layout - {yn} {yl}, {on} {ol}, {dn} {dl}, {hnn}{sep}{mnn}{sep}{snn} {desc}');
		show = generateShow('OHMS');
		cd.countdown('option', {format: 'OHMS'});
		equal($.countdown._buildLayout(inst, show, '{y<}{yn} {yl}, {y>}{o<}{on} {ol}, {o>}{d<}{dn} {dl}, {d>}' +
			'{h<}{hn} {hl}, {h>}{m<}{mn} {ml}, {m>}{s<}{sn} {sl}{s>}', false),
			'14 Months, 76 Hours, 5 Minutes, 6 Seconds',
			'Layout - {y<}{yn} {yl}, {y>}{o<}{on} {ol}, {o>}{d<}{dn} {dl}, {d>}' +
			'{h<}{hn} {hl}, {h>}{m<}{mn} {ml}, {m>}{s<}{sn} {sl}{s>}');
		show = generateShow('YODHMS');
		cd.countdown('option', {format: 'YODHMS', until: '+123y +2o +15d +16h +37m +48s'});
		equal($.countdown._buildLayout(inst, show,
			'{y100} {y10} {y1} {o100} {o10} {o1} {w100} {w10} {w1} {d100} {d10} {d1} ' +
			'{h100} {h10} {h1} {m100} {m10} {m1} {s100} {s10} {s1}', false),
			'1 2 3 0 0 2 0 0 0 0 1 5 0 1 6 0 3 7 0 4 8',
			'Layout - {y100} {y10} {y1} {o100} {o10} {o1} {w100} {w10} {w1} ' +
			'{d100} {d10} {d1} {h100} {h10} {h1} {m100} {m10} {m1} {s100} {s10} {s1}');
		equal($.countdown._buildLayout(inst, show, '{} {x100} {xn} {xl}', false),
			'{} {x100} {xn} {xl}', 'Layout - {} {x100} {xn} {xl}');
	});

	test('Labels', function() {
		expect(4);
		var cd = init();
		var plurals2 = ['Y2ars', 'M2nths', 'W2eks', 'D2ys', 'H2urs', 'M2nutes', 'S2conds'];
		var plurals3 = ['Y3ars', 'M3nths', 'W3eks', 'D3ys', 'H3urs', 'M3nutes', 'S3conds'];
		cd.countdown('option', {until: '+1y+2o+3d+4h+5m+6s',
			format: 'yodHMS', description: ''});
		equal(cd.text(), '1Year2Months3Days4Hours5Minutes6Seconds',
			'Labels standard - +1y+2o+3d+4h+5m+6s yodHMS');
		cd.countdown('option', {until: '+1y+2o+3d+4h+5m+6s',
			labels2: plurals2, labels3: plurals3});
		equal(cd.text(), '1Year2M2nths3D3ys4Hours5Minutes6Seconds',
			'Labels custom - +1y+2o+3d+4h+5m+6s yodHMS');
		cd.countdown('option', {until: '+1y+2o+3d+4h+5m+6s',
			labels: $.countdown.defaultOptions.labels});
		equal(cd.text(), '1Year2Months3Days4Hours5Minutes6Seconds',
			'Labels reset - +1y+2o+3d+4h+5m+6s yodHMS');
		cd.countdown('option', {until: '+1y+2o+3d+4h+5m+6s',
			labels2: plurals2, labels3: plurals3,
			whichLabels: function(amount) { return amount % 2 + 2; }});
		equal(cd.text(), '1Y3ars2M2nths3D3ys4H2urs5M3nutes6S2conds',
			'Labels which - +1y+2o+3d+4h+5m+6s yodHMS');
	});

	test('Digits', function() {
		expect(3);
		var cd = init({digits: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']});
		cd.countdown('option', {until: '+1y+2o+3d+4h+5m+6s',
			format: 'yodHMS', description: ''});
		equal(cd.text(), 'BYearCMonthsDDaysEHoursFMinutesGSeconds',
			'Digits - +1y+2o+3d+4h+5m+6s yodHMS');
		cd.countdown('option', {until: '+1y+2o+3d+4h+5m+6s', compact: true});
		equal(cd.text(), 'By Cm Dd AE:AF:AG',
			'Digits compact - +1y+2o+3d+4h+5m+6s yodHMS');
		cd.countdown('option', {until: '+1y+2o+3d+4h+5m+6s',
			layout: '{ynnn} {onn} {dn} {h10}{h1}:{m10}{m1}:{s10}{s1}'});
		equal(cd.text(), 'AAB AC D AE:AF:AG',
			'Digits layout - +1y+2o+3d+4h+5m+6s yodHMS');
	});

	test('Expiry', function() {
		expect(4);
		var expired = false;
		var doExpiry = function() {
			expired = true;
		};
		var cd = init({onExpiry: doExpiry, alwaysExpire: true, description: ''});
		equal(expired, true, 'Expiry - onExpiry');
		equal(cd.text(), '0Hours0Minutes0Seconds', 'Expiry - no expiryText');
		expired = false;
		cd.countdown('option', {onExpiry: null, expiryText: 'All over'});
		equal(expired, false, 'Expiry - no onExpiry');
		equal(cd.text(), 'All over', 'Expiry - expiryText');
	});

	test('Pause', function() {
		expect(4);
		var cd = init({until: +5, description: ''});
		equal(cd.text(), '0Hours0Minutes5Seconds', 'Pause - initial');
		clock.tick(1000);
		equal(cd.text(), '0Hours0Minutes4Seconds', 'Pause - tick');
		cd.countdown('pause');
		clock.tick(2000);
		equal(cd.text(), '0Hours0Minutes4Seconds', 'Pause - paused');
		cd.countdown('resume');
		clock.tick(2000);
		equal(cd.text(), '0Hours0Minutes2Seconds', 'Pause - resumed');
	});

	test('Pause toggle', function() {
		expect(4);
		var cd = init({until: +5, description: ''});
		equal(cd.text(), '0Hours0Minutes5Seconds', 'Pause toggle - initial');
		clock.tick(1000);
		equal(cd.text(), '0Hours0Minutes4Seconds', 'Pause toggle - tick');
		cd.countdown('toggle');
		clock.tick(2000);
		equal(cd.text(), '0Hours0Minutes4Seconds', 'Pause toggle - paused');
		cd.countdown('toggle');
		clock.tick(2000);
		equal(cd.text(), '0Hours0Minutes2Seconds', 'Pause toggle - resumed');
	});

	test('Lap', function() {
		expect(4);
		var cd = init({until: +5, description: ''});
		equal(cd.text(), '0Hours0Minutes5Seconds', 'Lap - initial');
		clock.tick(1000);
		equal(cd.text(), '0Hours0Minutes4Seconds', 'Lap - tick');
		cd.countdown('lap');
		clock.tick(2000);
		equal(cd.text(), '0Hours0Minutes4Seconds', 'Lap - paused');
		cd.countdown('resume');
		clock.tick(2000);
		equal(cd.text(), '0Hours0Minutes0Seconds', 'Lap - resumed');
	});

	test('Lap toggle', function() {
		expect(4);
		var cd = init({until: +5, description: ''});
		equal(cd.text(), '0Hours0Minutes5Seconds', 'Lap toggle - initial');
		clock.tick(1000);
		equal(cd.text(), '0Hours0Minutes4Seconds', 'Lap toggle - tick');
		cd.countdown('toggleLap');
		clock.tick(2000);
		equal(cd.text(), '0Hours0Minutes4Seconds', 'Lap toggle - paused');
		cd.countdown('toggleLap');
		clock.tick(2000);
		equal(cd.text(), '0Hours0Minutes0Seconds', 'Lap toggle - resumed');
	});

	function init(settings) {
		if ($('#cd').hasClass('is-countdown')) {
			$('#cd').countdown('destroy');
		}
		return $('#cd').countdown($.extend({description: 'descr'}, settings || {}));
	}

	function generateShow(format) {
		var show = [];
		show[0] = (format.match('y') ? '?' : (format.match('Y') ? '!' : null));
		show[1] = (format.match('o') ? '?' : (format.match('O') ? '!' : null));
		show[2] = (format.match('w') ? '?' : (format.match('W') ? '!' : null));
		show[3] = (format.match('d') ? '?' : (format.match('D') ? '!' : null));
		show[4] = (format.match('h') ? '?' : (format.match('H') ? '!' : null));
		show[5] = (format.match('m') ? '?' : (format.match('M') ? '!' : null));
		show[6] = (format.match('s') ? '?' : (format.match('S') ? '!' : null));
		return show;
	}

	function equalTime(time1, time2, msg) {
		if (typeof time1 === 'undefined' || time1 === null || typeof time2 === 'undefined' || time2 === null) {
			ok(false, msg + ' - null time');
			return;
		}
		time1.setMilliseconds(0);
		time2.setMilliseconds(0);
		equal(time1.toString(), time2.toString(), msg);
	}
});	
