/* http://keith-wood.name/countdown.html
 * Hindi initialization for the jQuery countdown extension
 * Written by Venkatesh of Coacheagram.com (2021) */
(function($) {
	$.countdown.regionalOptions['hi'] = {
		labels: ['वर्षों', 'महीने', 'हफ्तों', 'दिन', 'घंटे', 'मिनट','सेकंड'],
		labels1: ['साल','महीना','सप्ताह','दिन','घंटा','मिनट', 'सेकंड'],
		compactLabels: ['सा', 'म', 'हफ', 'दि'],
		whichLabels: null,
		digits: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regionalOptions['hi']);
})(jQuery);