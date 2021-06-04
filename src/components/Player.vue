<template>
  <div id="video-player" class="video-player">
    <svg v-if="usb * 1 === 4" class="auxiliary-line">
      <line x1="55%" y1="0%" x2="55%" y2="100%" />
    </svg>
  </div>
</template>
/* eslint-disable */
<script>
export default {
  name: 'Player',
  props: ['port', 'usb'],
  data() {
    return {
      video: null,
      canvas: null,
      player: null
    }
  },
  mounted() {
    var port = (this.port * 1) + 1
    this.video = document.getElementById('video-player')
    this.canvas = document.createElement("CANVAS")
    this.video.appendChild(this.canvas)
    this.player = new JSMpeg.Player(
      `ws://${document.location.hostname}:${port}/`, {
        canvas: this.canvas,
        /*disableGl: true,
        disableWebAssembly: true,
        pauseWhenHidden: false,
        videoBufferSize: 10 * 1024 * 1024,
        audio: false*/
      }
    )

  },
  beforeDestroy() {
    this.player.destroy()
    this.player = null
    this.canvas.remove()
    this.canvas = null
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.video-player {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.auxiliary-line {
  width: 100%;
  height: 100%;
  max-width: 1066px;
  max-height: 800px;
  position: absolute;
  z-index: 100;

  line {
    stroke: yellow;
    stroke-width: 1px;
  }
}

</style>
/* eslint-enable */
