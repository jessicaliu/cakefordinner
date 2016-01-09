var navClicked = false;
var currPage = 'about';
var galleryDrawing = [
  {path: 'mtn1.jpg'},
  {path: 'mtn2.jpg'},
  {path: 'mtn3.jpg'},
  {path: 'silk.jpg'},
  {path: 'elf.jpg'},
  {path: 'burn.jpg'},
  {path: 'velvet.jpg'},
  {path: 'dorian.jpg'},
  {path: 'insideout.jpg'},
  {path: 'carto.jpg'},
  {path: 'desk.jpg'}
];
var galleryDesign = [
  {path: 'ida.jpg'},
  {path: 'pirates.jpg'},
  {path: 'choufleuri.jpg'},
  {path: 'beauty.jpg'},
  {path: 'westside.jpg'},
  {path: 'ncct.jpg'},
  {path: 'cs4.jpg'},
  {path: 'adventure.jpg'},
  {path: 'othello.jpg'},
  {path: 'sketchy.jpg'},
  {path: 'pacman.jpg'}
];
var gallery3d = [
  {path: 'kitchen.jpg',
   caption: 'Shading and lighting by me. Resources used: kitchen model'},
  {path: 'phone.jpg',
   caption:'Cell phone model, shading, lighting, and compositing by me. Resources used: photo of desk'},
  {path: 'seed.jpg',
   caption: 'Group Animation. Teammates: Aimei Kutt, William Cheung, Patrick Ellis',
   html: '<center><iframe src="http://player.vimeo.com/video/17916153?title=0&amp;byline=0&amp;portrait=0" width="640" height="480" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></center>'} 
];
var galleryOther = [
  {path: 'nutella.jpg'},
  {path: 'paperplane.jpg',
   caption: 'A 2D animation I made with a broken tablet. :D',
   html: '<center><iframe src="http://player.vimeo.com/video/34859906?title=0&amp;byline=0&amp;portrait=0" width="640" height="480" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></center>'}
];


var theaterIndex = 0;
var theaterWhich = '';
var theaterList = [];

$(document).ready(function() {
  //slideAway('about');

  
  $('#balloon-about').mouseover(function() {navMouseOver('about')});
  $('#balloon-projects').mouseover(function() {navMouseOver('projects')});
  $('#balloon-portfolio').mouseover(function() {navMouseOver('portfolio')});
  $('#balloon-resume').mouseover(function() {navMouseOver('resume')});

  $('#balloon-about').mouseout(function() {navMouseOut('about')});
  $('#balloon-projects').mouseout(function() {navMouseOut('projects')});
  $('#balloon-portfolio').mouseout(function() {navMouseOut('portfolio')});
  $('#balloon-resume').mouseout(function() {navMouseOut('resume')});
 
  setupTheater();
  loadGallery('drawing', galleryDrawing);
  loadGallery('design', galleryDesign);
  loadGallery('3d', gallery3d);
  loadGallery('other', galleryOther);
  window.onkeydown = onKeyDown;
});

function onKeyDown(e) {
  if (e.keyCode === 37) {
    e.preventDefault();
    theaterPrev();
  }
  if (e.keyCode === 39) {
    e.preventDefault();
    theaterNext();
  }
  if (e.keyCode === 27) {
    e.preventDefault();
    closeTheater();
  }
}

function navMouseOver(which) {
  $('#bloop-'+which).animate({opacity: 1}, 200);
}

function navMouseOut(which) {
  $('#bloop-'+which).animate({opacity: 0}, 200);
}

function navClick(which) {
  if (!navClicked) {
    slideAway(which);
    navClicked = true;
    currPage = which;
  }
  else {
    switchPages(which);
  }
}

function slideAway(which) {
  $('#inner-body').animate({
    left: '-=120px'
  }, 700, function() {open(which);});

  $('#signature').animate({
    left: '-=120px',
    opacity: 0
  }, 700);
  $('.balloon').animate({
    left: '-=120px'
  }, 700);
  $('.bloop').animate({
    left: '-=120px'
  }, 700);
}

function open(which) {
  var elem = $('#'+which);
  var bg = $('#content-background');
  var targetHeight = elem.css('height').split('p')[0];
  targetHeight = Math.max(600, targetHeight);
  bg.show();
  bg.animate({height: targetHeight},500,function() {
    elem.show();
    elem.animate({opacity: 1}, 500);  
  });

}

function switchPages(which) {
  if (currPage == which) {
    return;
  }
  var curr = $('#'+currPage);
  var next = $('#'+which);
  var targetHeight = next.css('height').split('p')[0];
  targetHeight = Math.max(600, targetHeight);
  curr.animate({opacity: 0}, 400, function() {
    curr.hide();
    next.show();
    $('#content-background').animate({height: targetHeight},500);
    next.animate({opacity: 1}, 400);
  });
  currPage = which;
}

function setupTheater() {
  //setup theater
  theaterBackdrop = $('<div/>', {
    id: 'theater-backdrop',
    click: function(e){closeTheater(e);}
  });
  theater = $('<div/>', {
    id: 'theater',
    click: function(e) {closeTheater(e);}
  });
  var theaterWrapper = $('<div/>', {id: 'theater-wrapper'});
  var canvasWrapper = $('<div/>', {id: 'theater-canvas-wrapper'});
  var canvas = $('<div/>', {id: 'theater-canvas'});
  var caption = $('<div/>', {id: 'theater-caption'});
  prev = $('<div/>', {
    id: 'theater-prev',
    click: theaterPrev
  });
  next = $('<div/>', {
    id: 'theater-next',
    click: theaterNext
  });
  canvasWrapper.append(canvas);
  canvasWrapper.append(caption);
  theaterWrapper.append(prev);
  theaterWrapper.append(canvasWrapper);
  theaterWrapper.append(next);

  theater.append(theaterWrapper);
  $('body').append(theaterBackdrop);
  $('body').append(theater);

  theater.hide();
  theaterBackdrop.hide();
}

function loadGallery(which, list) {
  //setup gallery
  which = 'gallery-'+which;
  gallery = $('#gallery');
  section = $('#'+which);
  for (var i = 0; i < list.length; i++) {
    thumb = $('<div/>', {
      class: 'gallery-thumb',
      id: 'thumb'+i,
      click: function(e) {openTheater(which, list, e);}
    });
    thumb.css('background-image', 'url("images/'+which+'/'+list[i].path+'")');
    section.append(thumb);
  }
  gallery.append(section);
}

function openTheater(which, list, e) {
  var index = parseInt(e.target.id.split('b')[1]);
  var canvas = $('#theater-canvas');
  if (list[index].html) {
    canvas.css('background-image', 'none');
    canvas.html(list[index].html);
    var caption = list[index].caption || (index+1) + ' of ' + list.length;
    $('#theater-caption').html(caption);
  }
  else {
    canvas.html(''); 
    canvas.css('background-image', 
      'url("images/'+which+'/'+list[index].path+'")');
    var caption = list[index].caption || (index+1) + ' of ' + list.length;
    $('#theater-caption').html(caption);
  }
  $('#theater-backdrop').show();
  $('#theater').show();

  theaterIndex = index;
  theaterWhich = which;
  theaterList = list;
}

function theaterPrev() {
  if (theaterIndex-1 >= 0) {
    theaterIndex--;
  }
  else {
    theaterIndex = theaterList.length - 1;
  }
  var canvas = $('#theater-canvas');
  canvas.animate({'opacity': 0}, 300, function() {
    if (theaterList[theaterIndex].html) {
      canvas.html(theaterList[theaterIndex].html);
      canvas.css('background-image', 'none');
    }
    else {
      canvas.html('');
      canvas.css('background-image', 
        'url("images/'+theaterWhich+'/'+theaterList[theaterIndex].path+'")');
    }
    var caption = theaterList[theaterIndex].caption || (theaterIndex+1) + ' of ' + theaterList.length;
    $('#theater-caption').html(caption);
    canvas.animate({'opacity': 1}, 300);
  });
}

function theaterNext() {
  if (theaterIndex+1 < theaterList.length) {
    theaterIndex++;
  }
  else {
    theaterIndex = 0;
  }
  var canvas = $('#theater-canvas');
  canvas.animate({'opacity': 0}, 300, function() {
    if (theaterList[theaterIndex].html) {
      canvas.html(theaterList[theaterIndex].html);
      canvas.css('background-image', 'none');
    }
    else {
      canvas.html('');
      canvas.css('background-image', 
        'url("images/'+theaterWhich+'/'+theaterList[theaterIndex].path+'")');
    }
    var caption = theaterList[theaterIndex].caption || (theaterIndex+1) + ' of ' + theaterList.length;
    $('#theater-caption').html(caption);
 
    canvas.animate({'opacity': 1}, 300);
  });
}

function closeTheater(e) {
  if (!e || e.target.id === 'theater' || e.target.id === 'theater-backdrop') {
    $('#theater-canvas').html('');
    $('#theater-backdrop').hide();
    $('#theater').hide();
  }
}

