<template >
  <div>

    <div class="title">
      Tus matches
    </div>

    <div class="wrapper" >
      <div class="matchesImg" style="background-color: red">One</div>
      <div class="matchesImg" style="background-color: #b86161">One</div>
      <div class="matchesImg" style="background-color: #85a853">One</div>
      <div class="matchesImg" style="background-color: #1a5b78">One</div>
      <div class="matchesImg" style="background-color: #bf7e66">One</div>
      <div class="matchesImg" style="background-color: #911f97">One</div>
      <div class="matchesImg" style="background-color: red">One</div>
      <div class="matchesImg" style="background-color: #b86161">One</div>
      <div class="matchesImg" style="background-color: #85a853">One</div>
      <div class="matchesImg" style="background-color: #1a5b78">One</div>
      <div class="matchesImg" style="background-color: #911f97">One</div>
      <div class="matchesImg" style="background-color: #9c929c">One</div>
      <div class="matchesImg" style="background-color: red">One</div>
      <div class="matchesImg" style="background-color: #b86161">One</div>
      <div class="matchesImg" style="background-color: #85a853">One</div>
      <div class="matchesImg" style="background-color: #1a5b78">One</div>
      <div class="matchesImg" style="background-color: #911f97">One</div>
      <div class="matchesImg" style="background-color: #a9a1aa">One</div>
      <div class="matchesImg" style="background-color: #a9a1aa">One</div>
    </div>




  </div>
</template>

<script>
import {reactive, ref, watchEffect} from 'vue';
const { ethers } = require("ethers");
import {auth} from "src/router";

export default {

  components: {
  },
  setup () {
    const state = reactive({

      //NEW

      //ENDNEW
    });


    watchEffect(() => {
      auth.onAuthStateChanged(async currentUser => {



      })
    });




    return {
      state
    };
  },
  data() {
    return {

      //NEW

      value: ref(true),

      isDragging: false,
      startX: 0,
      startY: 0,
      offsetX: 0,
      offsetY: 0,
      draggedElement: null,

      like: false,
      unlike: false,

      start_like: false,
      start_super_like: false,
      start_dislike: false,

      currentImageIndex: 0,

      images: [
        "https://cdn.wallapop.com/images/10420/ex/nj/__/c10420p903051622/i3290736143.jpg?pictureSize=W640",
        "https://cdn.wallapop.com/images/10420/fj/hv/__/c10420p939739698/i3503651896.jpg?pictureSize=W320",
        "https://cdn.wallapop.com/images/10420/ar/z2/__/c10420p651647230/i2053405253.jpg?pictureSize=W320",
        "https://cdn.wallapop.com/images/10420/fo/yg/__/c10420p948910722/i3559368225.jpg?pictureSize=W320",
        "https://cdn.wallapop.com/images/10420/fp/mz/__/c10420p950055856/i3567524676.jpg?pictureSize=W320",
      ],

      indexArray: [0,1,2,3,4],
      //ENDNEW

    };
  },

  computed: {
    visibleImages() {
      return this.images.slice(this.currentImageIndex);
    }
  },
  methods: {

    pop_icon(icon){

      console.log(icon)

      setTimeout(() => {
        if(icon === "LIKE") this.start_like = false;
        else if(icon === "DISLIKE") this.start_dislike = false;
        else if(icon === "SUPER_LIKE") this.start_super_like = false;

        this.currentImageIndex++;
        this.draggedElement.style.transform = ""; // Reset transform for next card



      }, 300);

      if(icon === "LIKE") this.start_like = true;
      else if(icon === "DISLIKE") this.start_dislike = true;
      else if(icon === "SUPER_LIKE") this.start_super_like = true;


    },

    startDrag(event) {
      this.isDragging = true;
      this.draggedElement = this.$refs.cardImage[0].$el;

      const touch = event.changedTouches[0];
      this.startX = touch.clientX;
      this.startY = touch.clientY;

      const rect = this.draggedElement.getBoundingClientRect();
      this.offsetX = this.startX - rect.left;
      this.offsetY = this.startY - rect.top;

    },
    dragCard(event) {
      if (this.isDragging && this.draggedElement) {
        const touch = event.changedTouches[0];
        const newPositionLeft = touch.clientX - this.offsetX;
        const newPositionTop = touch.clientY - this.offsetY;
        const newPositionLeftRotation = touch.clientX - this.offsetX;

        const deltaX = (touch.clientX - this.startX)/4;
        this.draggedElement.style.transformOrigin = "top center";


        if(deltaX >= 30) {
          this.like = false;
          this.unlike = true;
        }
        else if(deltaX <= -30) {
          this.unlike = false;
          this.like = true;
        }

        if(deltaX < 50 && deltaX > -50) this.draggedElement.style.transform = "rotate(" + -deltaX + "deg)"; // Rotate right
        else {
        }
      }
    },
    endDrag(event) {
      this.like = false;
      this.unlike = false;

      const touch = event.changedTouches[0];
      const deltaX = (touch.clientX - this.startX)/4;

      if(deltaX >= 50 || deltaX <= -50) {

        setTimeout(() => {
          this.currentImageIndex++;
          this.draggedElement.style.transform = ""; // Reset transform for next card
        }, 500);

      }



      this.draggedElement.style.transform = "rotate(0deg)"; // Rotate right
      this.isDragging = false;
      this.draggedElement = null;
    },
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}


.title {
  font-family: 'Pacifico', cursive;
  text-align: center;
  position: center;
  padding: 15px 15px 5px 15px;
  font-size: 25px;
  color: #04aa6d;
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  padding: 10px;
  grid-auto-rows: minmax(100px, auto);
}

.matchesImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}


.card.leaving {
  transition: transform 0.5s ease-in-out;
}

.dislike-color .q-icon {
  color: indianred !important;
}
.super-like-color .q-icon {
  color: dodgerblue !important;
}
.like-color .q-icon {
  color: mediumspringgreen !important;
}

.icon-bigger .q-icon {
  font-size: 35px;   /* Increase the icon size */
  width: 20px;    /* Adjust width */
  height: 20px;   /* Adjust height */
  vertical-align: middle; /* To ensure it aligns well vertically */
}

</style>
