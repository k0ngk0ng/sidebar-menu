var gulp = require('gulp'),
	ngHtml2js = require('gulp-ng-html2js'),
	minifyHtml = require('gulp-minify-html'),
	minifyCss = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	less = require('gulp-less'),
	jshint = require('gulp-jshint'),
	rename = require('gulp-rename'),
	del = require('del');

var packageName = 'sidebar-menu';
var ngModuleName = 'ui.bootstrap.sidebarMenu';

var path = {
	src: {
		templates : [
			'src/templates/menu.html',
			'src/templates/menuItem.html'
		],
		scripts: 'src/js/sidebar-menu.js',
		styles: 'src/less/sidebar-menu.less'
	},
	temp: 'dist/tmp',
	dist: {
		scripts: 'dist',
		styles: 'dist'
	}
};

gulp.task('templates', function() {
	return gulp.src(path.src.templates)
		.pipe(minifyHtml({
			empty: true,
			spare: true,
			quotes: true
		}))
		.pipe(ngHtml2js({
			moduleName: ngModuleName,
			prefix: 'templates/'
		}))
		.pipe(concat('templates.js'))
		.pipe(uglify())
		.pipe(gulp.dest(path.temp));
});

gulp.task('scripts', ['templates'], function() {
    return gulp.src(path.src.scripts)
    	.pipe(jshint())
    	.pipe(jshint.reporter('default'))
    	.pipe(uglify())
    	.pipe(concat('scripts.js'))
    	.pipe(gulp.dest(path.temp));
});

gulp.task('concat-js', ['templates', 'scripts'], function() {
	return gulp.src(path.temp + '/*.js')
		.pipe(concat(packageName, {
			newLine:''
		}))
		.pipe(rename({
			suffix: '.min',
			extname: '.js'
		}))
		.pipe(gulp.dest(path.dist.scripts));
});

gulp.task('less2css', function() {
	return gulp.src(path.src.styles)
		.pipe(less())
		.pipe(minifyCss())
		.pipe(rename({
			suffix: '.min',
			extname: '.css'
		}))
		.pipe(gulp.dest(path.dist.styles));
});

gulp.task('clean', ['less2css', 'concat-js'], function(cb) {
	del(path.temp, cb);
});

gulp.task('watch', function() {
	gulp.watch(path.templates, ['clean']);
	gulp.watch(path.scripts, ['clean']);
	gulp.watch(path.styles, ['clean']);
});

gulp.task('default', ['less2css', 'concat-js', 'clean']);