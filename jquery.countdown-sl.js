/* http://keith-wood.name/countdown.html
 * Slovenian localisation for the jQuery countdown extension
 * Written by Borut Tomažin (debijan{at}gmail.com) (2011)
 * updated by Jan Zavrl (jan@iuvo.si) (2015) */
(function($) {
	$.countdown.regionalOptions['sl'] = {
		// Plurals
		labels: ['Let', 'Mesecev', 'Tednov', 'Dni', 'Ur', 'Minut', 'Sekund'],
		// Singles
		labels1: ['Leto', 'Mesec', 'Teden', 'Dan', 'Ura', 'Minuta', 'Sekunda'],
		// Doubles
		labels2: ['Leti', 'Meseca', 'Tedna', 'Dneva', 'Uri', 'Minuti', 'Sekundi'],
		// 3's
		labels3: ['Leta', 'Meseci', 'Tedni', 'Dnevi', 'Ure', 'Minute', 'Sekunde'],
		// 4's
		labels4: ['Leta', 'Meseci', 'Tedni', 'Dnevi', 'Ure', 'Minute', 'Sekunde'],
		compactLabels: ['l', 'm', 't', 'd'],
		whichLabels: function(amount) {
			return (amount > 4 ? 0 : amount);
		},
		digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regionalOptions['sl']);
})(jQuery);
