/**
* http://keith-wood.name/countdown.html
* Croatian l10n for the jQuery countdown plugin
* Written by Dejan Broz info@hqfactory.com (2011)
* Improved by zytzagoo (2014)
*/
(function($) {
	var PLURAL_FORM_REST = 0;
	var PLURAL_FORM_SINGLE = 1;
	var PLURAL_FORM_PAUCAL = 2;
	var determine_plural_form = function(amount) {
		amount = parseInt(amount, 10);
		// assume default plural (most common case)
		var plural_form = PLURAL_FORM_REST;
		if (amount % 10 === 1 && amount % 100 !== 11) {
			// singles (/.*1$/ && ! /.*11$/)
			plural_form = PLURAL_FORM_SINGLE;
		}
		if ((amount % 10 >= 2) && (amount % 10 <= 4) && (amount % 100 < 10 || amount % 100 >= 20)) {
			// paucals (/.*[234]$/ && ! /.*1[234]$/
			plural_form = PLURAL_FORM_PAUCAL;
		}
		return plural_form;
	};
	$.countdown.regionalOptions['hr'] = {
		// plurals
		labels: ['Godina', 'Mjeseci', 'Tjedana', 'Dana', 'Sati', 'Minuta', 'Sekundi'],
		// singles
		labels1: ['Godina', 'Mjesec', 'Tjedan', 'Dan', 'Sat', 'Minutu', 'Sekundu'],
		// paucals
		labels2: ['Godine', 'Mjeseca', 'Tjedana', 'Dana', 'Sata', 'Minute', 'Sekunde'],
		compactLabels: ['g', 'm', 't', 'd'],
		whichLabels: function(amount){
			return determine_plural_form(amount);
		},
		digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regionalOptions['hr']);
})(jQuery);
