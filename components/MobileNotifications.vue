<script lang="ts" setup>
function askNotificationPermission() {
  // function to actually ask the permissions
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications.");
  } else {
    Notification.requestPermission().then((permission) => {
      console.log("permission", permission);
    });
  }
}

function sendNotification() {
  const notification = new Notification("To do list", { body: "hi" });
}
</script>

<template>
  <UButton label="Notifications" @click="askNotificationPermission" />
  <UButton label="Send Notification" @click="sendNotification" />
</template>
