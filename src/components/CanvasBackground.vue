<template>
  <canvas id="stars" ref="stars"></canvas>
</template>
<script>
let context
let arr = []
let starCount = 500
let rains = []
let rainCount = 20
console.log(window)
function Star() {
  this.x = window.innerWidth * Math.random()
  this.y = window.innerHeight * Math.random()
  this.text = '*'
  this.color = 'purple'
  this.getColor = function() {
    this.color = 'white'
    // let r = 1
    // if (r < 0.5) {
    //   this.color = '#000000'
    // } else {
    //   this.color = 'white'
    // }
  }

  this.init = function() {
    this.getColor()
  }

  this.draw = function() {
    context.fillStyle = this.color
    context.fillText(this.text, this.x, this.y)
  }
}

function playStars() {
  for (let s = 0; s < starCount; s++) {
    arr[s].getColor()
    arr[s].draw()
  }
  setTimeout(playStars, 100)
}

function MeteorRain() {
  this.x = -1
  this.y = -1
  this.length = -1
  this.angle = 30
  this.width = -1
  this.height = -1
  this.speed = 1
  this.offset_x = -1
  this.offset_y = -1
  this.alpha = 1
  this.color1 = ''
  this.color2 = ''
  this.getPos = function() {
    this.x = Math.random() * window.innerWidth
    this.y = Math.random() * window.innerHeight
  }

  this.getRandomColor = function() {
    // let r = parseInt(Math.random() * 255)
    this.color1 = '#9900FF'   // 紫色的流星拖影
    // console.log(this.color1)
    this.color2 = 'black'
  }

  this.init = function() {
    this.getPos()
    this.alpha = 1
    this.getRandomColor()
    let x = Math.random() * 80 + 150
    this.length = Math.ceil(x)
    this.angle = 30
    x = Math.random() + 0.5
    this.speed = Math.ceil(x)
    let cos = Math.cos((this.angle * 3.14) / 300)
    let sin = Math.sin((this.angle * 3.14) / 180)
    this.width = this.length * cos
    this.height = this.length * sin
    this.offset_x = this.speed * cos
    this.offset_y = this.speed * sin
  }

  this.draw = function() {
    context.save()
    context.beginPath()
    context.lineWidth = 1
    context.globalAlpha = this.alpha
    let line = context.createLinearGradient(
      this.x,
      this.y,
      this.x + this.width,
      this.y - this.height
    )
    line.addColorStop(0, 'white')
    line.addColorStop(0.3, this.color1)
    line.addColorStop(0.6, this.color2)
    context.strokeStyle = line
    context.moveTo(this.x, this.y)
    context.lineTo(this.x + this.width, this.y - this.height)
    context.closePath()
    context.stroke()
    context.restore()
  }

  this.countPos = function() {
    this.x = this.x - this.offset_x
    this.y = this.y + this.offset_y
  }

  this.move = function() {
    let x = this.x + this.width - this.offset_x
    let y = this.y - this.height
    context.clearRect(x - 3, y - 3, this.offset_x + 5, this.offset_y + 5)
    this.countPos()
    this.alpha -= 0.002
    this.draw()
  }
}

function playRains() {
  for (let i = 0; i < rainCount; i++) {
    let rain = rains[i]
    rain.move()
    if (rain.y > window.innerHeight) {
      context.clearRect(rain.x, rain.y - rain.height, rain.width, rain.height)
      rains[i] = new MeteorRain()
      rains[i].init()
    }
  }
  setTimeout(playRains, 3)
}

export default {
  name: 'CanvasBackground',
  mounted() {
    let stars = this.$el;
    context = stars.getContext('2d')
    for (let i = 0; i < starCount; i++) {
      let star = new Star()
      // console.log(star)
      star.init()
      star.draw()
      arr.push(star)
    }

    for (let i = 0; i < rainCount; i++) {
      let rain = new MeteorRain()
      rain.init()
      rain.draw()
      rains.push(rain)
    }
    playStars()
    playRains()
    this.$el.width = window.innerWidth
    this.$el.height = window.innerHeight
  },
  data () {
    return {
    }
  }
}

</script>
<style scroped>
body {
  background-color: #000;
}

canvas{
  left:0;
  height: 0;
  z-index: -1;
  position:absolute;
  width:100%;
  height:100%;
}

body,
html {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

h1 {
  position: absolute;
  left: 5%;
  /*animation: num 30s linear infinite;*/
}

@keyframes num {
  0% {
    width: 450px;
    transform: translate(0px, -40px);
  }

  25% {
    width: 450px;
    transform: translate(1400px, 30px);
  }

  50% {
    width: 450px;
    transform: translate(0px, 40px);
  }

  70% {
    width: 450px;
    transform: translate(1400px, -30px);
  }

  100% {
    width: 450px;
    transform: translate(0px, -40px);
  }
}

</style>
