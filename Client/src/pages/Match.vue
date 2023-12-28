<template>
  <div class="match-container">
    It's a match!
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Match',
  components: {},
  setup () {},
  data () {
    return {}
  },
  methods: {},
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

.match-container {
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Pacifico', cursive;
  background: url('https://cdn.wallapop.com/images/10420/ex/nj/__/c10420p903051622/i3290736143.jpg?pictureSize=W640') no-repeat center center fixed;
  background-size: cover; /* this ensures the image covers the entire container */
  font-size: 4em;
  color: #4ee397; /* You can change this to another color if you prefer */
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}

/* Dark overlay */
.match-container::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4); /* Adjust the last value (0.4) to increase/decrease opacity */
  pointer-events: none;
}

</style>
You can adjust the styling as per your requirements. The font Pacifico gives a stylish handwritten look, and the text-shadow helps the text pop out from the background. The color #FF5864 is a shade of red/pink that I thought might look good, but you can replace it with


