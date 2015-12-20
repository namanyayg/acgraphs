$(function() {
  var winWidth = $(window).width()
    , winHeight = $(window).height()

  // Gap and shorter line
  var gap = 40
    , shorter = 40

  // Global config
  var anim = true,
      rEnabled = true,
      lEnabled = false,
      cEnabled = false

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
    
    , rCanvas = $('.r')[0]
    , rCtx = rCanvas.getContext('2d') 
    , rColor = '#f00'

    , lCanvas = $('.l')[0]
    , lCtx = lCanvas.getContext('2d') 
    , lColor = '#0f0'

    , cCanvas = $('.c')[0]
    , cCtx = cCanvas.getContext('2d')
    , cColor = '#00f'

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
    for ( var i = 0; i <= lineLen; i += .1 ) {
      ctx.fillRect( o.x + i, o.y - (Math.sin(toRad(i) + phase) * lineW), 1, 1)
    }
  }

  function clearR () {
    rCtx.clearRect(0, 0, rCanvas.width, rCanvas.height)
  }

  function updateR (angle) {
    plotArrow( rCanvas, rCtx, lineOrigin, angle, rColor )
    plotWave( rCanvas, rCtx, graphOrigin, angle, rColor )
  }

  var angle = 0;
  function animate () {
    if ( anim ) {
      angle++;
      if ( angle == 360 ) angle = 0
      clearR();
      updateR(angle);
      window.requestAnimationFrame(animate);
    }
  }

  function init () {
    // plotArrow( rCanvas, rCtx, lineOrigin, 90, rColor )
    // plotWave( rCanvas, rCtx, graphOrigin, 0, rColor )
    animate()
  } init()



});