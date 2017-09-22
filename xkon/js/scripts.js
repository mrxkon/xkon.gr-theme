(function($){

	$('ul.social-media-icons').prepend('<li>' +
		'<a href="https://profiles.wordpress.org/xkon">' +
		'<i class="fa fa-wordpress"></i>' +
		'</a>' +
		'</li>' +
		'<li>' +
		'<a href="https://github.com/mrxkon" target="_blank">' +
		'<i class="fa fa-github"></i>  ' +
		'</a>' +
		'</li>'
	);

	$('.tiled-gallery-item a').each(function(){
		$(this).prop('rel', 'gallery-1');
		$(this).addClass('swipebox');
	});

	$('.gallery a').each(function(){
		$(this).prop('rel', 'gallery-1');
		$(this).addClass('swipebox');
	});

	$('.swipebox').swipebox();

	$('article.page').addClass('post');
	$('article.post').removeClass('page');

	$('#single-content-container').addClass('blog-archive-container');
	$('#single-content-container').prop('id', 'page-content-container');

	$('.site-branding').remove();
	$('.site-branding-home').remove();

	$('#infinite-footer').remove();

	console.log('xkon > Hello there! :-)');

})(jQuery);