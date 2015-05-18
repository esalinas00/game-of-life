var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var connect = require('gulp-connect');
var del = require('del');

//browserify
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');

// add custom browserify options here
var customOpts = {
  entries: ['./src/js/main.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts)); 

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./build/js'))
    .pipe(connect.reload());
}

//SASS to CSS task
gulp.task('sass',function(){
	return gulp.src('src/sass/**.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(minifyCss())
	.pipe(gulp.dest('build/css'))
	.pipe(connect.reload())
	.pipe(notify("Sass Task Completed"));
});

//OLD JS task
/**
gulp.task('js',function(){
	return gulp.src('src/js/**.js')
	.pipe(changed('build/js'))
	.pipe(jshint({'lookup':true}))
	.pipe(jshint.reporter('default'))
	.pipe(uglify())
	.pipe(gulp.dest('build/js'))
	.pipe(connect.reload())
	.pipe(notify("Uglify Task Completed"));
});
**/

gulp.task('connect',function(){
	connect.server({
		port: 8082,
		host:'localhost',
		livereload: true
	});
});

gulp.task('clean',function(cb){
	del(['build/@(css|js|imgs)/*'],cb);
});

gulp.task('html',function(){
	return gulp.src('index.html')
	.pipe(connect.reload());
});

gulp.task('watch',function(){
	gulp.watch('src/sass/**.scss',['sass']);
	gulp.watch('src/js/**.js',['js']);
	gulp.watch('index.html',['html']);
});

gulp.task('default',['watch','js','sass','connect'],function(){
});