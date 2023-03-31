'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

function style() {
    return gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/css'))
}

exports.style = style