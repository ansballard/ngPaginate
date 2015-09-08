var fs = require("fs");
var gulp = require("gulp");
var del = require("del");
var plumber = require("gulp-plumber");
var eslint = require("gulp-eslint");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var templateCache = require("gulp-angular-templatecache");
var packagejson = JSON.parse(fs.readFileSync("./package.json"));

var toBuild = ["templates/*.js", "src/*.module.js", "src/*.js", "src/**/*.module.js", "src/**/*.js"];

gulp.task("clearTemplates", function() {
  "use strict";
  return del(["./templates/*"]);
});

gulp.task("createTemplates", ["clearTemplates"], function() {
  "use strict";
  return gulp.src("src/*.template.html")
    .pipe(plumber())
    .pipe(templateCache({
      "module": "ngPaginate.templates",
      "standalone": true
    }))
    .pipe(gulp.dest("./templates"))
  ;
});

gulp.task("build", ["createTemplates"], function() {
  "use strict";
  return gulp.src(toBuild)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(uglify({
      preserveComments: "license"
    }))
    .pipe(concat("ngPaginate.min.js"))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./"))
  ;
});

gulp.task("unminned", ["createTemplates"], function() {
  "use strict";
  return gulp.src(toBuild)
    .pipe(plumber())
    .pipe(concat("ngPaginate.js"))
    .pipe(gulp.dest("./"))
  ;
});

gulp.task("default", ["build", "unminned"]);

gulp.task("watch", ["default"], function() {
  "use strict";
  gulp.watch(toBuild, ["build"]);
});
