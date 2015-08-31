/**
 * Spritesmith - automatically creates sprites from the specifed files.
 */
module.exports = function(grunt) {
  'use strict';

  grunt.config('sprite', {
    dist1x: {
      src: '<%= xh.src %>/img/sprites/1x/*.{png,jpg,gif}',
      destImg: '<%= xh.dist %>/img/common/sprites@1x.png',
      destCSS: '<%= xh.src %>/scss/setup/_sprites@1x.scss',
      cssTemplate: '<%= xh.src %>/scss/setup/_sprites.scss.mustache',
      algorithm: 'binary-tree',
      engine: 'pngsmith',
      padding: 2,
      cssOpts: {
        map: 'sprite-1x'
      }
    },
    dist2x: {
      src: '<%= xh.src %>/img/sprites/2x/*.{png,jpg,gif}',
      destImg: '<%= xh.dist %>/img/common/sprites@2x.png',
      destCSS: '<%= xh.src %>/scss/setup/_sprites@2x.scss',
      cssTemplate: '<%= xh.src %>/scss/setup/_sprites.scss.mustache',
      algorithm: 'binary-tree',
      engine: 'pngsmith',
      padding: 4,
      cssOpts: {
        map: 'sprite-2x',
        functions: false
      }
    }
  });
};
