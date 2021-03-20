<template>
  <div class="timeline-block" :class="{ 'timeline-inverted': inverted }">
    <slot name="badge">
      <span class="timeline-step" :class="`badge-${badgeType}`">
        <i :class="badgeIcon"></i> {{badgeTitle}}
      </span>
    </slot>
    <div class="timeline-content" :style="`background:` + backgroundColor ">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'time-line-item',
    props: {
      backgroundColor: String,
      inverted: Boolean,
      title: String,
      badgeType: {
        type: String,
        default: 'success'
      },
      badgeIcon: {
        type: String,
        default: ''
      },
      badgeTitle: {
        type: String,
        default: ''
      }
    }
  };
</script>
<style></style>
