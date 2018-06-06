'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin'),
    git = require('gulp-git');


gulp.task('sass', function () {
  return gulp.src('./css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
}); 

gulp.task('sass:watch', function () {
    gulp.watch('./css/*.scss', ['sass']);
});

gulp.task('browser-sync', function () {
    var files = [
       './*.html',
       './css/*.css',
       './img/*.{png,jpg,gif}',
       './js/*.js'
    ];
 
    browserSync.init(files, {
       server: {
          baseDir: "./"
       }
    });
 
 });

 gulp.task('clean', function() {
    return del(['../dist'], {force: true});
});

gulp.task('copyfonts', function() {
    gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('../dist/fonts'));
 });

 gulp.task('imagemin', function() {
    return gulp.src('img/*.{png,jpg,gif}')
      .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
      .pipe(gulp.dest('../dist/img'));
  });

  gulp.task('usemin', function() {
    return gulp.src('./*.html')
    .pipe(flatmap(function(stream, file){
        return stream
          .pipe(usemin({
              css: [ rev() ],
              html: [ function() { return htmlmin({ collapseWhitespace: true })} ],
              js: [ uglify(), rev() ],
              inlinejs: [ uglify() ],
              inlinecss: [ cleanCss(), 'concat' ]
          }))
      }))
      .pipe(gulp.dest('../dist/'));
  });

  gulp.task('add', function(){
    return gulp.src('./git-test/*')
      .pipe(git.add());
  });

  gulp.task('commit', function(){
    return gulp.src('./git-test/*')
      .pipe(git.commit('initial commit'));
  });

  gulp.task('push', function(){
    git.push('origin', 'master', function (err) {
      if (err) throw err;
    });
  });

  gulp.task('push-dist',function(){
    gulp.src('C:/Users/zangv/Documents/Physical-web/medical/dist', { cwd: 'public' });
    gulp.start('add')
    gulp.start('commit')
    gulp.start('push')
  });

  gulp.task('build',['clean'], function() {
    gulp.start('copyfonts','imagemin','usemin');
});

 gulp.task('default', ['browser-sync'], function() {
    gulp.start('sass:watch');
});