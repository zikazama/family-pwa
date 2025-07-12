export default ({ app }, inject) => {
  inject('notify', (title, options) => {
    if (process.client && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(title, options)
    }
  })
} 