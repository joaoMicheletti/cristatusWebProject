//import Icon from '../src/assets/image/logoLogin.webp';
self.addEventListener('push', function(event){
    const body = event.data?.text() ?? '';
    event.waitUntil(
        self.registration.showNotification('Cristatus', {
            body,
        })
    )
});