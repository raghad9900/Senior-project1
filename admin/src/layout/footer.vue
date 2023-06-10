<template>
  <div class="layout-footer">
    <span style="background-color: #fff;padding: 1em 2em;">
      <span class="footer-text" style="margin-right: 5px;">Copyright</span>

      <a href="https://alwanlab.com">
        <span class="footer-text" style="margin-left: 5px;"
          >© 2023 Alwanlab, All rights reserved
        </span>
      </a>
    </span>
  </div>
</template>

<script>
export default {
  name: 'app-footer',
  props: {
    list: [],
  },
};
</script>

<style>
.layout-footer {
  background-color: #fff;
  padding: 1em 0;
  color: #333;
  margin-top: auto;

  
}

.layout-footer a {
  color: #333;
  text-decoration: none;
}
</style>
