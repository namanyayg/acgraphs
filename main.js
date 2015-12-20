$(function() {
  var winWidth = $(window).width()
    , winHeight = $(window).height()

  // Gap and shorter line
  var gap = 40
    , shorter = 40

  // Global config
  var anim = true,
      rEnabled = true,
      lEnabled = true,
      cEnabled = true

  $('.canvas-container').css('height', winHeight/2)
  $('canvas').each(function() {
    $(this)[0].width = winHeight
    $(this)[0].height = winHeight / 2
    $(this).css('margin-left', -winHeight/2 )
  });

  // Line details
  var lineLen = winHeight/2 - gap/2 + .5
    , half = winHeight / 4 + .5
    , lineW = (lineLen/2 - gap/4 - shorter)

  var lineOrigin = { x: lineLen/2 + gap/4, y: gap/4 + lineLen/2 }
    , graphOrigin = { x: lineLen + gap, y: gap/4 + lineLen/2 }

  // Canvas details
  var baseCanvas = $('.base')[0]
    , baseCtx = baseCanvas.getContext('2d') 
    
    , Canvas = {
      r: $('.r')[0],
      l: $('.l')[0],
      c: $('.c')[0]
    }
    , Ctx = {
      r: Canvas.r.getContext('2d'),
      l: Canvas.l.getContext('2d'),
      c: Canvas.c.getContext('2d')
    }
    , Color = {
      r: '#f00',
      l: '#0f0',
      c: '#00f'
    }

  function plotGraph (canvas) {
    var ctx = canvas.getContext('2d')


    ctx.strokeStyle = '#aaa'

    // Cartesian Lines
    ctx.beginPath()
    
    ctx.moveTo(0, half)
    ctx.lineTo(lineLen, half)
    ctx.moveTo(half, gap/4)
    ctx.lineTo(half, lineLen + gap/4)

    // Phasor Base
    ctx.moveTo(lineLen + gap, half)
    ctx.lineTo(lineLen + gap + lineLen, half)
    ctx.moveTo(lineLen + gap - .5, gap/4)
    ctx.lineTo(lineLen + gap - .5, lineLen + gap/4)

    ctx.stroke()
    ctx.closePath()

  } plotGraph( baseCanvas )

  function toRad (deg) {
    return deg * Math.PI/180;
  }

  function plotArrow (canvas, ctx, o, angle, color) {
    var angle = toRad(angle)

    ctx.strokeStyle = color
    ctx.lineWidth = 2

    ctx.beginPath()

    ctx.moveTo(o.x, o.y)
    ctx.lineTo( 
      o.x + (lineW * Math.cos(angle)), 
      o.y + (lineW * -Math.sin(angle)) 
    )

    ctx.stroke()
    ctx.closePath()
  }

  function plotWave (canvas, ctx, o, phase, color) {
    var phase = toRad(phase);

    ctx.fillStyle = color
    for ( var i = 0; i <= lineLen; i += .5 ) {
      ctx.fillRect( o.x + i, o.y - (Math.sin(toRad(i) + phase) * lineW), 2, 2)
    }
  }

  function clearCtx (type) {
    Ctx[type].clearRect(0, 0, Canvas.r.width, Canvas.r.height)
  }


  function update (type, angle) {
    plotArrow( Canvas[type], Ctx[type], lineOrigin, angle, Color[type] )
    plotWave( Canvas[type], Ctx[type], graphOrigin, angle, Color[type] )
  }

  var angle = 0;
  function animate () {
    if ( anim ) {
      angle++;
      if ( angle == 360 ) angle = 0

      if ( rEnabled ) {
        clearCtx('r')
        update('r', angle);
      }
      if ( lEnabled ) {
        clearCtx('l')
        update('l', angle + 90);
      }
      if ( cEnabled ) {
        clearCtx('c')
        update('c', angle - 90);
      }

      window.requestAnimationFrame(animate);
    }
  }

  function init () {
    animate()
  } init()



});