<?php
/**
 * The default template for displaying content
 *
 * Used for both single and index/archive/search.
 *
 * @package WordPress
 * @subpackage EmmanuelB
* @since Emmanuel B 2.5
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php //twentyfourteen_post_thumbnail(); ?>

	<header class="post-header">
		<?php
			if ( is_single() ) :
				the_title( '<h1 class="post-header__title">', '</h1>' );
			else :
				the_title( '<a href="#page" class="back-top hidden-xl"><i class="gi gi-top"></i></a><h1 class="post-header__title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h1>' );
			endif;

			get_date_post();
		?>
	</header><!-- .entry-header -->

	<?php if (is_search()) : ?>
	<div class="post-summary">
		<?php the_excerpt(); ?>
	</div><!-- .post-summary -->
	<?php else : ?>
	<div class="post-content">
		<?php the_content('Lire la suite <i class="gi gi-next"></i>'); ?>
	</div><!-- .post-content -->
	<?php endif; ?>

	<footer class="post-footer">
		<div class="post-footer__container">
			<?php share_links(get_the_ID()); ?>
			<div class="post-footer__links">
				<?php edit_post_link('<i class="gi gi-edit"></i>', '<div class="post-footer__edit-link">', '</div>'); ?>
				<?php if (!post_password_required() && (comments_open() || get_comments_number())) : ?>
				<div class="post-footer__comments-link"><?php comments_popup_link('<i class="gi gi-comment"></i> 0<span class="sr-only"> commentaire</span>', '<i class="gi gi-comment"></i> 1<span class="sr-only"> commentaire</span>', '<i class="gi gi-comment"></i> %<span class="sr-only"> commentaires</span>'); ?></div>
				<?php endif; ?>
			</div>
		</div>
		<div class="post-meta post-meta--footer">
			<div class="post-footer__categories">Catégorie(s) : <?php the_category(', ')?></div>
			<?php the_tags( '<div class="post-footer__tag-links"><i class="gi gi-tag"></i><ul class="tags-links__list list-unstyled"><li class="tags-links__item">', ',</li><li class="tags-links__item">', '</li></ul></div>' ); ?>
		</div><!-- .entry-meta -->

	</footer>
</article><!-- #post-## -->