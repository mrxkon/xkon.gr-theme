<?php

/*-----------------------------------------------------------------------------------*/
/* Styles & Scripts
/*-----------------------------------------------------------------------------------*/
function xkon_enqueue_styles() {
	wp_enqueue_style( 'dashicons' );
	$sp_min_sb_css = ( defined( 'WP_DEBUG' ) && WP_DEBUG ) ? '/css/swipebox.css' : '/css/swipebox.min.css';
	wp_enqueue_style( 'simplespace-swipebox', get_stylesheet_directory_uri() . $sp_min_sb_css, array(), '1.0.0' );
	$sp_min_sb_js = ( defined( 'WP_DEBUG' ) && WP_DEBUG ) ? '/js/jquery.swipebox.js' : '/js/jquery.swipebox.min.js';
	wp_enqueue_script( 'simplespace-swipebox', get_stylesheet_directory_uri() . $sp_min_sb_js, array( 'jquery' ), '1.0.0', true );
	wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
	wp_enqueue_script( 'scripts', get_stylesheet_directory_uri() . '/js/scripts.js', array( 'jquery' ), '1.0.0', true );

	if ( is_front_page() ) {
		wp_enqueue_script( 'vivus', get_stylesheet_directory_uri() . '/js/vivus.min.js', array( 'jquery' ), '1.0.0', true );
		wp_enqueue_script( 'daynight', get_stylesheet_directory_uri() . '/js/room.js', array( 'jquery' ), '1.0.0', true );
	}

}
add_action( 'wp_enqueue_scripts', 'xkon_enqueue_styles' );

/**
 * Prints HTML with meta information for the categories, tags and comments.
 */
function hired_entry_footer() {
	// Hide category and tag text for pages.
	if ( 'post' == get_post_type() ) {
		hired_posted_on();
		/* translators: used between list items, there is a space after the comma */
		$categories_list = get_the_category_list( __( ', ', 'hired' ) );
		if ( $categories_list && hired_categorized_blog() ) {
			printf( '<span class="cat-links">' . __( '<i class="fa fa-folder-open"></i> %1$s', 'hired' ) . '</span><br/>', $categories_list );
		}

		/* translators: used between list items, there is a space after the comma */
		$tags_list = get_the_tag_list( '', __( ', ', 'hired' ) );
		if ( $tags_list ) {
			printf( '<span class="tags-links">' . __( '<i class="fa fa-tag"></i> %1$s', 'hired' ) . '</span>', $tags_list );
		}
	}

	if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
		echo '<span class="comments-link">';
		comments_popup_link( __( 'Leave a comment', 'hired' ), __( '1 Comment', 'hired' ), __( '% Comments', 'hired' ) );
		echo '</span>';
	}

//	edit_post_link( __( 'Edit', 'hired' ), '<span class="edit-link">', '</span>' );
}

/**
 * Prints HTML with meta information for the current post-date/time and author.
 */
function hired_posted_on() {
	$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
	if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
		$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
	}

	$time_string = sprintf( $time_string,
		esc_attr( get_the_date( 'c' ) ),
		esc_html( get_the_date() ),
		esc_attr( get_the_modified_date( 'c' ) ),
		esc_html( get_the_modified_date() )
	);

	$posted_on = sprintf(
		_x( '<i class="fa fa-calendar"></i> %s', 'post date', 'hired' ),
		'<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . $time_string . '</a>'
	);

	$byline = sprintf(
		_x( 'by %s', 'post author', 'hired' ),
		'<span class="author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>'
	);

//	echo '<span class="posted-on">' . $posted_on . '</span><span class="byline"> ' . $byline . '</span>';
	echo '<span class="posted-on">' . $posted_on . '</span><br/>';

}

function xkon_widgets_init() {
	register_sidebar( array(
		'name'          => 'Home Widgets',
		'id'            => 'home_widgets',
		'before_widget' => '<div id="homewidget">',
		'after_widget'  => '</div>',
	) );
}
add_action( 'widgets_init', 'xkon_widgets_init' );

add_filter( 'get_the_archive_title', function ( $title ) {
	if ( is_category() ) {
		$title = single_cat_title( '', false );
	} elseif ( is_tag() ) {
		$title = single_tag_title( '', false );
	} elseif ( is_author() ) {
		$title = '<span class="vcard">' . get_the_author() . '</span>' ;
	}
	return $title;
});
