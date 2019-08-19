import logo from '../app/assets/icon.png';

export const showNotification = message => {
  if (!("Notification" in window)) {
    console.error("This browser does not support system notifications");
    return;
  }

  Notification.requestPermission()
    .then(result => {
      if (result === 'denied') {
        console.warn('Permission wasn\'t granted. Allow a retry.');
        return;
      }
      if (result === 'default') {
        console.warn('The permission request was dismissed.');
        return;
      }
      const options = {
        icon: logo,
        body: message,
        vibrate: [200, 100, 200],
        requireInteraction: true
      }
      new Notification('DC Comics', options);
    });
}
